import { Component, OnInit } from '@angular/core';
import { MyServiceService } from "./../my-service.service";
import { Router } from "@angular/router";
import { DetailsComponent } from "./../details/details.component";


@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  all = {};

  constructor(
    private _myServiceService: MyServiceService,
    private _router: Router,
    private _detailsComponent: DetailsComponent,
  ){}

  ngOnInit() {
    this.all_get();
  }

  all_get(){
    let observable = this._myServiceService.all();
    observable.subscribe( data => {
      this.all = data;
      console.log( "all_get in all.component.ts says:", this.all );
    })
  }

  details( id ){
    this._router.navigate([`/products/${id}`]);
  }

  edit( id ){
    this._router.navigate([`/products/edit/${id}`]);
  }

  delete( id ){
    this._detailsComponent.delete_one( id );
    this.all_get()
  }
}
