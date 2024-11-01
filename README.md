
body

import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../utils/userSlice";
import Login from "./Login";
import Browse from "./Browse";
import { RootState } from "../type/RootState";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(setUser({ uid, email, displayName }));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/browse" /> : <Login />} />
      <Route
        path="/browse"
        element={user ? <Browse /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default Body;



//header

import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../type/RootState';

const Header = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center space-x-8">
          <img src="/img/logo.png" alt="Netflix" className="w-24" />
          <nav>
            <ul className="flex space-x-4 text-sm text-gray-300">
              <li><Link to="/browse" className="hover:text-white">Home</Link></li>
              <li><Link to="/browse/tv" className="hover:text-white">TV Shows</Link></li>
              <li><Link to="/browse/movies" className="hover:text-white">Movies</Link></li>
              <li><Link to="/browse/new" className="hover:text-white">New & Popular</Link></li>
              <li><Link to="/browse/my-list" className="hover:text-white">My List</Link></li>
              <li><Link to="/browse/languages" className="hover:text-white">Browse by Languages</Link></li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="text-white" size={20} />
          <span className="text-white text-sm">Children</span>
          <Bell className="text-white" size={20} />
          <div className="flex items-center space-x-1">
            <img src="/img/avatar.png"  className="w-8 h-8 rounded" />
            <ChevronDown className="text-white" size={16} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


//browse

import React, { useEffect, useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import MovieRow from './MovieRow';
import { fetchPopularMovies, fetchBlockbusterMovies } from '../utils/api';

const Browse = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [blockbusterMovies, setBlockbusterMovies] = useState([]);

  useEffect(() => {
    const loadMovies = async () => {
      const popular = await fetchPopularMovies();
      const blockbusters = await fetchBlockbusterMovies();
      setPopularMovies(popular);
      setBlockbusterMovies(blockbusters);
    };

    loadMovies();
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <Hero 
        title="THE PROTECTOR" 
        description="Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy."
      />
      <div className="px-12">
        <MovieRow title="Popular on Netflix" movies={popularMovies} />
        <MovieRow title="Blockbuster Movies" movies={blockbusterMovies} />
      </div>
    </div>
  );
};

export default Browse;





////////

const MovieCard: React.FC<MovieCardProps> = ({ title, imageUrl }) => (
  <div className="flex-shrink-0 w-40 mr-4">
    <img src={`https://image.tmdb.org/t/p/w500${imageUrl}`} alt={title} className="w-full h-56 object-cover rounded" />
    <p className="mt-2 text-sm text-gray-300">{title}</p>
  </div>
)

//////////////////

interface Movie {
  title: string;
  poster_path: string;
}

interface MovieCardProps {
  title: string;
  imageUrl: string;
}
