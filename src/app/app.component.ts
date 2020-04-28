import { Component } from '@angular/core';
import {GlobalConstants} from './models/globalConstants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = GlobalConstants.appTittle;
}
