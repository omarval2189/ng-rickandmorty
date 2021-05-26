import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {

  constructor(private http: HttpClient) {

  }


  getQuery(name: string, page: number = 1) {
    if (name === '-') {
      name = '';
    }

    const url = `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`;
    const headers = new HttpHeaders({

    });

    return this.http.get(url, { headers });
  }

  getCharacters(name:string, page:number = 1) {
    //return this.getQuery(name,page).pipe( map((data:any) => data['results'] ));
    return this.getQuery(name,page);
  }
}

export interface Character{
  id: number;
  name: string;
  image: string;
  status: string;
  gender: string;
  origin: object;
  lastPlace: object;
};
