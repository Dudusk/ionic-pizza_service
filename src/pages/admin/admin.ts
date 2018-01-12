import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PizzaServices } from '../../providers/pizza-services/pizza-services';
import { ModifPizzaPage } from "../modif-pizza/modif-pizza";

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  stockItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pizzaServ: PizzaServices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
    this.pizzaServ.get().then(item => {
      console.log(item);
      this.stockItem = item;
    });
  }

  itemTapped(event, item) {
    this.navCtrl.push(ModifPizzaPage, {
      item: item
    });
  }

  deletePizza(event, item){
    console.log(item);
    this.pizzaServ.delete(item.id);
    this.reload();
  }

  reload(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

}
