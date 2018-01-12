import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PanierServiceProvider } from '../../providers/panier-service/panier-service';
import {HomePage} from "../home/home";

/**
 * Generated class for the ShowPizzaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-pizza',
  templateUrl: 'show-pizza.html',
})
export class ShowPizzaPage {

  pizza: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private panierService: PanierServiceProvider) {
    this.pizza = navParams.get("item");
    console.log(this.pizza);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowPizzaPage');
  }

  addToCart(){
    this.panierService.post(this.pizza).then(
      (succes) => {
        console.log(succes);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
