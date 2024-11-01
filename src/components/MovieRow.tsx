import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addItems, removeItem } from "../utils/cartSlice";
import { CartItem } from "../utils/cartSlice";

interface MovieRowProps {
  title: string;
  movies: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
  }[];
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  console.log();
  
  const dispatch = useDispatch();
  const [likedMovies, setLikedMovies] = useState<number[]>([]); // Track liked movie IDs

  const handleLike = (movie: CartItem) => {
    const isLiked = likedMovies.includes(movie.id);

    if (isLiked) {
      setLikedMovies(likedMovies.filter((id) => id !== movie.id));
      dispatch(removeItem(movie.id));
    } else {
      setLikedMovies([...likedMovies, movie.id]);
      dispatch(addItems(movie));
    }      
  };

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-8 relative">
      <h2  className="text-xl font-semibold text-white mb-4">{title}</h2>

      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 text-white"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        ←
      </button>

      <div
        ref={rowRef}
        className="flex overflow-x-hidden pb-4 space-x-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {movies.map((movie, index) => (
          <div className="flex-shrink-0 w-40" key={index}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-56 object-cover rounded"
            />
            <p className="mt-2 text-sm text-gray-300">{movie.title}</p>
            <p className="text-sm text-yellow-400">
                  Rating: {movie.vote_average}/10
                </p>

            {/* Like Button */}
            <button
              onClick={() =>
                handleLike({
                  id: movie.id,
                  title: movie.title,
                  overview: movie.overview,
                  poster_path: movie.poster_path,
                  vote_average: movie.vote_average,
                })
              }
              className="mt-2 px-4 py-1 bg-red-600 text-white text-sm rounded"
            >
               {likedMovies.includes(movie.id) ? "🤍 Unlike" : "❤️ Like"}
            </button>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 text-white"
        style={{ top: "50%", transform: "translateY(-50%)" }}
      >
        →
      </button>
    </div>
  );
};

export default MovieRow;
