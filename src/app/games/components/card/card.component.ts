import { Component, Input } from '@angular/core';
import { Game } from '../../models/game.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent {
	@Input() game?: Game;
	// eslint-disable-next-line no-unused-vars
	constructor(private router: Router) {}

	public goToGameDetails(slug: string): void {
		this.router.navigate(['/games/detail', slug]);
	}
}
