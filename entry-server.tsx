import React from 'react';
import { Writable } from 'node:stream';
import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export { getSiteRoutes } from './lib/routes';
export { SITE_URL } from './lib/business';
export { localRedirects } from './lib/localPages';

/**
 * Renders one route to HTML at build time. `prerender` (unlike renderToString)
 * waits for every React.lazy chunk and Suspense boundary, so the output
 * contains the real page content instead of loading fallbacks.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerenderToNodeStream(
    <HelmetProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  return new Promise((resolve, reject) => {
    let html = '';
    prelude.pipe(
      new Writable({
        write(chunk, _enc, cb) {
          html += chunk.toString();
          cb();
        },
        final(cb) {
          resolve(html);
          cb();
        },
      })
    );
    prelude.on('error', reject);
  });
}
