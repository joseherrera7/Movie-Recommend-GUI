import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  Email = new FormControl('', [Validators.required]);
  Pass = new FormControl('', [Validators.required]);
  Error = false;
  NonAuth = false;

  constructor(private router: Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  async onSubmit() {
    if (this.Email.errors || this.Pass.errors) {
      this.Error = true;
    } else {
      this.Error = false;

      const response = await axios.post(
        "https://9v7tw9x26a.execute-api.us-east-1.amazonaws.com/dev/login",
        {
          email: this.Email.value,
          password: this.Pass.value
        }
      )
      
      if (response.data.length == 2) {
        localStorage.setItem("user_email", this.Email.value)
        localStorage.setItem("name", response.data[0])
        localStorage.setItem("recomendations", response.data[1])
        this.router.navigate(['dashboard']);
      }
      else {
        this.NonAuth = true;
      }

    }
  }

}
