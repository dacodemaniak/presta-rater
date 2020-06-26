import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import {
  timer, of, Observable
} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private _title: string = 'Event Manager';

  private loggedIn: boolean = true;

  constructor() {}

  public ngOnInit(): void {
    // Called immediatly after the constructor was done
    console.log(`AppComponent::ngOnInit() done!`);

    // const timer = instance de timer rxjs
    const source = timer(1000, 2000);
    const subscriber = source.subscribe((val) => console.log(val));
    setTimeout(() => {
      subscriber.unsubscribe();
    },
    6000);

    const myEvents = of(['event1', 'event2', 'event3']);
    const eventsObserver = {
      next: (myEvent: string[]) => console.log(`Observer got a value : ${myEvent}`),
      complete: () => console.log('All of string was treated')
    };
    myEvents.subscribe(eventsObserver);

    const observable = new Observable(
      (obs) => {
        obs.next('Event 1');
        obs.next('Event 2');
        obs.next('Event 3');
        obs.complete();
      }
    );
    observable.subscribe({
      next(event): any { console.log(event); },
      complete(): any { console.log('complete'); }
    });
  }

  ngAfterViewInit(): void {
    console.log('Template was initialized');

    const ESC_KEY = 27;

    const userNameInput = document.getElementById('username') as HTMLInputElement;

    // Observable sur l'input
    this.fromEvent(userNameInput, 'keydown')
      .subscribe((event: KeyboardEvent) => {
        if (event.keyCode === ESC_KEY) {
          userNameInput.value = '';
        }
      });
  }

  private fromEvent(target: HTMLInputElement, eventName: string): Observable<any> {
    return new Observable((observer) => {
      const handler = (event: any) => observer.next(event);
      target.addEventListener(eventName, handler);

      return () => {
        target.removeEventListener(eventName, handler);
      };
    });
  }

  public ngOnDestroy(): void {
    // Clean up my object... before say good bye
  }
  /**
   *
   */
  public get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public set isLoggedIn(isLoggedIn: boolean ) {
    this.loggedIn = isLoggedIn;
  }

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public getLoggedIn(): boolean {
    return this.loggedIn;
  }

  public toggleLogStatus(): void {
    this.loggedIn = !this.loggedIn;
  }
}
