import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PanierServiceProvider } from '../../providers/panier-service/panier-service';
import {HomePage} from "../home/home";

/**
 * Generated class for the ShowPizzaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 *
 *
 *
 * Problème rencontré : J'ai un problème d'ID lorsque j'ajoute ma pizza a panier,
 * Il prend l'ID de la pizza déjà existante, il en faudrait un nouveau
 *
 */

@IonicPage()
@Component({
  selector: 'page-show-pizza',
  templateUrl: 'show-pizza.html',
})
export class ShowPizzaPage {

  pizza: any;

  newPizza;

  constructor(public navCtrl: NavController, public navParams: NavParams, private panierService: PanierServiceProvider) {
    this.pizza = navParams.get("item");
    console.log(this.pizza);

    if(this.pizza){
      this.newPizza = {
        name: this.pizza.name,
        desc: this.pizza.desc,
        picture: this.pizza.picture,
        price: this.pizza.price,
        ingredients: this.pizza.ingredients
      }
    } else {
      this.delay(200);
      this.newPizza = {
        name: this.pizza.name,
        desc: this.pizza.desc,
        picture: this.pizza.picture,
        price: this.pizza.price,
        ingredients: this.pizza.ingredients
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowPizzaPage');
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  addToCart(){
    this.panierService.post(this.newPizza).then(
      (succes) => {
        console.log(succes);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
