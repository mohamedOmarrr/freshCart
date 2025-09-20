import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories implements OnInit {

  categories = [
    { name: 'Men\'s Fashion',    image: './images/men-category.jpg' },
    { name: 'Women\'s Fashion',  image: './images/women-category.jpg' },
    { name: 'Electronics',    image: './images/electronic-category.jpg' },
  ];

  constructor(private router:Router){}

  ngOnInit(): void {
    
  }

  getName(name:string){
    this.router.navigate(['/category', name])
  }


}
