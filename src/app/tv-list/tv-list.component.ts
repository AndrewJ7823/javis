import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TmdbService } from "../tmdb.service";

import { TmdbConfig } from "../tmdb-config";
import { TmdbTvDiscovery } from "../tmdb-tv-discovery";
import { TmdbTvItem } from "../tmdb-tv-item";


@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.scss']
})
export class TvListComponent implements OnInit {
  tmdbConfig:TmdbConfig;
  tmdbTvDiscovery:TmdbTvDiscovery;
  tmdbTvItems;
  page=1;
  constructor(private tmdbService:TmdbService, private router: Router) {
  }

  ngOnInit(): void {
    if(this.tmdbService.hasApiKey()){
      Promise.all([
        this.tmdbService.getConfig(),
        this.tmdbService.getDiscover(this.page)
      ]).then(values=>{
        this.tmdbConfig = values[0];
        this.tmdbTvItems= values[1].results;
      });
    }else{
      this.moveToWelcome();
    }

  }
  moveToWelcome() {
    this.router.navigate(['/']);
  }
  getBaseUrl(){
    return this.tmdbConfig.images.base_url;
  }
  getPosterSize(){
    return this.tmdbConfig.images.poster_sizes[1];
  }
  getImageUrl(item:TmdbTvItem){
    return [this.getBaseUrl(), this.getPosterSize(), item.poster_path].join("");
  }
}
