import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = ' http://localhost:8080';
  constructor(private http: HttpClient) {}

  recipeSubject = new BehaviorSubject<any>({
    recipes: [],
    loading: false,
    newRecipe: null,
  });

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
  }

  getRecipes(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/api/recipe`, { headers }).pipe(
      tap((recipes) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({ ...currentState, recipes });
      })
    );
  }

  // createRecipes(recipe: any): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http
  //     .post(`${this.baseUrl}/api/recipe`, recipe, { headers })
  //     .pipe(
  //       tap((newRecipe) => {
  //         const currentState = this.recipeSubject.value;
  //         this.recipeSubject.next({
  //           ...currentState,
  //           recipes: [newRecipe, ...currentState.recipes],
  //         });
  //       })
  //     );
  // }
  createRecipes(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/api/recipe`, recipe, { headers }).pipe(
      tap((newRecipe) => {
        const currentState = this.recipeSubject.value;
        this.recipeSubject.next({
          ...currentState,
          recipes: [newRecipe, ...currentState.recipes],
        });
      })
    );
  }

  

  // updateRecipes(recipe: any): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http
  //     .put(`${this.baseUrl}/api/recipe/${recipe.id}`, recipe, { headers })
  //     .pipe(
  //       tap((updatedRecipe: any) => {
  //         const currentState = this.recipeSubject.value;
  //         const updatedRecipe = currentState.recipes.map((item: any) =>
  //           item.id === this.updateRecipe.id ? updatedRecipe : item
  //         );
  //         this.recipeSubject.next({
  //           ...currentState,
  //           recipes: updatedRecipes,
  //         });
  //       })
  //     );
  // }

  updateRecipes(recipe: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .put(`${this.baseUrl}/api/recipe/${recipe.id}`, recipe, { headers })
      .pipe(
        tap((updatedRecipeData: any) => {
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.recipes.map((item: any) =>
            item.id === updatedRecipeData.id ? updatedRecipeData : item
          );
          this.recipeSubject.next({
            ...currentState,
            recipes: updatedRecipes,
          });
        })
      );
  }

  // likeRecipes(id: any): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http
  //     .put(`${this.baseUrl}/api/recipe/${id}`, { headers })
  //     .pipe(
  //       tap((updatedRecipe: any) => {
  //         const currentState = this.recipeSubject.value;
  //         const updatedRecipe = currentState.recipes.map((item: any) =>
  //           item.id === this.updateRecipe.id ? updatedRecipe : item
  //         );
  //         this.recipeSubject.next({
  //           ...currentState,
  //           recipes: updatedRecipes,
  //         });
  //       })
  //     );
  // }

  // delteRecipes(id: any): Observable<any> {
  //   const headers = this.getHeaders();
  //   return this.http
  //     .delete(`${this.baseUrl}/api/recipe/${id}`, { headers })
  //     .pipe(
  //       tap((deletedRecipe: any) => {
  //         const currentState = this.recipeSubject.value;
  //         const deletedRecipe = currentState.recipes.filter(
  //           (item: any) => item.id !== id
  //         );
  //         this.recipeSubject.next({
  //           ...currentState,
  //           recipes: updatedRecipes,
  //         });
  //       })
  //     );
  // }

  likeRecipes(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.baseUrl}/api/recipe/${id}/like`, { headers }).pipe(
      tap((updatedRecipe: any) => {
        const currentState = this.recipeSubject.value;
        const updatedRecipes = currentState.recipes.map((item: any) =>
          item.id === updatedRecipe.id ? updatedRecipe : item
        );
        this.recipeSubject.next({
          ...currentState,
          recipes: updatedRecipes,
        });
      })
    );
  }

  deleteRecipes(id: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.baseUrl}/api/recipe/${id}`, { headers })
      .pipe(
        tap(() => {
          const currentState = this.recipeSubject.value;
          const updatedRecipes = currentState.recipes.filter(
            (item: any) => item.id !== id
          );
          this.recipeSubject.next({
            ...currentState,
            recipes: updatedRecipes,
          });
        })
      );
  }




  
}
