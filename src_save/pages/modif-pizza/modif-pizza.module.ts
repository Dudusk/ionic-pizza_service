import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifPizzaPage } from './modif-pizza';

@NgModule({
  declarations: [
    ModifPizzaPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifPizzaPage),
  ],
})
export class ModifPizzaPageModule {}
