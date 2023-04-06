/* eslint-disable no-unused-vars */
export class AddGame {
	static readonly type = '[Games] Add';
	constructor(public payload: string) {}
}

export class RemoveGame {
	static readonly type = '[Games] Remove';
	constructor(public payload: string) {}
}
