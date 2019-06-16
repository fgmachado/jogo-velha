import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabuleiroComponent } from './tabuleiro/tabuleiro.component';

const routes: Routes = [
  { path: '', component: TabuleiroComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
