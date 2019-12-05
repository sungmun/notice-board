import { AsyncWrapper } from '../utils/AsyncWrapper.util';

export function RouteAsyncWarp(router) {
  if (router.name === 'router') {
    router.stack = router.stack.map(RouteAsyncWarp);
  } else if (router.name === 'bound dispatch') {
    router.route.stack = router.route.stack.map(RouteAsyncWarp);
  }

  const handle = router.handle;

  router.handle =
    handle.constructor.name === 'AsyncFunction' ? AsyncWrapper(handle) : handle;
  return router;
}
