import { RESTDataSource } from '@apollo/datasource-rest';
export class NbaAPI extends RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = 'https://api-nba-v1.p.rapidapi.com/';
    }
    async findPlayers(search) {
        const data = await this.get('players', {
            params: {
                search: search
            }
        });
        //console.log(data.response)
        return data.response;
    }
    async getActiveGames() {
        const data = await this.get('games', {
            params: {
                date: "2023-11-16"
            }
        });
        //console.log(data.response.map(x => x.id))
        return data.response.map(x => x.id);
    }
    async getGameStats(playerId, gameId) {
        const data = await this.get('players/statistics', {
            params: {
                game: gameId.toString()
            }
        });
        //console.log(data.response)
        var playerIndex = data.response.findIndex(x => x.player.id == playerId);
        //console.log(playerIndex)
        return data.response[playerIndex];
    }
    willSendRequest(_path, request) {
        request.headers['X-RapidAPI-Key'] = 'lJCepXafhHxOP7AYImIzKZfxX9h4ildO';
        request.headers['X-RapidAPI-Host'] = 'api-nba-v1.p.rapidapi.com';
    }
}
