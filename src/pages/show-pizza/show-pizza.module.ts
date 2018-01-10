import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowPizzaPage } from './show-pizza';

@NgModule({
  declarations: [
    ShowPizzaPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowPizzaPage),
  ],
})
export class ShowPizzaPageModule {}
