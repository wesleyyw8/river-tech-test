export interface Game {
	id: number;
	slug: string;
	title: string;
	tag: string;
	providerName: string;
	startUrl: string;
	thumb: {
		url: string;
		title: string;
	};
}
