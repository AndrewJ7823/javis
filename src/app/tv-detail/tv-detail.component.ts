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
  id;
  constructor(private route:ActivatedRoute, private tmdbService:TmdbService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.id = params.get("id");
    });
  }
  getTv() {

  }

}
