import { useState, useContext } from "react";
import GenreSearch from "./GenreSearch";
import AuthContext from "../store/auth-context";
import SongList from "./SongList";


const SongForm = (props) => {
  const [choices, setChoices] = useState({
    genres: [],
    acousticness: 0.5,
    danceability: 0.5,
  });

  const [recs, setRecs] = useState([]);

  const ctx = useContext(AuthContext);

  const musicChangeHandler = (event) => {
    event.preventDefault();
    const name = event.target.name;
    let value = 0.5;

    if (event.target.checked) {
      value = 0.8;
    }

    setChoices((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const updateGenres = (chosenGenres) => {
    setChoices(prevState => { return {...prevState, genres: chosenGenres} })
  }

  const sendRequest = (event) => {
    event.preventDefault();

    const {genres, danceability: dance, acousticness: acoustic} = choices
    const seedGenres = genres.toString();
    const limit = 10;

    fetch(
      `https://api.spotify.com/v1/recommendations?seed_genres=${seedGenres}&limit=${limit}&min_danceability=${dance}&min_acousticness=${acoustic}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ctx.token}`,
          "Content-Type": "application/json"
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

  return (
    <div>
      <GenreSearch updateGenres = {updateGenres} selectedGenres = {choices.genres} />
      <h2>Musical Quality</h2>
      <label>Acoustic</label>
      <input onChange={musicChangeHandler} type="checkbox" value="acoustic" />
      <label>Danceable</label>
      <input onChange={musicChangeHandler} type="checkbox" value="danceable" />
      <div>
      <p>{choices.genres}</p>
      <button onClick={sendRequest} type="submit">
        Get Recomendations
      </button>
      </div>
      {recs.length > 0 && <SongList reccomendations = {recs} />}
    </div>
  );
};

export default SongForm;
