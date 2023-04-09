import { Component, Input } from '@angular/core';
import { Game } from '../../models/game.model';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent {
	@Input() game?: Game;
	constructor() {}
}
