import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Route } from '../models';
import { RouteService } from '../service/route.service';

@Component({
  selector: 'app-viewroutes',
  templateUrl: './viewroutes.component.html',
})
export class ViewroutesComponent implements OnInit {
  id!: string;
  routeList: Route[] = [];

  constructor(
    private routeSvc: RouteService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.routeSvc
      .getRoutesByUserID(this.id)
      .then((rl) => (this.routeList = rl))
      .catch((error) => {
        console.log(error);
      });
  }
}
