import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from './movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public copy: string;
  public movies: Item[];

  private baseUrl = "https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query="
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.movies = [{
      movie_title: "Batman v Superman: Dawn of Justice",
      duration: "183",
      director_name: "Zack Snyder",
      title_year: "2016",
      imdb_score: "6.9",
      genres: ["Action", "Adventure", "Sci-Fi"],
      img: ""
    },
    {
      movie_title: "Batman v Superman: Dawn of Justice",
      duration: "183",
      director_name: "Zack Snyder",
      title_year: "2016",
      imdb_score: "6.9",
      genres: ["Action", "Adventure", "Sci-Fi"],
      img: ""
    },
    {
      movie_title: "Batman v Superman: Dawn of Justice",
      duration: "183",
      director_name: "Zack Snyder",
      title_year: "2016",
      imdb_score: "6.9",
      genres: ["Action", "Adventure", "Sci-Fi"],
      img: ""
    }]

    for (let index = 0; index < this.movies.length; index++) {
      let json = this.getPoster(this.movies[index].movie_title)
      this.movies[index].img = "http://image.tmdb.org/t/p/w500/" + json[0].poster_path
    }
  }

  getPoster(movie_title: string) : Observable<object> {
    return this.http.get(
      this.baseUrl + movie_title + "&callback=?",
      this.httpOptions
    )
  }
}
