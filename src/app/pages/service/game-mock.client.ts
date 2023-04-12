import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameInterface } from '../models/game.interface';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class GameMockClient {
	private readonly dataURL = 'assets/game.mock-data.json';

	// eslint-disable-next-line no-unused-vars
	constructor(private http: HttpClient) {
		this._games$ = this.http
			.get<GameInterface[]>(this.dataURL)
			.pipe(shareReplay(1));
	}

	private _games$: Observable<GameInterface[]>;

	getAll$(): Observable<GameInterface[]> {
		return this._games$;
	}
}
