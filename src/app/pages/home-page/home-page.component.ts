import { Component } from '@angular/core';
import { RecipeCardComponent } from '../recipe-card/recipe-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecipeFormComponent } from '../create-recipe-form/create-recipe-form.component';
import { AuthService } from '../../services/auth/auth.service';
import { RecipeService } from '../../services/recipe/recipe.service';
import { state } from '@angular/animations';
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RecipeCardComponent, MatIconModule, MatButtonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  constructor(
    public dialog: MatDialog,
    public auth: AuthService,
    private recipeService: RecipeService
  ) {}
  recipes = [];

  handleOPenCreatedRecipeForm() {
    this.dialog.open(CreateRecipeFormComponent);
  }

  ngOnInit() {
    this.auth.getUserProfile();
    this.recipeService.getRecipes().subscribe();
    this.recipeService.recipeSubject.subscribe((state) => {
      console.log("state", state);
      this.recipes = state.recipes;
    });
  }
}
