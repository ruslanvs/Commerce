import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  one = {};
  lim = {};
  errors = {};

  constructor(
    private _myServiceService: MyServiceService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){}

  ngOnInit(){
    this.constraints();
    this._route.params.subscribe( ( params: Params ) => {
      console.log( "params id", params["id"] );
      this.get_one( params["id"] );
    })
  }

  constraints(){
    let observable = this._myServiceService.constraints()
    observable.subscribe( data => {
      this.lim = data
    })
  }

  get_one( id ){
    let observable = this._myServiceService.get_one( id );
    observable.subscribe( data => {
      this.one = data["data"][0];
    })
  }

  update( form_data ){
    let observable = this._myServiceService.update( form_data._id, form_data );
    observable.subscribe( data => {
      if( "error" in data ){ this.errors = data["error"]["errors"] }
      else{ this.details( form_data._id ) }
    })
  }

  details( id ){
    this._router.navigate( [`/products/${id}`] )
  }

}
