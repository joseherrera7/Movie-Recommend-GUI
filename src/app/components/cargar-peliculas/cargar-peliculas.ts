import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargar-peliculas',
  templateUrl: './cargar-peliculas.html',
  styleUrls: ['./cargar-peliculas.scss']
})
export class CargarPeliculasComponent implements OnInit {
  

  constructor() { }

  ngOnInit() {
  }

}
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/cargar-peliculas', title: 'Cargar Peliculas',  icon: 'ni-tv-2 text-primary', class: '' }
];
