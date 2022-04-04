import { useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import SongForm from "./SongForm";
import AuthContext from "../store/auth-context";

const Welcome = () => {
  const [response, setResponse] = useState([]);
  const ctx = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.hash);
    const token = params.get("#access_token");

    ctx.login(token);
  }, [ctx, location.hash]);

  const sendRequest = (choices) => {
    const { genres, danceability: dance, acousticness: acoustic } = choices;
    const seedGenres = genres.toString();
    const limit = 10;

    fetch(
      `https://api.spotify.com/v1/recommendations?seed_genres=${seedGenres}&limit=${limit}&min_danceability=${dance}&min_acousticness=${acoustic}`,
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

        setResponse(cleanData);
      });
  };

  const songList = (
    <div>
      {response.map((obj) => {
        return <li key={obj.artist}>{obj.artist}</li>;
      })}
    </div>
  );

  return (
    <div>
      <h1>Welcome!</h1>
      <div>
        <SongForm callback={sendRequest} />
      </div>
      <div>
        {response.length > 0 && songList}
      </div>
    </div>
  );
};

export default Welcome;
