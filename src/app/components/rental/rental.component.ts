import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  carDetail: CarDetail;
  startDate: Date;
  endDate: Date;
  rentPrice: number = 0;
  rental: Rental;
  rentable: Boolean = false;
  imageBasePath = environment.baseUrl;

  constructor(
    private rentalService: RentalService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetail(params['carId']);
      }
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetail(carId).subscribe((response) => {
      this.carDetail = response.data[0];
    });
  }

  addRental() {
    if (this.rentable) {
      this.rental = this.rental;
      console.log(this.rental);
      this.router.navigate(['/creditcard/', JSON.stringify(this.rental)]);
      this.toastrService.info(
        'Kredi kartı ödeme sayfasına yönlendiriliyor',
        'Yönlendiriliyor'
      );
    } else {
      this.toastrService.error(
        'Bu tarihler arasında arabayı kiralayamazsınız',
        'Zaten kiralanmış'
      );
    }
  }

  setRentable() {
    this.rentalService.isRentable(this.rental).subscribe((response) => {
      this.rentable = response.success;
    });
  }

  calculatePrice() {
    if (this.startDate && this.endDate) {
      let endDate = new Date(this.endDate.toString());
      let startDate = new Date(this.startDate.toString());
      let endDay = Number.parseInt(endDate.getDate().toString());
      let endMonth = Number.parseInt(endDate.getMonth().toString());
      let endYear = Number.parseInt(endDate.getFullYear().toString());
      let startDay = Number.parseInt(startDate.getDate().toString());
      let startMonth = Number.parseInt(startDate.getMonth().toString());
      let startYear = Number.parseInt(startDate.getFullYear().toString());
      let result =
        (endDay -
          startDay +
          (endMonth - startMonth) * 30 +
          (endYear - startYear) * 365 +
          1) *
        this.carDetail.dailyPrice;
      if (result > 0) {
        this.rental = {
          carId: this.carDetail.carId,
          rentDate: this.startDate,
          returnDate: this.endDate,
        };
        console.log(result);
        this.rentPrice = result;
        this.setRentable();
      } else {
        this.rentPrice = 0;
        this.toastrService.info(
          'Bu tarihler arasında arabayı kiralayamazsınız',
          '!'
        );
      }
    } else {
      this.rentPrice = 0;
      this.toastrService.info(
        'Bu tarihler arasında arabayı kiralayamazsınız',
        '!'
      );
    }
  }
}
