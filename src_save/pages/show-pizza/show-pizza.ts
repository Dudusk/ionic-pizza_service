import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pizza = navParams.get("item");
    console.log(this.pizza);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowPizzaPage');
  }

}
