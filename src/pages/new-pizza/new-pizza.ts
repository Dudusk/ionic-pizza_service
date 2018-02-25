import { Component } from '@angular/core';
import {IonicPage, NavController, AlertController } from 'ionic-angular';
import { PizzaServices } from '../../providers/pizza-services/pizza-services';
import { HomePage } from '../../pages/home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the NewPizzaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-pizza',
  templateUrl: 'new-pizza.html',
})
export class NewPizzaPage {

  //CheckboxPopup
  testCheckboxOpen = false;

  name: string;
  ingreds = [];
  base64Image = "";
  imageImported = "";

  newPizza = {
    name: "",
    desc: "",
    picture: "",
    price: "",
    ingredients: this.ingreds
  };

  constructor(public navCtrl: NavController,
              public pizzaService: PizzaServices,
              public alertController: AlertController,
              public camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPizzaPage');
  }

  alerte() {
    let alert = this.alertController.create({
      title: 'Oopss... Un petit oubli..',
      subTitle: 'Il manque quelque chose dans les champs.',
      buttons: ['Je change ça !']
    });
    alert.present();
  }

  selectIngredients() {
    let alert = this.alertController.create();
    alert.setTitle('Quel ingrédients rajouter dans la pizza ?');

    alert.addInput({
      type: 'checkbox',
      label: 'Tomates',
      value: 'tomates'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Sauce barbecue',
      value: 'barbecue'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Fromage',
      value: 'fromage'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Mozzarella',
      value: 'mozzarella'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Oignons rouges',
      value: 'oignons rouges'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Poulet',
      value: 'poulet'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Humain',
      value: 'humain'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Crevettes',
      value: 'crevettes'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Petits poids',
      value: 'petits poids'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Carottes',
      value: 'carottes'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Jus de saucisse',
      value: 'jus de saucisse'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Café au micro-onde',
      value: 'cafe'
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Champignon de pied du cuisinier',
      value: 'champ cuisinier'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Okay',
      handler: data => {
        console.log('Checkbox data:', data);
        this.testCheckboxOpen = false;
        this.ingreds.push(data);
        console.log(this.ingreds);
      }
    });
    alert.present();
  }

  create(){
    if(this.newPizza.name && this.newPizza.desc && this.newPizza.ingredients && this.newPizza.picture && this.newPizza.price){
      this.pizzaService.post(this.newPizza)
        .then(data => {
          console.log(data);
          this.navCtrl.push(HomePage);
        }, error => {
          console.log(error);// Error getting the data
        });
    } else {
      this.alerte();
    }
  }

  gne(price){
    console.log("change");
    this.newPizza.price = price + ".00";
  }

  reload(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  screen(){
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.newPizza.picture = this.base64Image;
      this.imageImported = "";
    }, (err) => {
      console.log(err);
    });
  }

  importerImage(){
    const options: CameraOptions = {
      quality: 100,
      allowEdit : true,
      sourceType: this.camera.DestinationType.DATA_URL,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageImported = 'data:image/jpeg;base64,' + imageData;
      this.newPizza.picture = this.imageImported;
      this.base64Image = "";
    }, (err) => {
      console.log(err);
    });
  }

}
