import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';
import { Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private ayncEvents$: Observable<any[]>;

  constructor(
    public events: EventService,
    private router: Router) { }

  ngOnInit(): void {
    console.log('invoke findall from events');
    this.events.findAll()
      .pipe(
        take(1)
      ).subscribe((response) => {
        console.log('Got fake response' + JSON.stringify(response));
      });
  }

  public goTo(id: number): void {
    this.router.navigate(['../event', id]);
    //this.router.navigateByUrl('/event/' + id);
  }
}
