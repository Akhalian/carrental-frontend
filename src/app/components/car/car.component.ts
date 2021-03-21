import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/car-detail';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[] = [];
  carDetail:CarDetail;
  dataLoaded = false;
  filterText="";
  imageBasePath = environment.baseUrl

  constructor(private carService: CarService, private activatedRoute:ActivatedRoute) {}


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else{
        this.getCars()
      }
    })
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.carDetails = response.data;
      console.log(response)
      this.dataLoaded = true;
    });
  }

  getCarsByBrand(brandId:number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(brandId:number) {
    this.carService.getCarsByColor(brandId).subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

}