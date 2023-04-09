/* eslint-disable no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameInterface } from '../../pages/models/game.interface';
import { shareReplay } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class GameMockClient {
	private readonly dataURL = 'assets/game.mock-data.json';

	constructor(private http: HttpClient) {}

	getAll$(): Observable<GameInterface[]> {
		return this.http.get<GameInterface[]>(this.dataURL).pipe(shareReplay(1));
	}
}
