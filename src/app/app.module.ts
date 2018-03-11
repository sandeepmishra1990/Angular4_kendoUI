import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GridModule } from '@progress/kendo-angular-grid';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from './northwind.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,BrowserAnimationsModule, GridModule,HttpClientModule,FormsModule
  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
