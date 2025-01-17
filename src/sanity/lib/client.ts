import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  // Set `useCdn` to `false` when you need the latest data, such as when:
  // - Statically generating pages (SSG) at build time.
  // - Using Incremental Static Regeneration (ISR) to update pages after build.
  // - Implementing tag-based revalidation to refresh content dynamically.
  // Otherwise, keep it `true` for better performance with cached data.
});
