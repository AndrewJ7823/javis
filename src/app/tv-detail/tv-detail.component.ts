import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { TmdbService } from "../tmdb.service";
import { TmdbTvDetail } from '../tmdb-tv-detail';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.scss']
})
export class TvDetailComponent implements OnInit {
  tmdbConfig;
  id;
  tmdbTvDetail;
  constructor(private route:ActivatedRoute, private tmdbService:TmdbService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.id = params.get("id");
      this.tmdbService.getConfig().then(tmdbConfig => {
        this.tmdbConfig = tmdbConfig;
        this.tmdbService.getTv(this.id).subscribe(tmdbTvDetail=>{
          this.tmdbTvDetail = tmdbTvDetail;
        });
      });

    });
  }
  getSearchUrl(tmdbTvDetail:TmdbTvDetail){
    let date = tmdbTvDetail.last_episode_to_air.air_date.replace(/-/g, "").substr(2);
    let ret = `${tmdbTvDetail.name} ${date} torrent`;
    return `https://www.google.com/search?q=${ret}`;
  }
}
