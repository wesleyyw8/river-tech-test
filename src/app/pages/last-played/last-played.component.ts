import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnDestroy,
	OnInit
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { selectLastedGames } from '../state/games.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-last-played',
	templateUrl: './last-played.component.html',
	styleUrls: ['./last-played.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LastPlayedComponent implements OnDestroy, OnInit {
	private ngUnsubscribe = new Subject<void>();

	@Select(selectLastedGames) lastPlayedGames$!: Observable<string[]>;
	public gamesList: string[] = [];

	constructor(
		// eslint-disable-next-line no-unused-vars
		private store: Store,
		// eslint-disable-next-line no-unused-vars
		private changeDetector: ChangeDetectorRef
	) {}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}

	ngOnInit(): void {
		this.lastPlayedGames$
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((gamesList: string[]) => {
				this.gamesList = gamesList;
				this.changeDetector.markForCheck();
			});
	}
}
