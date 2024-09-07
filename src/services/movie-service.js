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
      throw new Error(`Ошибка запросы ${response.status}`);
    }

    return await response.json();
  }

  getMovies(key, page = 1) {
    return this.getMovieData(`/3/search/movie?query=${key}&include_adult=false&language=en-US&page=${page}`);
  }

  getInfo() {
    return this.getMovieData(`/3/configuration`);
  }
}
