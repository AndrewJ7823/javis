import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TmdbService } from "../tmdb.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  savedApiKey;
  welcomeForm;
  constructor(private tmdbService:TmdbService, private router: Router) { }

  ngOnInit(): void {
    if(this.tmdbService.hasApiKey()){
      this.moveToDiscovery();
    }
    this.savedApiKey = this.tmdbService.getApiKey();
    this.welcomeForm = new FormGroup({
      apiKey: new FormControl('', [
        Validators.required,
        Validators.minLength(32),
        Validators.maxLength(32),
        this.validateApiKey()
      ])
    });
  }
  get apiKey() {
    return this.welcomeForm.get("apiKey");
  }
  validateApiKey(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const isValid = /[0-9a-z]{32}/ig.test(control.value);
      return !isValid ? {apiKey: {value: control.value}} : null;
    };
  }
  saveApiKey() {
    this.tmdbService.getConfig(this.apiKey.value).then(tmdbConfig=>{
      this.tmdbService.setApiKey(this.apiKey.value);
      this.moveToDiscovery();
    });
  }
  moveToDiscovery() {
    this.router.navigate(['/discovery']);
  }
}
