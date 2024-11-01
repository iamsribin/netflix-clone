export const nowPlaying = "https://api.themoviedb.org/3/movie/now_playing?page=1";
export const popular = "https://api.themoviedb.org/3/movie/popular?page=1";
export const top_rated = "https://api.themoviedb.org/3/movie/top_rated?page=1";
export const upcoming = 'https://api.themoviedb.org/3/movie/upcoming?page=1';

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOThjZGVjOTAzMDZmOWMzYjdmYjlmNWM4NWNmNTE4NSIsIm5iZiI6MTcyODkyODI5MS4wMjEzNzcsInN1YiI6IjY0NzQ0Njc5OTQwOGVjMDBjMjhmNjg1OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8qjdeJGTQ6jgqqegx8_Fne2ATGZlDAZYYfOSaz8DPXc",
  },
};
