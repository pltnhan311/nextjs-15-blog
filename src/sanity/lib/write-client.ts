import 'server-only';

import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, token } from '../env';

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
  // Set `useCdn` to `false` when you need the latest data, such as when:
  // - Statically generating pages (SSG) at build time.
  // - Using Incremental Static Regeneration (ISR) to update pages after build.
  // - Implementing tag-based revalidation to refresh content dynamically.
  // Otherwise, keep it `true` for better performance with cached data.
});

if (!writeClient.config().token) {
  throw new Error('Missing write token');
}
