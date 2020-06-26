import { EventService } from './../../shared/services/event.service';
import { EventInterface } from './../../shared/model/event-interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  private paramsSubject: Subscription;
  private paramMap$: Observable<any>;

  public event: EventInterface;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.paramMap$ = this.route.paramMap;

    this.event = this.eventService.find(+this.route.snapshot.paramMap.get('id'));

    this.paramsSubject = this.paramMap$.subscribe((params) => {
      const parameters: any = params.params;
      const id: number = +parameters.id;
      this.event = this.eventService.find(id);
    });
  }

  ngOnDestroy(): void {
    this.paramsSubject.unsubscribe();
  }

}
