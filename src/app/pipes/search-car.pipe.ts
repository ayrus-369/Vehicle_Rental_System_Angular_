// import { Pipe, PipeTransform } from '@angular/core';

// @Pipe({
//   name: 'searchCar',
//   standalone: true
// })
// export class SearchCarPipe implements PipeTransform {

//   transform(value: unknown, ...args: unknown[]): unknown {
//     return null;
//   }

// }
import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../model/car';

@Pipe({
  name: 'searchCar',
  standalone: true
})
export class SearchCarPipe implements PipeTransform {

  transform(cars: Car[], query: string): Car[] {
    if (!cars || cars.length < 1 || !query) return cars;
    return cars.filter((car: Car) =>
      JSON.stringify(car).toLowerCase().includes(query.toLowerCase()));
  }

}
