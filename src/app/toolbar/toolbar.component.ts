
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faSearch, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { TmdbService } from "../tmdb.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  faSearch = faSearch;
  faChevronLeft = faChevronLeft;
  searchForm;
  searchMode:boolean=false;
  @ViewChild("keyword") keyword:ElementRef;
  constructor(private formBuilder: FormBuilder, private router: Router, private tmdbService:TmdbService) {
    this.searchForm = this.formBuilder.group({
      keyword:''
    });
  }

  ngOnInit(): void {
  }
  setSearchMode(): void {
    this.searchMode=true;
    setTimeout(()=>{
      this.keyword.nativeElement.focus();
    });
  }
  onSubmit(): void {
    this.searchMode=false;
    this.router.navigate(['/discovery', this.searchForm.value.keyword]);
    // this.tmdbService.searchTV(this.searchForm.value.keyword);
  }
  back(): void{
    history.back();
  }
}
