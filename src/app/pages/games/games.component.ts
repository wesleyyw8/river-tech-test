import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { selectDistinctProviders, selectGames } from '../state/games.selectors';
import { delay, take, takeUntil } from 'rxjs/operators';
import { LoadGames } from '../state/games.actions';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameInterface } from '../models/game.interface';
import { Game } from '../models/game.model';

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
	public games: Game[] = [];
	public providerData: string[] = [];

	@Select(selectGames) games$!: Observable<GameInterface[]>;
	@Select(selectDistinctProviders) distinctProviders$!: Observable<string[]>;

	public searchField: FormControl = new FormControl();

	public checkedProviders: string[] = [];
	public checkboxChangeSubject$ = new Subject<string[]>();

	constructor(
		// eslint-disable-next-line no-unused-vars
		private changeDetector: ChangeDetectorRef,
		// eslint-disable-next-line no-unused-vars
		private store: Store,
		// eslint-disable-next-line no-unused-vars
		private router: Router,
		// eslint-disable-next-line no-unused-vars
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
		this.checkboxChangeSubject$.next(this.checkedProviders);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	ngOnInit(): void {
		this.store.dispatch(new LoadGames());
		this.subscribeToDistinctProviders();
		this.subscribeToSearchField();
		this.subscribeToQueryParams();
		this.subscribeToCheckboxChange();
		this.subscribeToGames();
	}

	private subscribeToDistinctProviders(): void {
		this.distinctProviders$
			.pipe(takeUntil(this.destroy$))
			.subscribe((providers: string[]) => {
				this.providerData = providers;
			});
	}

	private subscribeToSearchField(): void {
		this.searchField.valueChanges
			.pipe(takeUntil(this.destroy$), delay(500))
			.subscribe((value: string) => {
				this.updateSearchTerm(value);
			});
	}

	private subscribeToQueryParams(): void {
		this.activatedRoute.queryParams.pipe(take(1)).subscribe((params) => {
			const searchTerm = params['searchTerm'];
			if (searchTerm) {
				this.searchField.setValue(searchTerm);
			}
			const providers = params['provider'];
			if (providers) {
				this.checkedProviders = providers.split(',');
			}
			this.filterGames(this.searchField.value, this.checkedProviders);
		});
	}

	private subscribeToCheckboxChange(): void {
		this.checkboxChangeSubject$
			.pipe(takeUntil(this.destroy$))
			.subscribe((checkedProviders) => {
				this.updateSelectedProviders(checkedProviders);
			});
	}

	private subscribeToGames(): void {
		this.games$.pipe(takeUntil(this.destroy$)).subscribe((games) => {
			if (games.length > 0) {
				this.gamesData = [];
				games.forEach((game: GameInterface) => {
					this.gamesData.push(new Game(game));
				});
				this.filterGames(this.searchField.value, this.checkedProviders);
			}
		});
	}

	private updateSearchTerm(searchTerm: string): void {
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: {
				searchTerm: searchTerm
			},
			queryParamsHandling: 'merge'
		});
		this.filterGames(this.searchField.value, this.checkedProviders);
	}

	private updateSelectedProviders(checkedProviders: string[]): void {
		this.router.navigate([], {
			relativeTo: this.activatedRoute,
			queryParams: {
				provider: checkedProviders.join(',')
			},
			queryParamsHandling: 'merge'
		});
		this.filterGames(this.searchField.value, this.checkedProviders);
	}

	private filterGames(searchTerm: string, selectedProviders: string[]): void {
		this.games = this.gamesData.filter((game: GameInterface) => {
			const isSearchTermMatching =
				!searchTerm ||
				game.title.toLowerCase().includes(searchTerm.toLowerCase());
			const isProviderMatching =
				!selectedProviders.length ||
				selectedProviders.includes(game.providerName);

			return isSearchTermMatching && isProviderMatching;
		});

		this.changeDetector.markForCheck();
	}
}
