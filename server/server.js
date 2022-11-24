// const express = require('express');
// const {ApolloServer} = require('apollo-server-express');

// const path = require('path');

// const {typeDefs, resolvers} = require('./schemas');
// const {authMiddleware} = require('./utils/auth');
// const db = require('./config/connection');
// // const routes = require('./routes');


// const app = express();
// const PORT = process.env.PORT || 3001;

// const server = new ApolloServer ({
//   typeDefs,
//   resolvers,
//   context: authMiddleware
// })

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }



// const startServer = async (typeDefs, resolvers) => {
//   await server.start();
//   server.applyMiddleware({ app });

//   // app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`🌍 Now listening on localhost:${PORT}`);
//     console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
//   })
// })
// }

// startServer(typeDefs, resolvers);




const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const db = require("./config/connection");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const PORT = process.env.PORT || 3002;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers, 
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
};

// create a new instance of Apollo Server using GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`Server now running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    });
  });
};

// start server
startApolloServer(typeDefs, resolvers);