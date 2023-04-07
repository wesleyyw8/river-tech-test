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
import { delay, first, take, takeUntil } from 'rxjs/operators';
import { LoadGames } from '../state/games.actions';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

	searchField: FormControl = new FormControl();

	constructor(
		private changeDetector: ChangeDetectorRef,
		private store: Store,
		private router: Router,
		private activatedRoute: ActivatedRoute
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

		this.searchField.valueChanges
			.pipe(takeUntil(this.ngUnsubscribe), delay(500))
			.subscribe((value: string) => {
				this.router.navigate([], {
					relativeTo: this.activatedRoute,
					queryParams: {
						searchTerm: value
					},
					queryParamsHandling: 'merge'
				});
			});

		this.activatedRoute.queryParams
			// .pipe(takeUntil(this.ngUnsubscribe), first())
			.pipe(take(1))
			.subscribe((params) => {
				const searchTerm = params['searchTerm'];
				if (searchTerm) {
					this.searchField.setValue(searchTerm);
				}
			});
	}
}
