import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewPizzaPage } from './new-pizza';

@NgModule({
  declarations: [
    NewPizzaPage,
  ],
  imports: [
    IonicPageModule.forChild(NewPizzaPage),
  ],
})
export class NewPizzaPageModule {}
