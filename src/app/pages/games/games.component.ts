/* eslint-disable no-unused-vars */
import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChildren
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, fromEvent, merge } from 'rxjs';
import { Game } from 'src/app/shared';
import { selectDistinctProviders, selectGames } from '../state/games.selectors';
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
	private destroy$ = new Subject<void>();

	public gamesData: Game[] = [];
	public providerData: string[] = [];

	@Select(selectGames) games$!: Observable<Game[]>;
	@Select(selectDistinctProviders) distinctProviders$!: Observable<string[]>;

	public searchField: FormControl = new FormControl();

	public checkedProviders: string[] = [];
	public checkboxChangeSubject = new Subject<string[]>();
	public checkboxChange$ = this.checkboxChangeSubject.asObservable();

	constructor(
		private changeDetector: ChangeDetectorRef,
		private store: Store,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}

	onCheckboxChange(event: Event, provider: string): void {
		const checkbox = event.target as HTMLInputElement;
		if (checkbox.checked) {
			this.checkedProviders.push(provider);
		} else {
			this.checkedProviders = this.checkedProviders.filter(
				(p) => p !== provider
			);
		}
		this.checkboxChangeSubject.next(this.checkedProviders);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	ngOnInit(): void {
		this.store.dispatch(new LoadGames());

		this.games$.pipe(takeUntil(this.destroy$)).subscribe((games) => {
			this.gamesData = games;
			this.changeDetector.markForCheck();
		});

		this.games$.pipe(takeUntil(this.destroy$)).subscribe((games) => {
			this.gamesData = games;
			this.changeDetector.markForCheck();
		});

		this.distinctProviders$
			.pipe(takeUntil(this.destroy$))
			.subscribe((providers: string[]) => {
				this.providerData = providers;
			});

		this.searchField.valueChanges
			.pipe(takeUntil(this.destroy$), delay(500))
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
			.pipe(take(1)) //it will complete the subscription so no need to unsubscribe.
			.subscribe((params) => {
				const searchTerm = params['searchTerm'];
				if (searchTerm) {
					this.searchField.setValue(searchTerm);
				}
			});

		this.checkboxChange$
			.pipe(takeUntil(this.destroy$))
			.subscribe((checkedProviders) => {
				this.router.navigate([], {
					relativeTo: this.activatedRoute,
					queryParams: {
						provider: checkedProviders.join(',')
					},
					queryParamsHandling: 'merge'
				});
			});
	}
}
