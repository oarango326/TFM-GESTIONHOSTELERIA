import { Component, OnInit } from '@angular/core';
import {InsumoModel} from '../../models/insumo.model';
import {InsumosService} from '../../services/insumos/insumos.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {
  muestra: boolean;
  insumos: InsumoModel[] = [] ;
  cargando: boolean;
  content: any;
  update: boolean;

  constructor( private insumosService: InsumosService, private router: Router) {
    this.muestra = false;
    this.cargando = true;
    this.getAll();
  }

  ngOnInit(): void {
  }
  getAll(){
    this.insumosService.getAll()
        .subscribe( (request: InsumoModel[]) => {
          this.insumos = request;
          this.cargando = false;
          this.muestra = true;
        } );
  }

  delete(insumo: InsumoModel, i: number) {
    console.log(insumo);
    this.insumosService.delete(insumo.insumoId)
        .subscribe(request => {
          console.log(request);
          this.insumos.splice(i, 1);
            },
        (error) => console.log(error));
  }

  hasRoute() {
    return this.router.url;
  }

  mostrar(){
   return  this.muestra = !this.muestra;
  }
}
