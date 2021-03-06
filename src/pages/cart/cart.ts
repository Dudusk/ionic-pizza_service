import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController, AlertController} from 'ionic-angular';
import { PanierServiceProvider } from "../../providers/panier-service/panier-service";
import { PizzaServices } from "../../providers/pizza-services/pizza-services";

//Stocké la quantité et l'ID dans le localStorage

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
  panierSplited
  pizzas: any;
  total;
  cleared = true;
  etat = true; //true = Plus ou false = moins


  constructor(public navCtrl: NavController,
              public panierService: PanierServiceProvider,
              private toastCtrl: ToastController,
              private pizzaService: PizzaServices,
              private alertCtrl: AlertController) {

  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  totalCount() {
    this.total = 0;
    if (this.etat) {
      for (let i = 0; i < this.panier.length; i++) {
        if (this.panier[i].price != 0 && this.total != 0) {
          this.total = parseFloat(this.total) + parseFloat(this.panier[i].price) * parseFloat((this.panier[i].quantity));
        } else {
          this.total = parseFloat(this.panier[i].price);
        }
      }
    } else {
      for (let i = 0; i < this.panier.length; i++) {
        if (this.panier[i].price != 0 && this.total != 0) {
          this.total = parseFloat(this.total) - parseFloat(this.panier[i].price) * parseFloat((this.panier[i].quantity));
        } else {
          this.total = parseFloat(this.panier[i].price);
        }
      }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.panierService.get().then(
      success => {
        console.log("Success : " + success);
        this.panier = success;
        this.totalCount();
      }
    );

    //Get pizzas
    //Get panier plutot
    this.panierService.get().then( success =>{
      this.pizzas = success;
    });
  }


  async itemTappedMoins(event, item) {
    this.panier[item.id -1].quantity--;

    if(this.panier[item.id -1].quantity <= 0){

      let alert = this.alertCtrl.create({
        title: 'Confirmer',
        message: 'Voulez-vous vraiment supprimer la pizza ?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              this.panier[item.id -1].quantity++;
            }
          },
          {
            text: 'Confirmer',
            handler: () => {
              this.panierService.put(item.id, this.panier[item.id -1])
              this.etat = false;
              this.panierService.delete(item.id);
              this.reload();
            }
          }
        ]
      });
      alert.present();
    }



    this.totalCount();
  }

  async itemTappedPlus(event, item) {
    this.panier[item.id -1].quantity++;

    this.panierService.put(item.id, this.panier[item.id -1]);
    this.etat = true;
    this.totalCount();
  }

  reload(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  clearCart(){
    if(this.cleared){
      //this.panier.length
      for(let i = 1 ; i<this.pizzas.length ; i++){
        this.panierService.delete(i);
        this.reload();
      }
      this.presentToast("Pizza(s) supprimée(s) avec succès !");
    } else {
      for(let i = 1 ; i<this.pizzas.length ; i++){
        this.panierService.delete(i);
        this.reload();
      }
      if(this.panier != undefined){
        this.presentToast("Pizza(s) commandée(s) !");
      } else {
        this.presentToast("Pizza(s) non commandée(s) !");
      }
    }

  }

  deletePizza(event, item){
    this.panierService.delete(item.id);
    this.reload();
  }

  vider(){
    this.cleared = true;
    this.clearCart();
  }

  commander(){
    this.cleared = false;
    this.clearCart();
  }

}
