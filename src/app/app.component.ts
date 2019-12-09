import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'R S M C';

  private token = '';

  /*For mac*/
  private apiUrl = 'http://localhost:8080/api';

  /*For Windows*/
  // private apiUrl = 'http://localhost/api';





  getURL() {
    return this.apiUrl;
  }

  getToken() {
    return this.token;
  }
}
