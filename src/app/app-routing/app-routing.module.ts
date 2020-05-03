import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from '../components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from '../components/about/about.component';
import {LocalesComponent} from '../components/locales/locales.component';
import {LocalComponent} from '../components/local/local.component';
import {MesasComponent} from '../components/mesas/mesas.component';
import {CajasComponent} from '../components/cajas/cajas.component';
import {ReservasComponent} from '../components/reservas/reservas.component';
import {NuevoLocalComponent} from '../components/nuevo-local/nuevo-local.component';
import {InfoLocalComponent} from '../components/info-local/info-local.component';
import {InsumosComponent} from '../components/insumos/insumos.component';
import {InsumoComponent} from '../components/insumo/insumo.component';
import {ErrorpageComponent} from '../components/share/errorpage/errorpage.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'locales', component: LocalesComponent,
    children: [
      { path: 'nuevo-local', component: NuevoLocalComponent}
    ]
  },
  { path: 'locales/:id', component: LocalComponent,
    children: [
      { path: 'info-local', component: InfoLocalComponent},
      { path: 'mesas', component: MesasComponent},
      { path: 'cajas', component: CajasComponent},
      { path: 'reservas', component: ReservasComponent},
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: '**', pathMatch: 'full', redirectTo: 'info-local'}
    ]
  },
{ path: 'insumos/nuevo-insumo', component: InsumoComponent},
  { path: 'insumos', component: InsumosComponent,
  children: [
    { path: 'nuevo-insumo', component: InsumoComponent},
  ]},
  { path: 'insumos/:id', component: InsumoComponent},
  { path: 'insumos/:id/edit', component: InsumoComponent},
  { path: 'about', component: AboutComponent},
  { path: 'UrlNotFound', component: ErrorpageComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: '**', pathMatch: 'full', redirectTo: 'UrlNotFound'}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
