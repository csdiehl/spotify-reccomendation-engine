import { useState, useContext } from "react";
import GenreSearch from "./GenreSearch";
import AuthContext from "../store/auth-context";
import SongList from "./SongList";
import ButtonGroup from "./ButtonGroup";
import "./SongForm.css";

const SongForm = (props) => {
  const ctx = useContext(AuthContext);
  const [choices, setChoices] = useState({
    genres: [],
    acousticness: 0.5,
    danceability: 0.5,
    instrumentalness: 0.5,
    popularity: 0.5,
    energy: 0.5,
    speechiness: 0.5,
    liveness: 0.5,
  });

  //acoustic, danceable, long, instrumental, energy, live, loudness, popularity, tempo, speechiness
  //max, min, target
  //add duration and tempo later

  const [recs, setRecs] = useState([]);

  const musicChangeHandler = (setting, value) => {
    let number;

    if (value === "low") {
      number = 0.2;
    } else if (value === "medium") {
      number = 0.5;
    } else {
      number = 0.8;
    }

    setChoices((prevState) => {
      return { ...prevState, [setting]: number };
    });
  };

  const updateGenres = (chosenGenres) => {
    setChoices((prevState) => {
      return { ...prevState, genres: chosenGenres };
    });
  };

  const sendRequest = (event) => {
    event.preventDefault();

    const {
      genres,
      danceability: dance,
      acousticness: acoustic,
      liveness: live,
      energy,
    } = choices;
    const seedGenres = genres.toString();
    const limit = 10;

    //seed_genres=${seedGenres}&limit=${limit}&min_danceability=${dance}&min_acousticness=${acoustic}
    fetch(
      "https://api.spotify.com/v1/recommendations?" +
        new URLSearchParams({
          seed_genres: seedGenres,
          limit: limit,
          target_danceability: dance,
          target_acousticness: acoustic,
          target_energy: energy,
          target_liveness: live
        }),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ctx.token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const cleanData = data.tracks.map((obj) => {
          return {
            artist: obj.name,
          };
        });

        setRecs(cleanData);
      });
  };

  const sliders = Object.keys(choices)
    .filter((key) => key !== "genres")
    .map((key) => {
      return (
        <ButtonGroup key={key} setting={key} setValue={musicChangeHandler} />
      );
    });

  return (
    <div className="form-container">
      <GenreSearch
        updateGenres={updateGenres}
        selectedGenres={choices.genres}
      />
      <h2>Musical Quality</h2>
      <div className="slider-container">{sliders}</div>
      <div>
        <button
          className="rec-button"
          onClick={sendRequest}
          type="submit"
          disabled={choices.genres.length < 1}
        >
          Get Recomendations
        </button>
      </div>
      {recs.length > 0 && <SongList reccomendations={recs} />}
    </div>
  );
};

export default SongForm;
