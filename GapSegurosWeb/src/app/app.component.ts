import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { mostrarLoading, ocultarLoading } from './shared/utils/utilidades';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'GapSegurosWeb';
  private _subscripcionFinalizada$ = new Subject();

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.configurarLoadingCargaPaginas();
  }

  ngOnDestroy(): void {
    this.finalizarSubscripciones();
  }

  private configurarLoadingCargaPaginas(): void {
    this.router.events.
      pipe(takeUntil(this._subscripcionFinalizada$))
      .subscribe((event: RouterEvent) => {
        if (event instanceof RouteConfigLoadStart) {
          mostrarLoading();
        } else if (event instanceof RouteConfigLoadEnd) {
          ocultarLoading();
        }
      });
  }

  private finalizarSubscripciones(): void {
    this._subscripcionFinalizada$.next();
    this._subscripcionFinalizada$.complete();
  }
}
