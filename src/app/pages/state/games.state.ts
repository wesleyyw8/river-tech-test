import { State, Action, StateContext } from '@ngxs/store';
import { LoadGamesSuccess } from './games.actions';
import { GameInterface } from '../models/game.interface';

export interface GamesStateModel {
	games: GameInterface[];
	isLoading: boolean;
}

const initialState: GamesStateModel = {
	games: [],
	isLoading: false
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
		ctx.setState({
			...state,
			games: [...action.payload]
		});
	}
}
