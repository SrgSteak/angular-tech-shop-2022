import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultitem',
  templateUrl: './resultitem.component.html',
  styleUrls: ['./resultitem.component.css']
})
export class ResultitemComponent implements OnInit {

  @Input('result') result: string;

  constructor() { }

  ngOnInit(): void {
  }

}
