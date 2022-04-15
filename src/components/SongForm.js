import { useState, useContext, Fragment } from "react";
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
    tempo: 100,
    duration: 120000,
  });

  const [enabledOptions, setEnabledOptions] = useState([
    "acousticness",
    "danceability",
    "liveness",
  ]);

  const [loading, setLoading] = useState(false);
  const [visibleForm, setVisibleForm] = useState("genre search");

  //acoustic, danceable, long, instrumental, energy, live, loudness, popularity, tempo, speechiness
  //max, min, target
  //add duration and tempo later
  const [recs, setRecs] = useState([]);
  const [features, setFeatures] = useState([])

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
    setLoading(true);

    const {
      genres,
      danceability: dance,
      acousticness: acoustic,
      liveness: live,
      energy,
      instrumentalness: instrument,
    } = choices;
    const seedGenres = genres.toString();
    const limit = 10;

    //seed_genres=${seedGenres}&limit=${limit}&min_danceability=${dance}&min_acousticness=${acoustic}
    fetch(
      "https://api.spotify.com/v1/recommendations?" +
        new URLSearchParams({
          seed_genres: seedGenres,
          limit: limit,
          ...(enabledOptions.includes("danceability") && {
            target_danceability: dance,
          }),
          ...(enabledOptions.includes("acousticness") && {
            target_acousticness: acoustic,
          }),
          ...(enabledOptions.includes("energy") && { target_energy: energy }),
          ...(enabledOptions.includes("liveness") && { target_liveness: live }),
          ...(enabledOptions.includes("instrumentalness") && {
            target_instrumentalness: instrument,
          }),
        }),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ctx.token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {if (res.ok) {return res.json()} else {alert('request failed!') } } )
      .then((data) => {
        const cleanData = data.tracks.map((obj) => {
          const artists = obj.artists.map((obj) => obj.name);

          return {
            songName: obj.name,
            artistNames: artists,
            spotifyURL: obj.external_urls.spotify,
          };
        });

        setRecs(cleanData)

        const trackIds = data.tracks.map(track => track.id)
        return fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds.join(",")}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${ctx.token}`,
            "Content-Type": "application/json",
          }
        })

 
      }).then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          alert("failed API call!")
        }
      }
      ).then((data) => {

        setFeatures(data.audio_features)
        setLoading(false)
      }
      ).catch((error) => alert("Error. Trying logging in again.")
      );
  };

  const showBtn = (setting) => {
    const arrayCopy = [...enabledOptions];

    if (enabledOptions.includes(setting)) {
      const index = arrayCopy.indexOf(setting);
      arrayCopy.splice(index, 1);
    } else {
      arrayCopy.push(setting);
    }

    setEnabledOptions(arrayCopy);
  };

  const sliders = Object.keys(choices)
    .filter((key) => key !== "genres")
    .map((key) => {
      return (
        <ButtonGroup
          key={key}
          setting={key}
          setValue={musicChangeHandler}
          enabled={enabledOptions.includes(key)}
          showBtn={showBtn}
        />
      );
    });

  return (
    <Fragment>
      <div className="form-container">
        {visibleForm === "genre search" && (
          <Fragment>
            <h2>Choose a Genre</h2>
            <GenreSearch
              updateGenres={updateGenres}
              selectedGenres={choices.genres}
            />
            <button className = "next-button" disabled = {choices.genres.length < 1} onClick={() => setVisibleForm("musical quality")}>
              Choose Musical Qualities...
            </button>
          </Fragment>
        )}
        {visibleForm === "musical quality" && (
          <Fragment>
            <h2>Musical Quality</h2>
            <button className = "next-button" onClick = {() => setVisibleForm('genre search')}>Back</button>
            <div className="slider-container">{sliders}</div>
          </Fragment>
        )}
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
      </div>
      <div className="songs-container">
        {recs.length > 0 && !loading && <SongList reccomendations={recs} features = {features} />}
        {loading && <div className="loader"></div>}
        {recs.length === 0 && !loading && (
          <p className="message">Add Genres to get Reccomendations</p>
        )}
      </div>
    </Fragment>
  );
};

export default SongForm;
