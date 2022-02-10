import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import { api } from "./services/api";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Genre: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [allMovies, setAllMovies] = useState<MovieProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  // O fetch dos gêneros é feito no componente pai, evitando que toda renderização
  // da sidebar faça um fetch para pegar os dados de gêneros.
  useEffect(() => {
    const moviesFormatted: MovieProps[] = [];

    const fetchFilms = async () => {
      const response = await api.get("films");

      const filmsList = response.data.filmsList;
      const genresList = response.data.genresList;

      setAllMovies(filmsList);
      setGenres(genresList);
    };

    fetchFilms();
  }, []);

  useEffect(() => {
    setSelectedGenre(genres[0]);
  }, [genres]);

  useEffect(() => {
    const genreIndex = genres.findIndex(
      (genre) => genre.id === selectedGenreId
    );
    setSelectedGenre(genres[genreIndex]);
  }, [selectedGenreId]);

  useEffect(() => {
    const filteredMovies = allMovies.filter((movie) => {
      const movieGenre = movie.Genre.split(",")[0].toLocaleLowerCase();

      if (movieGenre === selectedGenre.name) {
        return movie;
      }
    });

    setMovies(filteredMovies);
  }, [selectedGenre]);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {selectedGenre ? (
        <>
          <SideBar genres={genres} selectGenreHandler={handleClickButton} />

          <Content genre={selectedGenre.title} movies={movies} />
        </>
      ) : (
        <div>carregando...</div>
      )}
    </div>
  );
}
