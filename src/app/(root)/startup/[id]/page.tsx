import { notFound } from 'next/navigation';
import React from 'react';
import { client } from 'src/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from 'src/sanity/lib/queries';

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  return (
    <div>
      <h1 className="text-3xl">{post.title}</h1>
    </div>
  );
};

export default Page;
