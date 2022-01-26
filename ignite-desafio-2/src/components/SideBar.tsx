import { useEffect, useState } from "react";

import { Button } from "./Button";

import { api } from "../services/api";

import "../styles/sidebar.scss";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface SideBarProps {
  selectGenreHandler: (id: number) => void;
  genres: GenreResponseProps[];
}

export function SideBar({ selectGenreHandler, genres }: SideBarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  // useEffect(() => {
  //   api.get<GenreResponseProps[]>("genres").then((response) => {
  //     setGenres(response.data);
  //   });
  // }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    selectGenreHandler(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre: GenreResponseProps) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
