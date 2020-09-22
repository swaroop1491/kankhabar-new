import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NgxLinkPreviewModule } from 'ngx-link-preview.module';
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, NgxLinkPreviewModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
