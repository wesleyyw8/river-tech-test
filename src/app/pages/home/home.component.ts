import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { GameMockClient, Game } from '../../shared';

const NAME_KEBAB = 'app-home';

@Component({
	templateUrl: './home.component.html',
	styleUrls: ['./home.scss'],
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: { class: NAME_KEBAB },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnDestroy {
	private ngUnsubscribe = new Subject<void>();
	public gamesData: Game[] = [];

	constructor(
		private gameMockClient: GameMockClient,
		private changeDetector: ChangeDetectorRef
	) {
		gameMockClient
			.getAll$()
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe((games: Game[]) => {
				this.gamesData = games;
				changeDetector.markForCheck();
			});
	}
	ngOnDestroy(): void {
		this.ngUnsubscribe.complete();
	}
}
