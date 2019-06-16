import { Component, OnInit, Input } from '@angular/core';
import { EventModel } from 'src/app/models/EventModel';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event:EventModel;

  constructor() { }

  ngOnInit() {
  }

  returnFormatedAddress(){
    return this.event.address.concat(`, ${this.event.city}`);
  }

}
