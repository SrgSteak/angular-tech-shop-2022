import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutpage',
  templateUrl: './aboutpage.component.html',
  styleUrls: ['./aboutpage.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AboutpageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
