import { AugmentedRequest, RESTDataSource } from '@apollo/datasource-rest';
import { Player, PlayerStats } from './types';

export class NbaAPI extends RESTDataSource {
    override baseURL = 'https://api-nba-v1.p.rapidapi.com/'


    async findPlayers(search: string) : Promise<Player[]> {
        const data = await this.get('players', {
            params: {
                search: search
            }
        });
        //console.log(data.response)
        return data.response
    }

    async getActiveGames() : Promise<Number[]>  {
        const data = await this.get('games', {
            params: {
                date: "2023-11-16"
            }
        });
        //console.log(data.response.map(x => x.id))
        return data.response.map(x => x.id)
    }

    async getGameStats(playerId: number, gameId: number) : Promise<PlayerStats> {
        const data = await this.get('players/statistics', {
            params: {
                game: gameId.toString()
            }
        })
        //console.log(data.response)
        var playerIndex = data.response.findIndex(x => x.player.id == playerId)
        //console.log(playerIndex)
        return data.response[playerIndex]
    }

    override willSendRequest(_path: string, request: AugmentedRequest) {
        request.headers['X-RapidAPI-Key'] = 'lJCepXafhHxOP7AYImIzKZfxX9h4ildO'
        request.headers['X-RapidAPI-Host' ] = 'api-nba-v1.p.rapidapi.com'
      }
}