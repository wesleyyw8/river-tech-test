// games.state.ts
import { State, Action, StateContext } from '@ngxs/store';
import { AddGame, RemoveGame } from './game.actions';
import { Game } from 'src/app/shared';

export interface GamesStateModel {
	games: Game[];
}

const initialState: GamesStateModel = {
	games: []
};

@State<GamesStateModel>({
	name: 'games',
	defaults: initialState
})
export class GamesState {
	@Action(AddGame)
	addGame(ctx: StateContext<GamesStateModel>, action: AddGame) {
		const state = ctx.getState();
		ctx.setState({
			games: [...state.games, action.payload]
		});
	}

	@Action(RemoveGame)
	removeGame(ctx: StateContext<GamesStateModel>, action: RemoveGame) {
		const state = ctx.getState();
		ctx.setState({
			games: state.games.filter((game: Game) => game.id !== action.payload)
		});
	}
}
