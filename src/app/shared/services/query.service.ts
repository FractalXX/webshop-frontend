import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isEmpty } from 'lodash-es';
import { pickBy } from 'lodash-es';
import { Observable } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QueryService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  buildQueryObservable<T>(
    sourceCallback: (queryParams: any) => Observable<T>,
  ): Observable<T> {
    return this.route.queryParams.pipe(
      distinctUntilChanged(),
      switchMap((queryParams) => sourceCallback(queryParams)),
    );
  }

  updateCurrentQuery(queryParams: any): void {
    this.router.navigate([], {
      queryParams: pickBy(
        queryParams,
        (value) => !isEmpty(value) || value === 0,
      ),
    });
  }
}
