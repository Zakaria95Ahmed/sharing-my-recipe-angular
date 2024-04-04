import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { UpdateRecipeFormComponent } from '../update-recipe-form/update-recipe-form.component';
import { RecipeService } from '../../services/recipe/recipe.service';
@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input() recipe: any;
  @Input() toggle: any;
  constructor(public dialog: MatDialog, private recipeService: RecipeService) {}

  handleEditRecipeForm() {
    this.dialog.open(UpdateRecipeFormComponent, { data: this.recipe });
  }

  handleDeleteRecipe() {
    this.recipeService.deleteRecipes(this.recipe.id).subscribe();
  }

  ngOnit() {
    console.log('toggle', this.toggle);
  }
}
