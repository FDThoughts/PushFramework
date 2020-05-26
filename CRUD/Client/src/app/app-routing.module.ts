import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './Product/product/product.component';
import { EditComponent } from './Product/edit/edit.component';

const routes: Routes = [
  {path: 'edit', component: EditComponent},
  {path: 'product', component: ProductComponent},
  {path: '', redirectTo: '/product', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
