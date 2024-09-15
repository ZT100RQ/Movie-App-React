export default class MovieService {
  async getMovieData(url) {
    const response = await fetch(`https://api.themoviedb.org${url}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA0NjNmNWFiZmUzY2U5NDcyNzY0OTNhYmQ4NDFiOSIsIm5iZiI6MTcyNDk0NTE3Mi4wNjA4LCJzdWIiOiI2NmQwOGYwMDRlZDZjN2NiNGVhMGJkMTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WGHnZIr-d4Hl8rhsSPnIJ15aPxWf7puFLaDctKMcjiU',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка запроса ${response.status}`);
    }

    return await response.json();
  }

  getMovies(key, page = 1) {
    return this.getMovieData(`/3/search/movie?query=${key}&include_adult=false&language=en-US&page=${page}`);
  }

  async createGuestSession() {
    const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
      method: 'GET',
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA0NjNmNWFiZmUzY2U5NDcyNzY0OTNhYmQ4NDFiOSIsIm5iZiI6MTcyNDk0NTE3Mi4wNjA4LCJzdWIiOiI2NmQwOGYwMDRlZDZjN2NiNGVhMGJkMTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WGHnZIr-d4Hl8rhsSPnIJ15aPxWf7puFLaDctKMcjiU',
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`Ошибка создания гостевой сессии: ${response.status}`);
    }
    return await response.json();
  }

  async addRating(sessionId, movieId, rating) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA0NjNmNWFiZmUzY2U5NDcyNzY0OTNhYmQ4NDFiOSIsIm5iZiI6MTcyNDk0NTE3Mi4wNjA4LCJzdWIiOiI2NmQwOGYwMDRlZDZjN2NiNGVhMGJkMTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WGHnZIr-d4Hl8rhsSPnIJ15aPxWf7puFLaDctKMcjiU',
      },
      body: `{ "value": ${rating}}`,
    });
    if (!response.ok) {
      throw new Error(`Ошибка запроса на рейтинг: ${response.status}`);
    }
  }

  async getRatedMovies(sessionId, page = 1) {
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.desc`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA0NjNmNWFiZmUzY2U5NDcyNzY0OTNhYmQ4NDFiOSIsIm5iZiI6MTcyNDk0NTE3Mi4wNjA4LCJzdWIiOiI2NmQwOGYwMDRlZDZjN2NiNGVhMGJkMTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WGHnZIr-d4Hl8rhsSPnIJ15aPxWf7puFLaDctKMcjiU',
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Ошибка запроса списка "рейтинг": ${response.status}`);
    }
    return await response.json();
  }
}
