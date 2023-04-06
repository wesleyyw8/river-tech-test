/* eslint-disable no-unused-vars */
// games.effects.ts
import { Injectable } from '@angular/core';
import { Actions, Store, ofActionDispatched } from '@ngxs/store';
import {
	LoadGames,
	ShowLoader,
	HideLoader,
	LoadGamesSuccess
} from './games.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GameMockClient } from 'src/app/shared';
import { throwError } from 'rxjs';

@Injectable()
export class GamesEffects {
	constructor(
		private actions$: Actions,
		private gameService: GameMockClient,
		private store: Store
	) {
		this.actions$
			.pipe(
				ofActionDispatched(LoadGames),
				switchMap(() => {
					this.store.dispatch(new ShowLoader());
					return this.gameService.getAll$().pipe(
						map((games) => this.store.dispatch(new LoadGamesSuccess(games))),
						catchError((error) => throwError(`Error loading games: ${error}`))
					);
				})
			)
			.subscribe({
				complete: () => this.store.dispatch(new HideLoader())
			});
	}
}
