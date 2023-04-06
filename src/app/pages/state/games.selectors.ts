import { createSelector } from '@ngxs/store';
import { GamesState, GamesStateModel } from './games.state';
import { Game } from 'src/app/shared';
import { GameTags } from './../../shared/index';

export class GamesSelectors {
	static getGames(state: GamesStateModel) {
		return state.games;
	}
}

export const selectGames = createSelector(
	[GamesState],
	(state: GamesStateModel) => GamesSelectors.getGames(state)
);

export const selectTrendingGames = createSelector(
	[GamesState],
	(state: GamesStateModel) =>
		GamesSelectors.getGames(state).filter(
			(game: Game) => game.tag === GameTags.TRENDING
		)
);
