
export class Car {
    constructor(public id?:number,public imageUrl?:string ,
      public brand?: string, 
      public registerNumber?:string, 
      public  available?:boolean, 
      public  active?:boolean,
      public engaged?:boolean,
      public location?:string,
      public  rentPerHour?:number,
      public deposit?:number,
      public  fuelType?:string,
      public gearType?:string,
      public  noOfSeats?:number,
      public airConditioned?:boolean,
      public mileage?:string) {}
  }
  