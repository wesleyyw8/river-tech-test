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

import { selectTrendingGames } from './../state/games.selectors';
import { GameMockClient, Game } from '../../shared';
import { LoadGames } from '../state/games.actions';

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

	@Select(selectTrendingGames) games$!: Observable<Game[]>;

	constructor(
		private gameMockClient: GameMockClient,
		private changeDetector: ChangeDetectorRef,
		private store: Store
	) {}
	ngOnInit(): void {
		this.store.dispatch(new LoadGames());

		this.games$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((games) => {
			this.gamesData = games;
			this.changeDetector.markForCheck();
		});
	}
	ngOnDestroy(): void {
		this.ngUnsubscribe.complete();
	}
}
