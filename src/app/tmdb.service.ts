import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from "@angular/common/http";

import { TmdbTvDiscovery } from './tmdb-tv-discovery';
import { TmdbConfig } from './tmdb-config';
import { TmdbTvDetail } from './tmdb-tv-detail';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class TmdbService {
  tmdbConfig:TmdbConfig;
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
  async getConfig(){
    if(!this.tmdbConfig){
      const params = {
        api_key:this.getApiKey()
      };
      this.tmdbConfig = await this.http.get<TmdbConfig>("https://api.themoviedb.org/3/configuration", {params:new HttpParams({fromObject:params})}).toPromise();
    }
    return this.tmdbConfig;
  }
  async getDiscover(page = 1){
    const params = {
      api_key:this.getApiKey(),
      page:page.toString(),
      timezone:'korean',
      language:'ko',
      with_original_language:'ko',
      'air_date.gte':moment().startOf("week").format("yyyy-MM-DD"),
      'air_date.lte':moment().endOf("week").format("yyyy-MM-DD")
    };
    return await this.http.get<TmdbTvDiscovery>("https://api.themoviedb.org/3/discover/tv", {params:new HttpParams({fromObject:params})}).toPromise();
  }
  async getTv(id:number){
    const params = {
      api_key:this.getApiKey(),
      language:'ko'
    };
    return await this.http.get<TmdbTvDetail>(`https://api.themoviedb.org/3/tv/${id}`, {params:new HttpParams({fromObject:params})}).toPromise();
  }
}
