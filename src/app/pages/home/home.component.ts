/* eslint-disable no-unused-vars */
import {
	Component,
	ChangeDetectionStrategy,
	OnDestroy,
	OnInit
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';

import {
	selectGames,
	selectIsLoading,
	selectTrendingGames
} from './../state/games.selectors';

import { LoadGames } from '../state/games.actions';
import { GameInterface } from '../models/game.interface';
import { Game } from '../models/game.model';

const NAME_KEBAB = 'app-home';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.scss'],
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: { class: NAME_KEBAB },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnDestroy, OnInit {
	private ngUnsubscribe = new Subject<void>();
	public gamesData: Game[] = [];
	public isLoading: boolean = false;

	@Select(selectTrendingGames) games$!: Observable<GameInterface[]>;
	@Select(selectIsLoading) isLoading$!: Observable<boolean>;

	constructor(
		private changeDetector: ChangeDetectorRef,
		private store: Store
	) {}
	ngOnInit(): void {
		this.store.dispatch(new LoadGames());

		this.games$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((games) => {
			this.gamesData = [];
			games.forEach((game: GameInterface) => {
				this.gamesData.push(new Game(game));
			});
			this.changeDetector.markForCheck();
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
