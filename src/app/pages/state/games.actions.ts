/* eslint-disable no-unused-vars */

import { GameInterface } from '../models/game.interface';

const entity = '[Games]';

export class LoadGames {
	static readonly type = `${entity} Load`;
	constructor() {}
}

export class LoadGamesSuccess {
	static readonly type = `${entity} Load Success`;
	constructor(public payload: GameInterface[]) {}
}

export class ShowLoader {
	static readonly type = `${entity} Show Loader`;
	constructor() {}
}

export class HideLoader {
	static readonly type = `${entity} Hide Loader`;
	constructor() {}
}

export class AddLastPlayed {
	static readonly type = `${entity} Add Last Played`;
	constructor(public payload: GameInterface['slug']) {}
}
