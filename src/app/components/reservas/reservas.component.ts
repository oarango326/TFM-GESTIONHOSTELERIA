import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    this.route.parent.params.subscribe(params => {
      console.log(params);
    });
  }

  ngOnInit(): void {
  }

}
