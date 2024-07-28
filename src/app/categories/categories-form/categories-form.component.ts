import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoriesService } from 'src/app/categories.service';
import { observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { StandardError } from 'src/app/StandardError';
import { Router } from '@angular/router';


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
    private router: Router ) {    
  }

  ngOnInit(): void {      
    // this.service
    // .getCategoryById("26dd8bcc-aaba-486d-827a-8ce5933432c0")
    // .subscribe((c) => this.category = c );
  }

  onSubmit(): void {
    this.service.salve(this.category)
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => {this.success = false; this.handleError(e)},
      complete: () => {this.success = true; this.errors = []} 
    } );    
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
