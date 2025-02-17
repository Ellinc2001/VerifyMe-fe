import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// ReactiveForms
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // 🔥 Importa HttpClientModule

// NgCharts
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, IonicModule.forRoot({ mode: 'ios' }), ReactiveFormsModule, AppRoutingModule, NgChartsModule, HttpClientModule],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent]
})
export class AppModule { }
