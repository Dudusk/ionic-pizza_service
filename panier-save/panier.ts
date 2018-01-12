import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PanierServiceProvider } from "../../providers/panier-service/panier-service";

/**
 * Generated class for the PanierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-panier',
  templateUrl: 'panier.html',
})
export class PanierPage {

  panier;

  constructor(public navCtrl: NavController, public navParams: NavParams, private panierService: PanierServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PanierPage');
    this.panierService.get().then(item => {
      console.log(item);
      this.panier = item;
    });
  }



}
