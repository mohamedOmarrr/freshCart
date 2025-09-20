import { Component, input } from '@angular/core';
import { Categor } from '../../interfaces/categor';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';


@Component({
  selector: 'app-category',
  imports: [CommonModule, CarouselModule],
  templateUrl: './carousel-cate.html',
  styleUrl: './carousel-cate.scss'
})
export class CarouselCate {

  categories = input<Categor[]>();

  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 4, numScroll: 1 },
    { breakpoint: '768px', numVisible: 3, numScroll: 1 },
    { breakpoint: '560px', numVisible: 2, numScroll: 1 },
  ];


}
