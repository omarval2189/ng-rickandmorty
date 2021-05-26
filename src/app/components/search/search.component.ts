import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { RickandmortyService } from "../../services/rickandmorty.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  characters: any[] = [];
  selectedChar: any = {};
  showUnselectedChar: boolean = true;
  loading: boolean = true;
  error: boolean = false;

  totalPages: number = 0;
  term: string = '';
  page: number = 1;

  constructor( private activatedRoute:ActivatedRoute,
              private rickAndMorty: RickandmortyService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {
      this.term = params['term'] || '-';
      this.page = params['page'] || 1;
      this.rickAndMorty.getCharacters(this.term, this.page)
        .subscribe( (data:any) => {
          this.characters = data.results;
          this.loading = false;
          this.totalPages = data.info.pages;
        }, error => {
          this.loading = false;
          this.error = true;
        });
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  selectChar(char:object) {
    this.selectedChar = char;
    this.showUnselectedChar = false;
  }

  convertToInt(val: any){
    return parseInt(val);
  }

}
