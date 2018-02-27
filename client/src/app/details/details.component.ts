import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  one = {};
  delete_res = {};
  clicked: boolean;

  constructor(
    private _myServiceService: MyServiceService,
    private _route: ActivatedRoute,
    private _router: Router,
  ){}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      console.log( "params id", params['id']);
      this.get_one( params['id'] );
    })
    
  }

  get_one( id ){
    let observable = this._myServiceService.get_one( id );
    observable.subscribe( data => {
      this.one = data["data"][0];
      console.log( "get_one in details.component.ts:", this.one );
    })
  }

  delete_one( id ){
    let observable = this._myServiceService.delete_one( id );
    observable.subscribe( data => {
      this.delete_res = data;
      console.log( "delete_one in details.component.ts:", this.delete_one );
      this.home();
    })
  }

  home(){
    console.log( "home in details.component.ts" );
    this._router.navigate( ["/products"] );
  }

  edit( id ){
    console.log( "edit in details.component.ts" );
    this._router.navigate( [`/products/edit/${id}`])
  }


}
