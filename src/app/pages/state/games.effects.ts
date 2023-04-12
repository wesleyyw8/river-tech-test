import { Injectable } from '@angular/core';
import { Actions, Store, ofActionDispatched } from '@ngxs/store';
import {
	LoadGames,
	ShowLoader,
	HideLoader,
	LoadGamesSuccess
} from './games.actions';
import { catchError, map, switchMap } from 'rxjs/operators';

import { throwError } from 'rxjs';
import { GameMockClient } from '../service/game-mock.client';

@Injectable()
export class GamesEffects {
	constructor(
		// eslint-disable-next-line no-unused-vars
		private actions$: Actions,
		// eslint-disable-next-line no-unused-vars
		private gameService: GameMockClient,
		// eslint-disable-next-line no-unused-vars
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
				next: () => {
					this.store.dispatch(new HideLoader());
				}
			});
	}
}
