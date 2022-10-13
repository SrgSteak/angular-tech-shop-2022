import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { TensorHelperService } from './tensor-helper.service';
import { MnistData } from './mnist-data';

@Component({
  selector: 'app-mnist-number-magic',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mnist-number-magic.component.html',
  styleUrls: ['./mnist-number-magic.component.scss']
})
export class MnistNumberMagicComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') private canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('machineCanvas') private machineCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart') private barChart: ElementRef<HTMLDivElement>;
  results = [100,100,100,100,100,100,100,100,100,100];
  ctx: CanvasRenderingContext2D;
  machineCtx: CanvasRenderingContext2D;
  private paint = false;
  // Stores the initial position of the cursor
  private coord = {x:0 , y:0};

  private model: tf.Sequential;
  private predictionReady = false;

  constructor(private tensorHelper: TensorHelperService, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.machineCtx = this.machineCanvas.nativeElement.getContext('2d');
    this.clear();
  }

  private updateChart() {
    for(let i = 0; i < this.barChart.nativeElement.children.length; i++) {
      this.renderer.setStyle(this.barChart.nativeElement.children.item(i), 'height', `${this.results[i]}%`);
    }
  }

  async run() {
    const data = new MnistData();
    await data.load();
    await this.tensorHelper.showExamples(data);

    this.model = this.tensorHelper.getModel();
    tfvis.show.modelSummary({name: 'Model Architecture', tab: 'Model'}, this.model);

    await this.tensorHelper.train(data);
    await this.tensorHelper.showAccuracy(data);
    await this.tensorHelper.showConfusion(data);
    this.predictionReady = true;
  }

  async detectNumber() {
    // invert the image so it matches our training set - black background, white text
    this.ctx.globalCompositeOperation='difference';
    this.ctx.fillStyle='white';
    this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    // invert end ----

    // make a tensor from our prepped canvas and reshape it for the
    // models first input layer -> conv2d
    const imageTensor = this.tensorHelper.banoodleInput(this.ctx.canvas);

    // repaint the input on the canvas so we humans know what we feed the machine
    await tf.browser.toPixels(imageTensor, this.machineCtx.canvas);

    // now predict
    const result = await this.tensorHelper.predictContent(imageTensor, this.model);
    console.log(result);
    this.results = result.map(val => val * 100);
    this.updateChart();
  }


  //draw stuff
  clear() {
    this.ctx.canvas.width = this.canvas.nativeElement.clientWidth; //500; //this.canvas.nativeElement.parentElement.width;
    this.ctx.canvas.height = this.canvas.nativeElement.clientHeight;
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.rect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.fillStyle = "white";
    this.ctx.fill();

    this.machineCtx.clearRect(0, 0, this.machineCtx.canvas.width, this.machineCtx.canvas.height);
    this.machineCtx.rect(0, 0, this.machineCtx.canvas.width, this.machineCtx.canvas.height);
    this.machineCtx.fillStyle = "black";
    this.machineCtx.fill();
    this.results = [0,0,0,0,0,0,0,0,0,0];
    this.updateChart();
  }

  // Updates the coordinates of the cursor when
  // an event e is triggered to the coordinates where
  // the said event is triggered.
  getPosition(event: MouseEvent | TouchEvent) {
    this.coord.x = (event instanceof MouseEvent ? event.clientX : event.changedTouches[0].clientX) - this.canvas.nativeElement.offsetLeft;
    this.coord.y = (event instanceof MouseEvent ? event.clientY : event.changedTouches[0].clientY) - this.canvas.nativeElement.offsetTop;
  }

  // The following functions toggle the flag to start
  // and stop drawing
  startPainting(event) {
    this.paint = true;
    this.getPosition(event);
  }

  stopPainting(){
    this.paint = false;
    if (this.predictionReady) {
      this.detectNumber();
    }
  }

  sketch(event: MouseEvent | TouchEvent){
    if (!this.paint) return;
    this.ctx.beginPath();

    this.ctx.lineWidth = 10;

    // Sets the end of the lines drawn
    // to a round shape.
    this.ctx.lineCap = 'round';

    this.ctx.strokeStyle = 'black';

    // The cursor to start drawing
    // moves to this coordinate
    this.ctx.moveTo(this.coord.x, this.coord.y);
    const start = [this.coord.x, this.coord.y];
    // The position of the cursor
    // gets updated as we move the
    // mouse around.
    this.getPosition(event);

    // A line is traced from start
    // coordinate to this coordinate
    this.ctx.lineTo(this.coord.x , this.coord.y);
    const end = [this.coord.x, this.coord.y];
    // Draws the line.
    this.ctx.stroke();
    // this.strokeHistory.push([start, end]);
  }

  // @HostListener('touchend')
  // @HostListener('mouseup')
  // onMouseup() {
  //   this.stopPainting();
  // }

  @HostListener('touchmove', ['$event'])
  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent | TouchEvent) {
    this.sketch(event);
    if (this.paint) {
      event.preventDefault();
    }
  }
}
