import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ListComponent, HomeComponent],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatButtonModule
  ]
})
export class ListModule { }
