import ReactDOMClient from 'react-dom/client';

const rootCache = new WeakMap();

export const _getRoot = (container) => {
  const cachedRoot = rootCache.get(container);
  if (cachedRoot) {
    return cachedRoot;
  } else {
    const root = ReactDOMClient.createRoot(container);
    rootCache.set(container, root);
    return root;
  }
};

export const getPortalHost = () => {
  const portal = document.querySelector('body > div.portal-host');
  if (portal) {
    return portal;
  } else {
    const body = document.body || document.querySelector('body');
    const portal = document.createElement('div');
    portal.classList.add('portal-host');
    if (body) {
      body.append(portal);
    }

    return portal;
  }
};

export const unsafeEmptyRef = undefined;

export const emptyRef = { current: null };

export const unsafeUndefinedProperty = undefined;
