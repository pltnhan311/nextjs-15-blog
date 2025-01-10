import { StartupCardSkeleton } from '@/components/StartupCard';
import UserStartups from '@/components/UserStartups';
import { auth } from 'auth';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import { client } from 'src/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from 'src/sanity/lib/queries';

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black line-clamp-1 text-center uppercase">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username}
          </p>
          <p className="text-14-normal mt-1 text-center">{user?.bio}</p>
        </div>

        <div className="flex flex-1 flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === id ? 'Your' : 'All'} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page;
