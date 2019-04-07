/**
 * @see https://github.com/firebase/firebaseui-web/issues/522#issuecomment-441259412
 */
export function isStandalone() {
  return (
    // FIXME: `[ts] Property 'standalone' does not exist on type 'never'. [2339]`
    // @ts-ignore
    ('standalone' in window.navigator && window.navigator.standalone) ||
    ('matchMedia' in window && window.matchMedia('(display-mode: standalone)').matches)
  );
}
