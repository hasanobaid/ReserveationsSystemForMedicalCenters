import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-reception-menu',
  templateUrl: './reception-menu.component.html',
  styleUrls: ['./reception-menu.component.css']
})
export class ReceptionMenuComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
