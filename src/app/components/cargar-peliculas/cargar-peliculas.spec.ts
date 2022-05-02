import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarPeliculasComponent } from './cargar-peliculas';

describe('CargarPeliculasComponent', () => {
  let component: CargarPeliculasComponent;
  let fixture: ComponentFixture<CargarPeliculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarPeliculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
