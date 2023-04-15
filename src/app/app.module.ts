import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppGamesModule } from './games/games.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsEffectsModule } from 'ngxs-effects';

@NgModule({
	declarations: [AppComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule,
		BrowserModule,
		AppGamesModule,
		NgxsModule.forRoot(),
		NgxsEffectsModule.forRoot(),
		NgxsReduxDevtoolsPluginModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
