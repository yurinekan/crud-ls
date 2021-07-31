import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToDoListPageRoutingModule } from './to-do-list-routing.module';

import { ToDoListPage } from './to-do-list.page';

import { LottieModule } from 'ngx-lottie'
import player from 'lottie-web'

export function playerFactory() {
  return player;
}
@NgModule({
  imports: [
    CommonModule,
    LottieModule.forRoot({player: playerFactory}),
    FormsModule,
    IonicModule,
    ToDoListPageRoutingModule
  ],
  declarations: [ToDoListPage]
})
export class ToDoListPageModule {}
