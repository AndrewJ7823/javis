
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  faSearch = faSearch;
  searchForm;
  searchMode:boolean=false;
  @ViewChild("keyword") keyword:ElementRef;
  constructor(private formBuilder: FormBuilder) {
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
    alert(`search ${this.searchForm.value.keyword}`);
  }
}
