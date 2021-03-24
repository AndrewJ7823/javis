import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TmdbService } from "../tmdb.service";

import { TmdbConfig } from "../tmdb-config";
import { TmdbTvResults } from "../tmdb-tv-Results";
import { TmdbTvItem } from "../tmdb-tv-item";


@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.scss']
})
export class TvListComponent implements OnInit {
  tmdbConfig:TmdbConfig;
  tmdbTvResults:TmdbTvResults;
  tmdbTvItems;
  keyword:string;
  page=1;
  constructor(private tmdbService:TmdbService, private router: Router, private route:ActivatedRoute) {

  }

  ngOnInit(): void {
    if(this.tmdbService.hasApiKey()){
      this.tmdbService.getConfig().then(
        tmdbConfig => {
          this.tmdbConfig = tmdbConfig;
          this.route.paramMap.subscribe(params=>{
            this.keyword = params.get("keyword");
            this.tmdbService.searchTV(this.keyword).subscribe(tmdbTvResults=>{
              this.tmdbTvItems = tmdbTvResults.results;
            });
          });
        }
      );
    }else{
      this.moveToWelcome();
    }

  }
  moveToWelcome() {
    this.router.navigate(['/']);
  }
}
