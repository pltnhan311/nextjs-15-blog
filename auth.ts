import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { client } from 'src/sanity/lib/client';
import { AUTHOR_BY_GOOGLE_ID_QUERY } from 'src/sanity/lib/queries';
import { writeClient } from 'src/sanity/lib/write-client';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ account, profile }) {
      try {
        console.log('Google Profile:', profile);
        console.log('Google Account:', account);

        // Extract relevant fields from the Google profile
        const { sub: googleId, name, email, picture } = profile || {};
        const username = email?.split('@')[0]; // Create a username from the email

        console.log('Google ID:', googleId);

        // Check if the user already exists in Sanity
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, { id: googleId });
        
        console.log('Existing User:', existingUser);


        // If the user doesn't exist, create a new user in Sanity
        if (!existingUser) {
          await writeClient.create({
            _type: 'author',
            googleId, // Use Google's ID
            name,
            username,
            email,
            image: picture,
            bio: '', // Google doesn't provide a bio field
          });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error('SignIn Callback Error:', error);
        return false; // Deny access if an error occurs
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GOOGLE_ID_QUERY, { id: account.providerAccountId });
        token.id = user?._id;
      }
      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});
