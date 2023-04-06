import { createSelector } from '@ngxs/store';
import { GamesState, GamesStateModel } from './games.state';

export class GamesSelectors {
	static getGames(state: GamesStateModel) {
		return state.games;
	}
}

export const selectGames = createSelector(
	[GamesState],
	(state: GamesStateModel) => GamesSelectors.getGames(state)
);
