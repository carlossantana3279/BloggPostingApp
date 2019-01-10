import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {

  posts: Observable<any>;
  data: Observable<any>;

  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  getPosts() {
    // this.posts = [
    //   'Amsterdam',
    //   'Bogota',
    //   'Hamilton'
    // ];
    var url = 'https://jsonplaceholder.typicode.com/posts';
    this.data = this.http.get(url)

    this.data.subscribe (
      data => {
        this.posts = data;
        console.log('My Data: ', this.posts);
      }
    )
  }

  getPostsByTitle(searchInput: string) {

    var url = 'https://jsonplaceholder.typicode.com/posts';
    const options = { params: new HttpParams().set('title',searchInput)};
    this.data = this.http.get(url, options)

    this.data.subscribe (
      data => {
        this.posts = data;
        console.log('My Data: ', this.posts);
      }
    )

    return this.data;
  }

  filterPosts(ev: any){
    // set val to the value of the searchbar
    const val = ev.target.value;
    console.log(val);

    return this.getPostsByTitle(val);
  }

}
