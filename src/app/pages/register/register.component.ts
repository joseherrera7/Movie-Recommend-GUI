import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  Name = new FormControl('', [Validators.required]);
  Email = new FormControl('', [Validators.required]);
  Pass = new FormControl('', [Validators.required]);
  Error = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async onSubmit() {
    if (this.Name.errors || this.Email.errors || this.Pass.errors) {
      this.Error = true;
    } else {
      this.Error = false;

      const response = await axios.post(
        "https://9v7tw9x26a.execute-api.us-east-1.amazonaws.com/dev/register",
        {
          name: this.Name.value,
          email: this.Email.value,
          password: this.Pass.value
        }
      )
      
      if (response.data == "User created") {
        localStorage.setItem("user_email", this.Email.value)
        localStorage.setItem("name", this.Name.value)
        localStorage.setItem("recomendations", null)
        this.router.navigate(['dashboard']);
      }

    }
  }
}
