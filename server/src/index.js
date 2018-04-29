import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import cors from 'cors';

import graphqlSchema from './models/graphql/schema';
import controllers from './controllers';

const {PORT} = process.env;

express()
  .use(cors())
  .use(bodyParser.json())
  .use('/api/v1', controllers)
  .use('/api/graphql', graphqlHTTP({schema: graphqlSchema, graphiql: true}))
  .listen(PORT, () => console.log(`Server listening on localhost:${PORT}`));
