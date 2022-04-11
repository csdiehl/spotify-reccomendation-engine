import "./SongList.css";
import { Fragment } from "react";

const SongList = (props) => {
  const songs = (
      props.reccomendations.map((obj) => {
        return (
          <div key={obj.songName} className="song">
            <div className = "song-description">
            <h2 className = 'song-name'>{obj.songName}</h2>
            <h3 className = 'artist-names'>{obj.artistNames}</h3>
            </div>
            <div>
            <a target = "_blank" rel = "noreferrer" href = {obj.spotifyURL} className = "play-btn">Play in Spotify</a>
            </div>
          </div>
        );
      })
  );

  return <Fragment>{songs}</Fragment>;
};

export default SongList;
