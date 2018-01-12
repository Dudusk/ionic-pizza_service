import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PanierServiceProvider } from "../../providers/panier-service/panier-service";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  panier: any;
  total : number = 0;

  constructor(public navCtrl: NavController, public panierService: PanierServiceProvider) {
    this.panierService.get().then(
      (success) => {
        console.log("Success : " + success);
        this.panier = success;
        //Problème pour stocker dans une variable (panier)
        this.totalCount();
      }
    );
    console.log(this.panier);
  }

  totalCount(){
    for(let i = 0 ; i < this.panier.length ; i++){
      this.total += this.panier[i].price;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  validate(item, quantity){
    let quantityOfPanier = this.panier[item.id].quantity;
    this.panier[item.id].quantity = quantityOfPanier;

    console.log("Gne : " + this.panier[item.id].id)

    this.panierService.put(item.id, this.panier[item.id]).then(
      (success) => {
        console.log(success);
      },
      (error) => {
        console.error(error);
      }
    )
  }

  itemTappedMoins(event, item) {
    // That's right, we're pushing to ourselves!
    console.log("Panier : "  + this.panier[item.id].quantity);
    this.panier[item.id].quantity--;
    console.log(this.panier[item.id].quantity);
  }

  itemTappedPlus(event, item) {
    // That's right, we're pushing to ourselves!
    console.log("Panier quantity : "  + this.panier[item.id].quantity);
    //this.panier[item.id].quantity++;
    //console.log(this.panier[item.id].quantity);
  }

  reload(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  clearCart(){
    //this.panier.length
    for(let i = 1 ; i<10 ; i++){
      this.panierService.delete(i);
    }

  }

}
