const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY?.trim();
const READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN?.trim();

async function request(endpoint) {
  if (!API_KEY && !READ_TOKEN) throw new Error("TMDB credentials missing. Add your key to .env.local.");
  const url = new URL(`${BASE_URL}${endpoint}`);
  const headers = { accept: "application/json" };
  if (READ_TOKEN) headers.Authorization = `Bearer ${READ_TOKEN}`;
  else url.searchParams.set("api_key", API_KEY);
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`TMDB request failed (${response.status}). Check the credential and try again.`);
  return response.json();
}
export function getPoster(path, size = "w500") { return path ? `${IMAGE_BASE}/${size}${path}` : null; }
const GENRES = {28:"Action",12:"Adventure",16:"Animation",35:"Comedy",80:"Crime",99:"Documentary",18:"Drama",10751:"Family",14:"Fantasy",36:"History",27:"Horror",10402:"Music",9648:"Mystery",10749:"Romance",878:"Science Fiction",10770:"TV Movie",53:"Thriller",10752:"War",37:"Western"};
function normalizeMovie(movie) {
  return {
    id:`tmdb-movie-${movie.id}`, externalId:movie.id, source:"tmdb",
    type:"movies", typeLabel:"Movie", title:movie.title || "Untitled movie",
    description:movie.overview || "No description available.",
    year:movie.release_date ? Number(movie.release_date.slice(0,4)) : null,
    rating:Number(movie.vote_average || 0)/2,
    genres:movie.genres ? movie.genres.map(g=>g.name) : (movie.genre_ids||[]).map(id=>GENRES[id]||"Other"),
    poster:getPoster(movie.poster_path), backdrop:getPoster(movie.backdrop_path,"w1280"),
    creator:"TMDB", symbol:"🎬", popularity:movie.popularity||0, length:"Movie",
    cover:"#503447"
  };
}
export async function getPopularMovies() {
  const data=await request("/movie/popular?language=en-US&page=1");
  return (data.results||[]).map(normalizeMovie);
}
export async function searchMovies(query) {
  if(!query.trim()) return [];
  const data=await request(`/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
  return (data.results||[]).map(normalizeMovie);
}
export async function getMovieDetails(id) {
  const data=await request(`/movie/${id}?language=en-US`);
  return normalizeMovie(data);
}
