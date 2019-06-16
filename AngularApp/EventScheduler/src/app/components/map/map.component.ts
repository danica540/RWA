import { Component, OnInit, Input } from '@angular/core';
declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() latitude: string;
  @Input() longitude: string;

  map: any;

  constructor() { }

  ngOnInit() {
    if (this.longitude && this.latitude) {
      this.setLocation(parseFloat(this.latitude), parseFloat(this.longitude));
    }
  }

  setLocation(lat: number, lon: number) {
    this.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([lon, lat]),
        zoom: 16
      })
    });

  }

}
