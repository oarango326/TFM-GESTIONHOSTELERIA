import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Routes
import {AppRoutingModule} from './app-routing/app-routing.module';

// Services
import {LocalesService} from './services/locales/locales.service';
import {MesasService} from './services/mesas/mesas.service';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/share/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LocalesComponent } from './components/locales/locales.component';
import { LocalComponent } from './components/local/local.component';
import { MesasComponent } from './components/mesas/mesas.component';
import { CajasComponent } from './components/cajas/cajas.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { NuevoLocalComponent } from './components/nuevo-local/nuevo-local.component';
import { InfoLocalComponent } from './components/info-local/info-local.component';
import { MesaAddModalComponent } from './components/modals/mesa-add-modal/mesa-add-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    LocalesComponent,
    LocalComponent,
    MesasComponent,
    CajasComponent,
    ReservasComponent,
    NuevoLocalComponent,
    InfoLocalComponent,
    MesaAddModalComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule,
        FormsModule
    ],
  providers: [
      LocalesService,
      MesasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
