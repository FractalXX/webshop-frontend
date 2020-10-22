import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * Provides utilities to components that extend it.
 */
@Directive()
export abstract class BaseDirective implements OnDestroy {
  private subscriptions: Subscription[] = [];

  /**
   * Array for subscriptions that will automatically unsubscribe at the end of the component lifecycle.
   */
  protected get managedSubscriptions(): Subscription[] {
    return this.subscriptions;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
