import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private auth: AuthService, private router: Router) {}
  user: any = null;

  ngOnInit() {
    this.auth.authSubject.subscribe((auth) => {
      console.log('auth-state', auth);
      this.user = auth.user;
    });
  }

  handleLogOut() {
    this.auth.logout();
    // this.router.navigate("/");
  }
}
