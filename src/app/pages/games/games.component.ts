/* eslint-disable no-unused-vars */
import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { Game } from 'src/app/shared';
import { selectGames } from '../state/games.selectors';
import { takeUntil } from 'rxjs/operators';
import { LoadGames } from '../state/games.actions';

const NAME_KEBAB = 'app-games';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: { class: NAME_KEBAB },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GamesComponent implements OnDestroy, OnInit {
	private ngUnsubscribe = new Subject<void>();
	public gamesData: Game[] = [];

	@Select(selectGames) games$!: Observable<Game[]>;

	constructor(
		private changeDetector: ChangeDetectorRef,
		private store: Store
	) {}

	ngOnDestroy(): void {
		this.ngUnsubscribe.complete();
	}

	ngOnInit(): void {
		this.store.dispatch(new LoadGames());

		this.games$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((games) => {
			this.gamesData = games;
			this.changeDetector.markForCheck();
		});
	}
}
