import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './containers/home/home.component';
import { AppPagesRoutingModule } from './pages-routing.module';
import { NgxsModule } from '@ngxs/store';
import { GamesState } from './state/games.state';
import { NgxsEffectsModule } from 'ngxs-effects';
import { GamesEffects } from './state/games.effects';
import { GamesComponent } from './containers/games/games.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameDetailComponent } from './containers/game-detail/game-detail.component';
import { LastPlayedComponent } from './containers/last-played/last-played.component';
import { GameMockClient } from './services/game-mock.client';

const COMPONENTS = [
	HomeComponent,
	GamesComponent,
	CardComponent,
	LastPlayedComponent
];

@NgModule({
	imports: [
		CommonModule,
		AppPagesRoutingModule,
		NgxsModule.forFeature([GamesState]),
		NgxsEffectsModule.forFeature(GamesEffects),
		ReactiveFormsModule,
		FormsModule
	],
	declarations: [...COMPONENTS, GameDetailComponent, LastPlayedComponent],
	exports: [...COMPONENTS],
	providers: [GameMockClient]
})
export class AppPagesModule {}
