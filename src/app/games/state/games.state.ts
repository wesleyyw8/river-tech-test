import { State, Action, StateContext } from '@ngxs/store';
import {
	LoadGamesSuccess,
	AddLastPlayed,
	ShowLoader,
	HideLoader
} from './games.actions';
import { GameInterface } from '../models/game.interface';

export interface GamesStateModel {
	games: GameInterface[];
	isLoading: boolean;
	lastPlayedGames: string[];
}

const initialState: GamesStateModel = {
	games: [],
	isLoading: false,
	// eslint-disable-next-line no-undef
	lastPlayedGames: JSON.parse(localStorage.getItem('lastPlayedGames') || '[]')
};

@State<GamesStateModel>({
	name: 'gamesState',
	defaults: initialState
})
export class GamesState {
	@Action(LoadGamesSuccess)
	loadGamesSuccess(
		ctx: StateContext<GamesStateModel>,
		action: LoadGamesSuccess
	) {
		const state = ctx.getState();
		// console.log('here ', action.payload)
		ctx.setState({
			...state,
			games: [...action.payload]
		});
	}

	@Action(AddLastPlayed)
	addLastPlayedGame(ctx: StateContext<GamesStateModel>, action: AddLastPlayed) {
		const state = ctx.getState();
		const lastPlayedGames = [...state.lastPlayedGames];
		const index = lastPlayedGames.indexOf(action.payload);
		if (index !== -1) {
			lastPlayedGames.splice(index, 1);
		}

		ctx.setState({
			...state,
			lastPlayedGames: [...lastPlayedGames, action.payload]
		});

		// eslint-disable-next-line no-undef
		localStorage.setItem(
			'lastPlayedGames',
			JSON.stringify([...lastPlayedGames, action.payload].reverse())
		);
	}

	@Action(ShowLoader)
	showLoader(ctx: StateContext<GamesStateModel>) {
		const state = ctx.getState();
		ctx.setState({
			...state,
			isLoading: true
		});
	}

	@Action(HideLoader)
	hideLoader(ctx: StateContext<GamesStateModel>) {
		const state = ctx.getState();
		ctx.setState({
			...state,
			isLoading: false
		});
	}
}
