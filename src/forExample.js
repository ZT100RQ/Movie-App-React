async function getApi() {
  const otvet = await fetch(
    'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA0NjNmNWFiZmUzY2U5NDcyNzY0OTNhYmQ4NDFiOSIsIm5iZiI6MTcyNDk0NTE3Mi4wNjA4LCJzdWIiOiI2NmQwOGYwMDRlZDZjN2NiNGVhMGJkMTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WGHnZIr-d4Hl8rhsSPnIJ15aPxWf7puFLaDctKMcjiU',
      },
    }
  );
  if (otvet.ok) return otvet.json();
  return 'oshibka';
}

// getApi()
