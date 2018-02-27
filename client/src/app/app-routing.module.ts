import { AllComponent } from "./all/all.component";
import { DetailsComponent } from "./details/details.component";
import { EditComponent } from "./edit/edit.component";
import { NewComponent } from "./new/new.component";

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "products", component: AllComponent },
  { path: "products/new", component: NewComponent },
  { path: "products/:id", component: DetailsComponent },
  { path: "products/edit/:id", component: EditComponent },
  { path: "", pathMatch: "full", redirectTo: "products" },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
})
export class AppRoutingModule {}
