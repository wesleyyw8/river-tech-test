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

export const selectDistinctProviders = createSelector(
	[GamesState],
	(state: GamesStateModel) => {
		const distinctProviders = Array.from(
			new Set(
				GamesSelectors.getGames(state).map((game: Game) => game.providerName)
			)
		);
		return distinctProviders;
	}
);
