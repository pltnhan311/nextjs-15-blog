import SearchForm from '@/components/SearchForm';
import StartupCard from '@/components/StartupCard';
import { Author, Startup } from 'src/sanity/types';
import React from 'react';
import { STARTUPS_QUERY } from 'src/sanity/lib/queries';
import { sanityFetch, SanityLive } from 'src/sanity/lib/live';

export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author };

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
  }>;
}) => {
  const query = (await searchParams).query;

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY });

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     view: 11,
  //     author: {
  //       _id: 1,
  //       name: 'Elon Musk',
  //     },
  //     _id: 1,
  //     description: 'Robots are taking over the world',
  //     title: 'We are robots',
  //     category: 'Technology',
  //     image:
  //       'https://images.unsplash.com/photo-1581557991964-125469da3b8a?q=80&w=2866&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  // ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Startups'}

          <ul className="card_grid mt-7">
            {posts?.length > 0 ? (
              posts.map((post: StartupTypeCard) => (
                <StartupCard key={post._id} post={post} />
              ))
            ) : (
              <p>No startups found. Try another search term.</p>
            )}
          </ul>
        </p>
      </section>

      <SanityLive />
    </>
  );
};

export default Home;
