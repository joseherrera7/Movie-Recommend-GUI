import { environment } from "./../../../environments/environment";
import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Item } from "./movie";
import { Observable } from "rxjs";
import axios from "axios";
import { Router } from "@angular/router";

@Component({
  selector: "app-movies",
  templateUrl: "./movies.component.html",
  styleUrls: ["./movies.component.scss"],
})
export class MoviesComponent implements OnInit {
  public copy: string;
  public movies: Item[];
  public recomendations: Item[];
  public Title = 'Top todo el mundo'

  private baseUrl = environment.protocolo + environment.server + ":" +environment.puerto;
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    }),
  };
  private options = {
    headers: {
      "X-Content-Header": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
  };

  constructor(private http: HttpClient, private router: Router) {}

  async ngOnInit() {
    if (!localStorage.getItem("user_email")) {
      this.router.navigate(['login']);
    }

    // Recomendar al inicio de sesión
    if (localStorage.getItem("recomendations") != "null") {   
      let recomendations = localStorage.getItem("recomendations")
      let generos = recomendations.split('|')

      const { data } = await axios.post(
        this.baseUrl + "/knnGenreBased", 
        { genres: generos },
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );

      this.Title = 'Top para ti'
      this.movies = data.recommendations;
    }
    else {

      const { data } = await axios.get( 
        this.baseUrl + "/coldstart", 
        { headers: { "Access-Control-Allow-Origin": "*" } }
      );

      this.movies = data.movies.map(function(x) {
        return {
          imdb_score: Number.parseFloat(x.imdb_score).toFixed(2),
          movie_title: x.movie_title.trim(),
          num_critic_for_reviews: x.num_critic_for_reviews,
          score: Number.parseFloat(x.score).toFixed(2)
        }
      });
    }
  }

  async encontrarRecomendaciones(movie_title) {
    const { data } = await axios.post(
      this.baseUrl + "/recommendations", 
      { movie_title: movie_title },
      this.options
    );

    this.recomendations = data.recommendations;
  }

  async agregarAFavoritos(genres, movie_title) {
    // si la película tiene el campo de géneros
    if (genres) {
      let generos = genres.split('|')

      const { data } = await axios.post(
        this.baseUrl +"/knnGenreBased", 
        { genres: generos },
        this.options
      );
      
      this.recomendations = data.recommendations;

      // Agregar recomendaciones al usuario en BD
      const result = await axios.post(
        "https://9v7tw9x26a.execute-api.us-east-1.amazonaws.com/dev/recomendations", 
        { 
          action: "add",
          email: localStorage.getItem("user_email"),
          genres: genres
        }
      );

      if (result.data != "Error") {
        console.log(result.data)
        localStorage.setItem("recomendations", result.data)
      }
    }
    else {
      const { data } = await axios.post(
        this.baseUrl + "/recommendations", 
        { movie_title: movie_title },
        this.options
      );

      this.recomendations = data.recommendations;
    }
  }

  async quitarDeFavoritos(genres) {
    // Agregar recomendaciones al usuario en BD
    const result = await axios.post(
      "https://9v7tw9x26a.execute-api.us-east-1.amazonaws.com/dev/recomendations", 
      { 
        action: "remove",
        email: localStorage.getItem("user_email"),
        genres: genres
      }
    );

    if (result.data != "Error") {
      localStorage.setItem("recomendations", result.data)
    }
  }
}
