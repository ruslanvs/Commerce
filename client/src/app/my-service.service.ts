import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MyServiceService {

  errors = {};

  constructor( private _myService: HttpClient ) {}

  constraints(){
    return this._myService.get( "constraints" );
  }

  // errors_rend( data ){
  //   console.log( "data in errors_rend in my-service.service:", data );
  //   if( data["error"]["code"] == 11000 )
  //   // {
  //   //   console.log ( "ERRORS:", this.errors )
  //   //   this.errors["name"] = `This name is already registered with another pet in the shelter. Please use a unique name.`
  //   //   // this.errors["name"] = `Name ${data["error"]["op"]["name"]} is already registered with another pet in the shelter. Please use a unique name.`
  //   //   console.log ( "ERRORS:", this.errors )
      
  //   // } else 
  //   // {
  //     for( let key in data["error"]["errors"] ){
  //       if( data["error"]["errors"][key]["kind"] == "minlength"){
  //         this.errors[key] = `${key} should have at least ${data["error"]["errors"][key]["properties"] [data["error"]["errors"][key]["kind"]] } characters.`
  //       }
  //       else if( data["error"]["errors"][key]["kind"] == "maxlength"){
  //         this.errors[key] = `${key} should not exceed ${data["error"]["errors"][key]["properties"] [data["error"]["errors"][key]["kind"]] } characters.`
  //       }
  //     }
  //   // }
  //   console.log ( "ERRORS:", this.errors )
  //   return this.errors
  // }
  
  all(){
    return this._myService.get( "products/express" );
  }

  get_one( id ){
    return this._myService.get( `/products/${id}/express` );
  }

  create( data ){
    return this._myService.post( "/products/create", data )
  }

  update( id, data ){
    return this._myService.put( `/products/${id}`, data );
  }

  // like( id ){
  //   return this._myService.get( `/pets/${id}/like` );
  // }

  delete_one( id ){
    return this._myService.delete( `/products/${id}` );
  }
}