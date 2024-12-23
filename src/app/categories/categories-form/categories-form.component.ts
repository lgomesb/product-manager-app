import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoriesService } from 'src/app/categories.service';
import { Observable, observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { StandardError } from 'src/app/standard-error';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {
  
  category: Category = new Category();
  success: boolean = false;
  errors!: String[];
  
  constructor( 
    private service: CategoriesService, 
    private router: Router, 
    private activateRoute: ActivatedRoute ) {    
  }

  ngOnInit(): void {
    let categoryId = this.lookupRouteParameter();

    if(categoryId) {
      this.service
      .getCategoryById(categoryId)
      .subscribe({
        next: (c) => this.category = c,
        error: (e) => {this.success = false; this.handleError(e)},
        complete: () => {this.success = false; this.errors = []}
      });
    }
    // .subscribe((c) => this.category = c, 
        //  errorResponse => {this.success = false; this.errors = errorResponse.error.errors} );

  }

  lookupRouteParameter() : string {
    let params: Observable<Params> = this.activateRoute.params;
    let result!: string;

    params.subscribe(urlParams => {
      result = urlParams['id']; 
    });

    return result;
  }

  onSubmit(): void {
    let categoryId = this.lookupRouteParameter();

    if(categoryId) { // Is it new or edit
      this.service.update(categoryId, this.category)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => {this.success = false; this.handleError(e)},
        complete: () => {this.success = true; this.errors = []} 
      } );
    } else {
      this.service.salve(this.category)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => {this.success = false; this.handleError(e)},
        complete: () => {this.success = true; this.errors = []} 
      } );
    }
    
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
            console.error('An error occurred:', error.error);
    } else {
      let standardError: StandardError = error.error;
      this.errors = [standardError.message];
      console.error(`Backend returned code ${error.status}, body was: `, standardError);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  rollbackCategoriesList(): void {
    this.router.navigate(['/categories-list'])
  }


}
