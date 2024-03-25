import { Injectable } from '@angular/core';
import { BookInputDto } from '../model/book-input-dto';

@Injectable({
  providedIn: 'root'
})
export class BookedDetailsService {
  bookInputDto:BookInputDto=new BookInputDto();
  constructor() { }
  getBookedDetails(){
    return this.bookInputDto;
  }
  setBookedDetails(bookedDetails:BookInputDto){
    this.bookInputDto=bookedDetails;
  }

  }

