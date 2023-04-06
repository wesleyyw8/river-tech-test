/* eslint-disable no-unused-vars */
import { Game } from 'src/app/shared';

const entity = '[Games]';

export class LoadGames {
	static readonly type = `${entity} Load`;
	constructor() {}
}

export class LoadGamesSuccess {
	static readonly type = `${entity} Load Success`;
	constructor(public payload: Game[]) {}
}

export class ShowLoader {
	static readonly type = `${entity} Show Loader`;
	constructor() {}
}

export class HideLoader {
	static readonly type = `${entity} Hide Loader`;
	constructor() {}
}
