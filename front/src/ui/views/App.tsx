import React, { useEffect, useState } from "react";
import { MemeType } from "../../core/domain/MemeType";
import fetchMemes from "../../core/infrastructure/fetchMemes";
import fetchFilteredMemes from "../../core/infrastructure/fetchFilteredMemes";
import Meme from "../components/Meme/Meme";
import { CircularProgress } from "@mui/material";

function App() {
  const [memes, setMemes] = useState<MemeType[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchMemes().then((response) => {
      setMemes(response);
    });
  }, []);

  return (
    <div className="app_container">
      <div className="header">
        <img src="/img/GuifaffinityLogo.svg" alt="Guifaffinity logo" />
        <h1 className="header_title">GUIFAFFINITY</h1>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="¿Que quieres buscar? ¡Encuentralo!"
          className="input_search"
          onChange={(event) => setSearchText(event.target.value)}
          value={searchText}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              fetchFilteredMemes(searchText).then((response) => {
                setMemes(response);
              });
            }
          }}
        />
        <div
          className="search_icon"
          onClick={(event) => {
            fetchFilteredMemes(searchText).then((response) => {
              setMemes(response);
            });
          }}
        >
          <img src="/img/searchIcon.svg" alt="Search" />
        </div>
      </div>

      <div className="subtitle">
        <img src="/img/arrow.svg" alt="Search" className="subtitle_logo" />
        <div className="subtitle_text">Los guif más trendings del momento</div>
      </div>

      <div className="memes_grid">
        {memes.length === 0 && <CircularProgress />}

        {memes.length !== 0 &&
          memes.map((result) => (
            <Meme
              title={result.title}
              id={result.id}
              imageUrl={result.images.small.url}
              key={result.id}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
