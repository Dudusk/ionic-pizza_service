export class Panier {
  //tuple : Array<[Pizza, any]>;
  constructor(public id: number = null,
              public name: string = "",
              public desc: string = "",
              public picture: string = "",
              public price: number = null,
              public ingredients: string = "",
              public quantity: number = 1
  ) {}


}
