import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const userRole = this.authService.getUserType();
    console.log('type: ' + this.authService.getUserType());
    console.log('ID: ' + this.authService.getUserId());
    if (userRole === next.data.role) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
