import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  
constructor(private authService: AuthService, private router: Router){}
  isRegister: boolean = false;

  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  // handleRegister() {
  //   console.log('register', this.registerForm.value);
  //   this.authService.register(this.registerForm.value).subscribe({
  //     next:(response)=>{
  //       localStorage.setItem("jwt",response.jwt);
  //       this.authService.getUserProfile().subscribe();
  //       console.log("registeration has been completed successfully.",response)
  //     }
  //   })
  // }

  // handleLogin(){
  //   console.log("login", this.loginForm.value)
  //   this.authService.login(this.loginForm.value).subscribe({
  //     next:(response)=>{
  //       localStorage.setItem("jwt",response.jwt);
  //       this.authService.getUserProfile().subscribe();
  //       console.log("login success",response)
  //     }
  //   })
  // }
  
  // handleRegister() {
  //   if (this.registerForm.valid) {
  //     const userData = this.registerForm.value;
  //     this.authService.register(userData).pipe(
  //       catchError((error) => {
  //         console.error('Registration failed:', error);
  //         // يمكنك عرض رسالة خطأ للمستخدم هنا
  //         return throwError(error);
  //       })
  //     ).subscribe(
  //       (response) => {
  //         console.log('Registration successful:', response);
  //         localStorage.setItem('jwt', response.jwt);
  //         this.authService.getUserProfile().subscribe(
  //           (user) => {
  //             console.log('User profile:', user);
  //             // يمكنك التنقل إلى صفحة أخرى بعد تسجيل الدخول بنجاح
  //             this.router.navigate(['/home']);
  //           },
  //           (error) => {
  //             console.error('Failed to get user profile:', error);
  //           }
  //         );
  //       }
  //     );
  //   }
  // }

  // handleLogin() {
  //   if (this.loginForm.valid) {
  //     const loginData = this.loginForm.value;
  //     this.authService.login(loginData).pipe(
  //       catchError((error) => {
  //         console.error('Login failed:', error);
  //         // يمكنك عرض رسالة خطأ للمستخدم هنا
  //         return throwError(error);
  //       })
  //     ).subscribe(
  //       (response) => {
  //         console.log('Login successful:', response);
  //         localStorage.setItem('jwt', response.jwt);
  //         this.authService.getUserProfile().subscribe(
  //           (user) => {
  //             console.log('User profile:', user);
  //             // يمكنك التنقل إلى صفحة أخرى بعد تسجيل الدخول بنجاح
  //             this.router.navigate(['/home']);
  //           },
  //           (error) => {
  //             console.error('Failed to get user profile:', error);
  //           }
  //         );
  //       }
  //     );
  //   }
  // }

  // handleRegister() {
  //   if (this.registerForm.valid) {
  //     const userData = this.registerForm.value;
  //     this.authService.register(userData).pipe(
  //       catchError((error) => {
  //         console.error('Registration failed:', error);
  //         return throwError(error);
  //       })
  //     ).subscribe({
  //       next: (response) => {
  //         console.log('Registration successful:', response);
  //         localStorage.setItem('jwt', response.jwt);
  //         this.authService.getUserProfile().subscribe({
  //           next: (user) => {
  //             console.log('User profile:', user);
  //             this.router.navigate(['/home']);
  //           },
  //           error: (error) => {
  //             console.error('Failed to get user profile:', error);
  //           }
  //         });
  //       },
  //       error: (error) => {
  //         console.error('Registration failed:', error);
  //         // Handle error, display message to the user
  //       }
  //     });
  //   }
  // }
  
  // handleLogin() {
  //   if (this.loginForm.valid) {
  //     const loginData = this.loginForm.value;
  //     this.authService.login(loginData).pipe(
  //       catchError((error) => {
  //         console.error('Login failed:', error);
  //         return throwError(error);
  //       })
  //     ).subscribe({
  //       next: (response) => {
  //         console.log('Login successful:', response);
  //         localStorage.setItem('jwt', response.jwt);
  //         this.authService.getUserProfile().subscribe({
  //           next: (user) => {
  //             console.log('User profile:', user);
  //             this.router.navigate(['/home']);
  //           },
  //           error: (error) => {
  //             console.error('Failed to get user profile:', error);
  //           }
  //         });
  //       },
  //       error: (error) => {
  //         console.error('Login failed:', error);
  //         // Handle error, display message to the user
  //       }
  //     });
  //   }
  // }
  
  handleRegister() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.authService.register(userData).pipe(
        catchError((error) => {
          console.error('Registration failed:', error);
          return throwError(() => new Error(error));
        })
      ).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          localStorage.setItem('jwt', response.jwt);
          this.authService.getUserProfile().subscribe({
            next: (user) => {
              console.log('User profile:', user);
              // Navigate to home page after successful registration
              this.router.navigate(['/home']);
              // Show success message to the user
              alert('Registration successful! Welcome to the application.');
            },
            error: (error) => {
              console.error('Failed to get user profile:', error);
              // Show error message to the user
              alert('Failed to retrieve user profile. Please try again later.');
            }
          });
        },
        error: (error) => {
          console.error('Registration failed:', error);
          // Show error message to the user
          alert('Registration failed. Please check your input and try again.');
        }
      });
    }
  }
  
  handleLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).pipe(
        catchError((error) => {
          console.error('Login failed:', error);
          return throwError(() => new Error(error));
        })
      ).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          localStorage.setItem('jwt', response.jwt);
          this.authService.getUserProfile().subscribe({
            next: (user) => {
              console.log('User profile:', user);
              // Navigate to home page after successful login
              this.router.navigate(['/home']);
              // Show success message to the user
              alert('Login successful! Welcome back.');
            },
            error: (error) => {
              console.error('Failed to get user profile:', error);
              // Show error message to the user
              alert('Failed to retrieve user profile. Please try again later.');
            }
          });
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Show error message to the user
          alert('Login failed. Please check your credentials and try again.');
        }
      });
    }
  }
  




  togglePanel() {
    this.isRegister = !this.isRegister;
  }

  
}
