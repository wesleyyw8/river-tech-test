import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { GamesComponent } from './containers/games/games.component';
import { GameDetailComponent } from './containers/game-detail/game-detail.component';

const ROUTES: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{
		path: 'games',
		component: GamesComponent
	},
	{
		path: 'games/detail/:slug',
		component: GameDetailComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(ROUTES, {
			// enableTracing: true
		})
	],
	exports: [RouterModule]
})
export class AppGamesRoutingModule {}
