import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { EventInterface } from './../model/event-interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Map<number, EventInterface> = new Map<number, EventInterface>();

  constructor(
    private httpClient: HttpClient
  ) {}

  public getEvents(): Map<number, any> {
    return this.events;
  }

  public findAll(): Observable<EventInterface[]> {
    const api = `${environment.apiRoot}events`;
    console.log(`EventService is about to call ${api}`);
    return this.httpClient.get<EventInterface[]>(
      api
    ).pipe(
      take(1), // Get the first (and unique) result
      tap((response) => { // Inspect element we've found
        // I can make something on the response...
        console.log(`From service : ${JSON.stringify(response)}`);
      }),
      map((response) => { // Transform element as we want it to be
        return response;
      })
    );
  }

  public find(id: number): EventInterface {
    return this.events.get(id);
  }

  public hydrate(): void {
    const events: EventInterface[] = [
      {id: 1, title: 'Premier événement', done: true},
      {id: 2, title: 'Second événement', done: false},
      {id: 3, title: 'Troisième événement', done: false},
      {id: 4, title: 'Quatrième événement', done: true},
      {id: 5, title: 'Toto is not required', done: false}
    ];

    localStorage.setItem('events', JSON.stringify(events));
  }
}
