import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  snackbarConfig = {
    duration: 3000
  };

  constructor(
    private snackbar: MatSnackBar
  ) { }

  successSnackbar(message: string): void {
    this.snackbar.open(message, '', {
      duration: this.snackbarConfig.duration,
      panelClass: 'success'
    });
  }

  errorSnackbar(message: string): void {
    this.snackbar.open(message, '', {
      duration: this.snackbarConfig.duration,
      panelClass: 'error'
    });
  }

}
