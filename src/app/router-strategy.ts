import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }

    let shouldReuse = false;
    console.log(
      '[router-reuse] checking if this route should be re used or not',
      route
    );
    if (route.routeConfig.data) {
      route.routeConfig.data.reuse
        ? (shouldReuse = true)
        : (shouldReuse = false);
    }

    return shouldReuse;
  }

  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle): void {
    console.log('[router-reuse] storing handler');
    if (handler) {
      this.handlers[this.getUrl(route)] = handler;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    console.log('[router-reuse] checking if it should be re attached');
    return !!this.handlers[this.getUrl(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return null;
    }

    return this.handlers[this.getUrl(route)];
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    /** We only want to reuse the route if the data of the route config contains a reuse true boolean */
    let reUseUrl = false;

    if (future.routeConfig) {
      if (future.routeConfig.data) {
        reUseUrl = future.routeConfig.data.reuse;
      }
    }

    const defaultReuse = future.routeConfig === current.routeConfig;

    // If either of our reuseUrl and default Url are true, we want to reuse the route
    //
    return reUseUrl || defaultReuse;
  }

  getUrl(route: ActivatedRouteSnapshot): string {
    /** The url we are going to return */
    if (route.routeConfig) {
      const url = route.routeConfig.path;
      console.log('[router-reuse] returning url', url);

      return url;
    }
  }
}
