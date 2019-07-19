import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ticketArray = [
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' },
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' },
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' },
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' },
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' },
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' },
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' },
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' },
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' },
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' },
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' },
    { title: 'Title', text: 'Text Text Text', text1: 'Text Text', text2: 'Text Text Text' }
  ]

  constructor() { }

  ngOnInit() {
  }

}
