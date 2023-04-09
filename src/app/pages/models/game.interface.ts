export interface GameInterface {
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
