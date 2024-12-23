import { HttpErrorResponse } from "@angular/common/http";
import { StandardError } from "../standard-error";

export class ErrorUtils {

    public static handleError(error: HttpErrorResponse, customMessage: string) : String[] {
        if (error.status === 0) {
            console.error('An error occurred:', error.message);
            return [customMessage];
        } else {
          let standardError: StandardError = error.error;
          console.error(`Backend returned code ${error.status}, body was: `, standardError);
          return [standardError.message];
        }        
      }
    
}