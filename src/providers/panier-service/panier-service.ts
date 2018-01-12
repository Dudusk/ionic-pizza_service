import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panier } from "../../models/panier";
import {ToastController} from "ionic-angular";

/*
  Generated class for the PanierServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PanierServiceProvider {

  private readonly url = "http://172.20.10.4:3000/panier/";

  constructor(public http: HttpClient, private toastCtrl: ToastController) {
    console.log('Hello PanierServiceProvider Provider');
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }


  post(postParams: any){
    return new Promise<Array<Panier>>(resolve => {
      this.http.post(this.url, postParams)
        .subscribe(data => {
          console.log(data);
          this.presentToast("La pizza a été ajoutée au panier !");
        }, error => {
          console.log(error);// Error getting the data
          this.presentToast("La pizza n'a pas été ajoutée dans le panier..");
        });
    });
  }

  get(){
    let panierArray: Array<Panier> = new Array<Panier>();

    return new Promise<Array<Panier>>(resolve => { //On créer promesse qui aura un array de pizza. Resole : callback
      //Le resolve de http -->
      this.http.get(this.url)
        .subscribe((data: Array<any>) => {
          //console.log("Data :" + data[0]);
          for(let i = 0; i < data.length ; i++){
            panierArray.push(new Panier(data[i]['id'], data[i]['name'], data[i]['desc'], data[i]['picture'], data[i]['price'], data[i]['ingredients'], data[i]['quantity']))
          }
          resolve(panierArray);
          console.log('Panier : ' + panierArray);
          return(panierArray);
        });
      // <--
    });
  }

  put(id: number, body) {
    return new Promise<Array<Panier>>(resolve => {
      this.http.put(this.url + id, body)
        .subscribe(
          data => {
             this.presentToast("La quantité de pizza a été modifiée avec succès !");
          },
          error => {
            console.log("Error", error);
            this.presentToast("Impossible" + error);
          }
        );
    })
  }

  delete(id: number){
    this.http.delete(this.url + id)
      .subscribe(
        data => {
        },
        error => {
          console.log("Error", error);
        }
      );
  }
}
