import { Component } from '@angular/core';
import { PizzaServices } from '../../providers/pizza-services/pizza-services';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModifPizzaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modif-pizza',
  templateUrl: 'modif-pizza.html',
})
export class ModifPizzaPage {

  pizza;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pizzaServ: PizzaServices) {
    this.pizza = navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifPizzaPage');
  }

  modifier(){
    this.pizzaServ.put(this.pizza.id, this.pizza)
  }

}
