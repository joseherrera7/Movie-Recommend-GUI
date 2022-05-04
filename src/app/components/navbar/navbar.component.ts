import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import axios from 'axios';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public Name: string;
  public requiredFileType = "text/csv"

  uploadForm: FormGroup; 
  Success = false;
  Error = false;

  constructor(location: Location,  private element: ElementRef, private router: Router, private formBuilder: FormBuilder) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.Name = localStorage.getItem("name")

    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  logOut() {
    localStorage.clear()
    this.router.navigate(['login']);
  }

  async uploadFile(event) {
    let file = event.target.files[0]
    
    console.log(file)
    const response = await axios.post(
      "https://9v7tw9x26a.execute-api.us-east-1.amazonaws.com/dev/upload-file"
    )
    
    if (response.data.body) {
      const presignedLink = response.data.body

      let blobData = new Blob([file], {type: 'text/csv'})

      const result = await axios.put(presignedLink,
        blobData,
      )

      if (result) {
        this.Success = true
        this.Error = false
      } else {
        this.Error = true
        this.Success = false
      }
    }
    
  }

}
