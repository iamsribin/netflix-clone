import React, { useEffect, useState } from "react";
import { fetchMovieVideos } from "../utils/api";

interface HeroProps {
  mainMovie: {
    id: number;
    original_title: string;
    overview: string;
    backdrop_path: string;
  };
}

const Hero: React.FC<HeroProps> = ({ mainMovie }) => {
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      const trailer = await fetchMovieVideos(mainMovie.id);
      if (trailer) {
        setVideoId(trailer.key); 
      }
    };
    loadMovies();

  },[]);

 return (
    <div className="relative h-screen">
      <div className="absolute inset-0 w-full h-full">
        {videoId ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`} 
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${mainMovie.backdrop_path})`,
            }}
          ></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center h-full px-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          {mainMovie.original_title}
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-xl">{mainMovie.overview}</p>
        <div className="flex space-x-4">
          <button className="px-8 py-2 bg-white text-black font-bold rounded">Play</button>
          <button className="px-8 py-2 bg-gray-500 bg-opacity-50 text-white font-bold rounded">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
