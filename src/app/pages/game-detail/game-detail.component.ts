import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectGameBySlug, selectGames } from '../state/games.selectors';
import { Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { Store } from '@ngxs/store';
import { LoadGames } from '../state/games.actions';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { GameInterface } from '../models/game.interface';

@Component({
	selector: 'app-game-detail',
	templateUrl: './game-detail.component.html',
	styleUrls: ['./game-detail.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameDetailComponent implements OnInit, OnDestroy {
	private ngUnsubscribe = new Subject<void>();

	public game?: Game;

	constructor(
		// eslint-disable-next-line no-unused-vars
		private store: Store, // eslint-disable-next-line no-unused-vars
		private changeDetector: ChangeDetectorRef,
		// eslint-disable-next-line no-unused-vars
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.store.dispatch(new LoadGames());

		combineLatest([
			this.store.select(selectGames).pipe(
				filter((games) => {
					return games.length > 0;
				})
			),
			this.activatedRoute.params
		])
			.pipe(
				// eslint-disable-next-line no-unused-vars
				switchMap(([games, params]) => {
					const gameSlug = params['slug']; // The '+' sign is used to convert the string to a number.
					return this.store.select((state) =>
						selectGameBySlug(state.gamesState.games, gameSlug)
					);
				}),
				takeUntil(this.ngUnsubscribe)
			)
			.subscribe((game: GameInterface | undefined) => {
				// You can access the game with the specified id here.
				if (game) {
					this.game = new Game(game);
					this.changeDetector.markForCheck();
				}
			});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.complete();
	}
}
