import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from "@angular/common/http";

import { TmdbTvResults } from './tmdb-tv-Results';
import { TmdbConfig } from './tmdb-config';
import { TmdbTvItem } from './tmdb-tv-item';
import { TmdbTvDetail } from './tmdb-tv-detail';

import * as moment from 'moment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TmdbService {
  tmdbConfig:TmdbConfig;
  private searchResultSource = new Subject<TmdbTvResults>();
  searchResult$ = this.searchResultSource.asObservable();

  constructor(private http: HttpClient) {
  }
  setApiKey(apiKey:string) {
    if(apiKey.length>0){
      localStorage.setItem("tmdbapikey", apiKey.trim());
    }
  }
  getApiKey():string {
    return localStorage.getItem("tmdbapikey");
  }
  hasApiKey():boolean {
    let apiKey = this.getApiKey();
    return (apiKey&&apiKey.length===32);
  }
  async getConfig(apiKey:string=this.getApiKey()){
    if(!this.tmdbConfig){
      const params = {
        api_key:apiKey
      };
      this.tmdbConfig = await this.http.get<TmdbConfig>("https://api.themoviedb.org/3/configuration", {params:new HttpParams({fromObject:params})}).toPromise();
    }
    return this.tmdbConfig;
  }
  getTv(id:number){
    const params = {
      api_key:this.getApiKey(),
      language:'ko'
    };
    return this.http.get<TmdbTvDetail>(`https://api.themoviedb.org/3/tv/${id}`, {params:new HttpParams({fromObject:params})});
  }
  searchTV(keyword:string="", page = 1){
    const params = {
      api_key:this.getApiKey(),
      page:page.toString(),
      language:'ko'
    };
    if(!keyword || keyword.length===0){
      this.searchResult$ = this.searchByDiscover(page);
    }else{
      this.searchResult$ = this.searchByKeyword(keyword, page);
    }
    return this.searchResult$;
  }
  searchByDiscover(page = 1){
    const params = {
      api_key:this.getApiKey(),
      page:page.toString(),
      timezone:'korean',
      language:'ko',
      with_original_language:'ko',
      'air_date.gte':moment().startOf("week").format("yyyy-MM-DD"),
      'air_date.lte':moment().endOf("week").format("yyyy-MM-DD")
    };
    return this.http.get<TmdbTvResults>("https://api.themoviedb.org/3/discover/tv", {params:new HttpParams({fromObject:params})});
  }
  searchByKeyword(keyword:string="", page = 1){
    const params = {
      api_key:this.getApiKey(),
      page:page.toString(),
      language:'ko',
      query:keyword
    };
    return this.http.get<TmdbTvResults>("https://api.themoviedb.org/3/search/tv", {params:new HttpParams({fromObject:params})});
  }
  getBaseUrl(){
    return this.tmdbConfig.images.base_url;
  }
  getPosterSize(){
    return this.tmdbConfig.images.poster_sizes[1];
  }
  getBackdropSize(){
    return this.tmdbConfig.images.backdrop_sizes[1];
  }
  getStillSize(){
    return this.tmdbConfig.images.still_sizes[0];
  }
  getImageUrl(item:TmdbTvItem){
    if(this.tmdbConfig){
      return [this.getBaseUrl(), this.getPosterSize(), item.poster_path].join("");
    }else{
      return "";
    }
  }
  getBackdropUrl(item:TmdbTvItem){
    if(this.tmdbConfig){
      return [this.getBaseUrl(), this.getBackdropSize(), item.backdrop_path].join("");
    }else{
      return "";
    }
  }
  getStillUrl(img:string){
    if(this.tmdbConfig){
      return [this.getBaseUrl(), this.getStillSize(), img].join("");
    }else{
      return "";
    }
  }
}
