import { RESTDataSource } from '@apollo/datasource-rest';
export default class NbaAPI extends RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = 'https://api-nba-v1.p.rapidapi.com/';
    }
    async findPlayer(id) {
        const data = await this.get('players', {
            params: {
                id: id.toString()
            }
        });
        return data.response;
    }
    willSendRequest(_path, request) {
        request.headers['X-RapidAPI-Key'] = 'lJCepXafhHxOP7AYImIzKZfxX9h4ildO';
        request.headers['X-RapidAPI-Host'] = 'api-nba-v1.p.rapidapi.com';
    }
}
