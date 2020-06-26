import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/shared/services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public events: EventService,
    private router: Router) { }

  ngOnInit(): void {
  }

  public goTo(id: number): void {
    this.router.navigate(['../event', id]);
    //this.router.navigateByUrl('/event/' + id);
  }
}
