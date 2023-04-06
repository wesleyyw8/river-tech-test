import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { AppPagesRoutingModule } from './pages-routing.module';
import { NgxsModule } from '@ngxs/store';
import { GamesState } from './state/games.state';
import { NgxsEffectsModule } from 'ngxs-effects';
import { GamesEffects } from './state/games.effects';

const COMPONENTS = [HomeComponent];

@NgModule({
	imports: [
		CommonModule,
		AppPagesRoutingModule,
		NgxsModule.forFeature([GamesState]),
		NgxsEffectsModule.forFeature(GamesEffects)
	],
	declarations: [...COMPONENTS],
	exports: [...COMPONENTS]
})
export class AppPagesModule {}
