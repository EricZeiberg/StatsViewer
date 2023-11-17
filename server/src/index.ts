import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {NbaAPI} from './NbaAPI.js'


const typeDefs = `#graphql

type Player {
    id: Int
    firstname: String
    lastname: String
}

type PlayerStats {
    player: Player
    points: Int
    totReb: Int
}

type Query {
    findPlayer(id: Int) : [Player]
    getActiveGames : [Int]
    getGameStats(playerId: Int, gameId: Int) : PlayerStats
}
`;

interface ContextValue {
    dataSources: {
        nbaAPI: NbaAPI;
    }
}

const resolvers = {
    Query: {
        findPlayer: async (_, {id}, {dataSources}) => {
            return dataSources.nbaAPI.findPlayer(id);
        },
        getActiveGames: async (_, __, {dataSources}) => {
            return dataSources.nbaAPI.getActiveGames();
        },
        getGameStats: async (_, {gameId, playerId}, {dataSources}) => {
            return dataSources.nbaAPI.getGameStats(playerId, gameId);
        },
    }
}

const server = new ApolloServer<ContextValue>({
    typeDefs,
    resolvers,
  });
  
  const { url } = await startStandaloneServer(server, {
    context: async () => {
       const { cache } = server;
      return {
        dataSources: {
          nbaAPI: new NbaAPI({ cache }),
        },
      };
    },
  });

  console.log(`🚀  Server ready at ${url}`);
