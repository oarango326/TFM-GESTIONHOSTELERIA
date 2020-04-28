import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrls: ['./cajas.component.css']
})
export class CajasComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      console.log(params);
    });
  }

  ngOnInit(): void {
  }

}
