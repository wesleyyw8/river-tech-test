import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AppPagesRoutingModule } from './pages-routing.module';
import { NgxsModule } from '@ngxs/store';
import { GamesState } from './state/games.state';
import { NgxsEffectsModule } from 'ngxs-effects';
import { GamesEffects } from './state/games.effects';
import { GamesComponent } from './games/games.component';
import { CardComponent } from './components/card/card.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameDetailComponent } from './game-detail/game-detail.component';

const COMPONENTS = [HomeComponent, GamesComponent, CardComponent];

@NgModule({
	imports: [
		CommonModule,
		AppPagesRoutingModule,
		NgxsModule.forFeature([GamesState]),
		NgxsEffectsModule.forFeature(GamesEffects),
		ReactiveFormsModule,
		FormsModule
	],
	declarations: [...COMPONENTS, GameDetailComponent],
	exports: [...COMPONENTS]
})
export class AppPagesModule {}
