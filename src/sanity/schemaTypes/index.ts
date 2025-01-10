import { type SchemaTypeDefinition } from 'sanity';
import { author } from 'src/sanity/schemaTypes/author';
import { playlist } from 'src/sanity/schemaTypes/playlist';
import { startup } from 'src/sanity/schemaTypes/startup';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, playlist],
};
