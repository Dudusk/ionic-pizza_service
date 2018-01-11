import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pizza } from '../../models/pizza';
import { ToastController } from "ionic-angular";

/*
  Generated class for the PizzaServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PizzaServices {
  //http://10.13.0.248:3000/pizza/
  private readonly url = "http://localhost:3000/pizza/";

  constructor(private http: HttpClient, private toastCtrl: ToastController) {
    console.log('Hello PizzaServicesProvider Provider');
  }

  presentToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  get(){
  	let pizzaArray: Array<Pizza> = new Array<Pizza>();

  	return new Promise<Array<Pizza>>(resolve => { //On créer promesse qui aura un array de pizza. Resole : callback
  		//Le resolve de http -->
  		this.http.get(this.url)
  			.subscribe((data: Array<any>) => {
	  			//console.log("Data :" + data[0]);
	  			for(let i = 0; i < data.length ; i++){
	  				pizzaArray.push(new Pizza(data[i]['id'], data[i]['name'], data[i]['desc'], data[i]['picture'], data[i]['price'], data[i]['ingredients']))
	  			}
	  		resolve(pizzaArray);
	  	});
  		// <--
  	});
  }


  getById(idPizza: number){
  	let pizzaArraySearched: Array<Pizza> = new Array<Pizza>();

  	return new Promise<Array<Pizza>>(resolve => { //On créer promesse qui aura un array de pizza. Resole : callback
  		//Le resolve de http -->
  		this.http.get(this.url)
  			.subscribe((data: Array<any>) => {
	  			//console.log(data[0]);
  				pizzaArraySearched.push(new Pizza(data[idPizza]['id'], data[idPizza]['name'], data[idPizza]['desc'], data[idPizza]['picture'], data[idPizza]['price'], data[idPizza]['ingredients']))
	  		resolve(pizzaArraySearched);
	  	});
  		// <--
  	});
  }

  post(postParams: any) {
    return new Promise<Array<Pizza>>(resolve => {
      this.http.post(this.url, postParams)
        .subscribe(data => {
          console.log(data);
          this.presentToast("La pizza a été créée avec succès !");
        }, error => {
          console.log(error);// Error getting the data
          this.presentToast("La pizza n'a pas été créée.");
        });
    });
  }

  put(id: number, body) {
    return new Promise<Array<Pizza>>(resolve => {
      this.http.put(this.url + id, body)
        .subscribe(
          data => {
            console.log("Modificiation avec succès ", data);
            this.presentToast("La pizza a été modifiée avec succès !");
          },
          error => {
            console.log("Error", error);
            this.presentToast("La pizza n'a pas été modifiée..");
          }
        );
    })
  }

  delete(id: number){
    this.http.delete(this.url + id)
      .subscribe(
        data => {
          console.log("Suppression réussie ", data);
          this.presentToast("La pizza a été supprimée avec succès !");
        },
        error => {
          console.log("Error", error);
          this.presentToast("La pizza n'a pas été supprimée..");
        }
      );
  }



}
