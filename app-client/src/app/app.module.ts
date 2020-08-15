import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogEditProductComponent } from './dialog-edit-product/dialog-edit-product.component';

@NgModule({
    declarations: [
        AppComponent,
        DialogEditProductComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatToolbarModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        MatDialogModule
    ],
    providers: [],
    entryComponents: [
        DialogEditProductComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
