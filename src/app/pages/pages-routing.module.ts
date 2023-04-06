import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';

const ROUTES: Routes = [
	{ path: '', component: HomeComponent, pathMatch: 'full' },
	{
		path: 'games',
		component: GamesComponent
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
export class AppPagesRoutingModule {}
