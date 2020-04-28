import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {
  local: any = {};
  constructor(private Route: ActivatedRoute){
    this.Route.params.subscribe(param => {
      console.log(param);
    });
  }

  ngOnInit(): void {
  }
}

