import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectGameBySlug, selectIsLoading } from '../state/games.selectors';
import { Observable, Subject } from 'rxjs';
import { Game } from '../models/game.model';
import { Select, Store } from '@ngxs/store';
import { LoadGames, AddLastPlayed } from '../state/games.actions';
import { takeUntil } from 'rxjs/operators';
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
	public isLoading: boolean = false;

	@Select(selectIsLoading) isLoading$!: Observable<boolean>;

	constructor(
		// eslint-disable-next-line no-unused-vars
		private store: Store, // eslint-disable-next-line no-unused-vars
		private changeDetector: ChangeDetectorRef,
		// eslint-disable-next-line no-unused-vars
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.store.dispatch(new LoadGames());

		const slug = this.activatedRoute.snapshot.params['slug'];

		this.store
			.select((state) => selectGameBySlug(state.gamesState.games, slug))
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((game: GameInterface | null | undefined) => {
				if (game) {
					this.game = new Game(game);
					this.store.dispatch(new AddLastPlayed(this.game.title));
					this.changeDetector.markForCheck();
				}
			});

		this.isLoading$
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((isLoading: boolean) => {
				this.isLoading = isLoading;
				this.changeDetector.markForCheck();
			});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
