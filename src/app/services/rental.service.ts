import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient:HttpClient) { }

  getRentalDetail(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = environment.apiUrl+"rentals/getdetailsbycarid?carId?="+carId
    return this.httpClient.get<ListResponseModel<Rental>>(newPath)
  }

  AddRental(rental:Rental){
    let newPath = environment.apiUrl+"rentals/add"
    this.httpClient.post(newPath,rental).subscribe()
  }

  isRentable(rental:Rental):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "rentals/isrentable"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}