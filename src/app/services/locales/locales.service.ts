import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocalModel} from '../../models/Local.model';
import {GlobalConstants} from '../../models/globalConstants';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {
  url = GlobalConstants.apiURL;
  local: LocalModel = new LocalModel();
  locales: LocalModel[] = [];
  constructor(private http: HttpClient) {
  }
  getLocales() {
    return this.http.get(`${this.url}/locales`);
  }
  getLocal(idx: number){
    return this.http.get(`${this.url}/locales/` + idx);
  }

  addLocal(local: LocalModel){
     return this.http.post(`${this.url}/locales`, local);
  }

  updateLocal(idx: number, local: LocalModel){
    return this.http.put(`${this.url}/locales/` + idx, local);
  }
  deleteLocal(idx: number){
    return this.http.delete(`${this.url}/locales/${idx}`);
  }
}


