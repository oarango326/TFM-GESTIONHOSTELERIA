import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MesasService} from '../../services/mesas/mesas.service';
import {MesaModel} from '../../models/Mesa.model';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {

  local: any;
  cargando = false;
  content: any;
  mesas: MesaModel[] = [];
  mesa: MesaModel;
  error: string;
  update: boolean;

  constructor(private route: ActivatedRoute, private mesasService: MesasService, config: NgbModalConfig, private modalService: NgbModal ) {
    this.route.parent.params.subscribe((params) => this.local = params);
    this.getMesas(this.local.id);
    config.backdrop = 'static';
    config.keyboard = false;
    this.update = false;
    // this.mesa = new MesaModel();
  }
  ngOnInit(): void {
  }
  getMesas(local: number){
    this.mesasService.getMesas(local)
        .subscribe((resp: MesaModel[]) => {
          this.mesas = resp;
          this.cargando = false;
        } );
  }
  getMesa(idx: number){
   return this.mesasService.getMesa(idx)
        .subscribe( (request: MesaModel) => this.mesa = request);
  }
  deleteMesa(mesa: MesaModel, i: number) {
    Swal.fire({
      title: '¿Está Seguro?',
      text: `Está Seguro que desea borrar la mesa ${mesa.numeroMesa}"`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
          if (resp.value) {
            this.mesasService.deleteMesa(mesa)
                .subscribe((request: any) => {
                    this.mesas.splice(i, 1);
                    Swal.fire({
                        title: 'Borrar Mesa ',
                        text: request.message.toUpperCase(),
                        icon: 'success'
                    });
                }, (error) => {
                    Swal.fire({
                        title: 'Borrar Mesa ',
                        text: error.error.message.toUpperCase(),
                        icon: 'error'
                    });
                });
          }
        });
  }

    addMesa(forma: NgForm, update?: boolean) {
      if (!update){
          if ( !forma.invalid){
              this.mesasService.addMesa(forma, this.local.id)
                  .subscribe(resp => {
                      this.getMesas(this.local.id);
                  }, ( error )  => console.log(error.error));
          }
      }
      if ( !forma.invalid){
           this.mesasService.updateMesa(forma, this.local.id)
              .subscribe(request => {
                  this.getMesas(this.local.id);
              }, ( error )  => console.log(error.error));
      }
  }
  open(content, mesa: MesaModel, update?: boolean) {
      if (update){
          return this.mesasService.getMesa(mesa.mesaId)
              .subscribe((request: MesaModel) => {
                  this.update = update;
                  this.mesa = request;
                  this.modalService.open(content);
              });
      }
      this.mesa = new MesaModel();
      this.modalService.open(content);
  }
}
