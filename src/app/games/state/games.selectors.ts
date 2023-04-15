import { createSelector } from '@ngxs/store';
import { GamesState, GamesStateModel } from './games.state';
import { GameInterface } from '../models/game.interface';
import { GameTags } from '../models/enums';

export class GamesSelectors {
	static getGames(state: GamesStateModel) {
		return state.games;
	}
	static getLastPlayedGames(state: GamesStateModel) {
		return state.lastPlayedGames;
	}
	static getIsLoading(state: GamesStateModel) {
		return state.isLoading;
	}
}

export const selectLastPlayedGames = createSelector(
	[GamesState],
	(state: GamesStateModel) => GamesSelectors.getLastPlayedGames(state)
);

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
		if (!games) {
			return null;
		}
		return games.find((game) => game.slug === slug);
	}
);

export const selectLastedGames = createSelector(
	[selectLastPlayedGames],
	(lastPlayedGames: string[]) => {
		return lastPlayedGames.reverse();
	}
);

export const selectIsLoading = createSelector(
	[GamesState],
	(state: GamesStateModel) => GamesSelectors.getIsLoading(state)
);
