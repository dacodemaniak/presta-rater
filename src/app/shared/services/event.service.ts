import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { EventInterface } from './../model/event-interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private events: Map<number, EventInterface> = new Map<number, EventInterface>();

  constructor(
    private httpClient: HttpClient
  ) {
    this.hydrate();
  }

  public getEvents(): Map<number, any> {
    return this.events;
  }

  public findAll(): Observable<EventInterface[]> {
    const api = `${environment.apiRoot}events`;

    return this.httpClient.get<EventInterface[]>(
      api
    );

  }

  public find(id: number): EventInterface {
    return this.events.get(id);
  }

  private hydrate(): void {
    this.events
      .set(1, {title: 'Premier événement', done: true})
      .set(2, {title: 'Second événement', done: false})
      .set(3, {title: 'Troisième événement', done: false})
      .set(4, {title: 'Quatrième événement', done: true})
      .set(5, {title: 'Toto is not required', done: false});
  }
}
