import { createSelector } from '@ngxs/store';
import { GamesState, GamesStateModel } from './games.state';
import { GameInterface } from '../models/game.interface';
import { GameTags } from '../models/enums';

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
			(game: GameInterface) => game.tag === GameTags.TRENDING
		)
);

export const selectDistinctProviders = createSelector(
	[GamesState],
	(state: GamesStateModel) => {
		const distinctProviders = Array.from(
			new Set(
				GamesSelectors.getGames(state).map(
					(game: GameInterface) => game.providerName
				)
			)
		);
		return distinctProviders;
	}
);

export const selectGameBySlug = createSelector(
	[selectGames],
	(games: GameInterface[], slug: string) => {
		return games.find((game) => game.slug === slug);
	}
);
