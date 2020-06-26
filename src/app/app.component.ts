import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _title: string = 'Event Manager';

  private loggedIn: boolean = true;

  constructor() {}

  public ngOnInit(): void {
    // Called immediatly after the constructor was done
    console.log(`AppComponent::ngOnInit() done!`);
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
