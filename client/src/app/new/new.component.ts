console.log( "NEW COMPONENT")

import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  new_product = {};
  lim = {};
  errors = {};

  constructor(
    private _myServiceService: MyServiceService,
    private _router: Router,
  ){}

  ngOnInit() {
    this.constraints();
  }

  constraints(){
    let observable = this._myServiceService.constraints()
    observable.subscribe( data => {
      this.lim = data
    })
  }

  create(){
    console.log( "create", this.new_product )
    let observable = this._myServiceService.create( this.new_product )
    observable.subscribe( data => {
      if( "error" in data ){ 
        this.errors = data["error"]["errors"]
        console.log( "errors in new.component:", this.errors )
       }
      else{ this.home() }
    })
  }

  home(){
    console.log( "home in new.component.ts");
    this._router.navigate( ["/products"] );
  }
}
