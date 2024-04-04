import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './pages/footer/footer.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthComponent } from './pages/auth/auth.component';
import { CreateRecipeFormComponent } from './pages/create-recipe-form/create-recipe-form.component';
import { UpdateRecipeFormComponent } from './pages/update-recipe-form/update-recipe-form.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HomePageComponent,
    AuthComponent,
    CreateRecipeFormComponent,
    UpdateRecipeFormComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private auth: AuthService) {}
  user: any = null;
  title = 'sharing-my-recipe';

  ngOnInit() {
    console.log('ngOnInit');
    this.auth.getUserProfile().subscribe({
      next: (data) => console.log('req user', data),
      error: (error) => console.log('error', error),
    });
    this.auth.authSubject.subscribe((auth) => {
      console.log('auth-state', auth);
      this.user = auth.user;
    });
  }
}
