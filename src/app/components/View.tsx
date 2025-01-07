import Ping from '@/components/Ping';
import React from 'react';
import { client } from 'src/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from 'src/sanity/lib/queries';

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });

  return (
    <div className="view-container">
      <div className="absolute -right-2 -top-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">Views: {totalViews}</span>
      </p>
    </div>
  );
};

export default View;
