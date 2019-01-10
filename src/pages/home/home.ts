import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { NgForm } from "@angular/forms";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  users = [];
  user: any;
  data: Observable<any>;
  
  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.getData();
  }

  getData() {
    var url = 'https://jsonplaceholder.typicode.com/users';
    this.data = this.http.get(url);
    this.data.subscribe (
      data => {
        // console.log('My Data: ', data);
        this.users = data;
        this.user = this.users[0]; 
      }
    )
  }

  submitBlogPost(ngForm: NgForm){
    console.log("Submit Blog Post");
    console.log(ngForm);
    var url = 'https://jsonplaceholder.typicode.com/posts';

    const data: BlogPost = {
      id: null,
      userId: ngForm.form.value.userId,
      title: ngForm.form.value.title,
      body: ngForm.form.value.message
    }
    this.postBlog(url, data);
  }

  postBlog(url: string, data: BlogPost){
    this.http.post(url, data)
    .retry(3)
    .toPromise()
    .then(response => {
      console.log('Post Success!');
      console.log('API Response : ', response);
      return 200;
    })
    .catch(error => {
      console.log(error);
      return error.status;
    });
  }
}

export interface BlogPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}