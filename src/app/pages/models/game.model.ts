import { GameInterface } from './game.interface';

export class Game implements GameInterface {
	id: string;
	tag: string;
	slug: string;
	title: string;
	providerName: string;
	startUrl: string;
	thumb: { url: string; title: string };

	// eslint-disable-next-line no-unused-vars
	constructor(game: GameInterface) {
		this.id = game.id;
		this.title = game.title;
		this.tag = game.tag;
		this.slug = game.slug;
		this.providerName = game.providerName;
		this.startUrl = game.startUrl;
		this.thumb = game.thumb;
	}

	isHot(): boolean {
		return this.tag === 'hot';
	}
}
