import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe/recipe.service';

@Component({
  selector: 'app-create-recipe-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './create-recipe-form.component.html',
  styleUrl: './create-recipe-form.component.scss',
})
export class CreateRecipeFormComponent {
  constructor(private recipeService: RecipeService) {}

  recipeItem: any = {
    title: '',
    description: '',
    foodType: '',
    image: '',
  };

  // onSubmit() {
  //   console.log('values', this.recipeItem);
  //   this.recipeService.createRecipes(this.recipeItem).subscribe({
  //     next: (data) => console.log('Created Recipe', data),
  //     error: (error) => console.log('error', error),
  //   });
  // }

  onSubmit() {
    console.log('values', this.recipeItem);
    this.recipeService.createRecipes(this.recipeItem).subscribe({
      next: (data) => {
        console.log('Created Recipe', data);
        // Clear form fields after successful creation
        this.recipeItem = {
          title: '',
          description: '',
          foodType: '',
          image: '',
        };
      },
      error: (error) => {
        console.log('error', error);
        // Handle error, display message to the user
      },
    });
  }
  





}
