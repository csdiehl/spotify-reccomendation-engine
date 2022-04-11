import "./SongList.css";
import { Fragment } from "react";

const SongList = (props) => {
  const songs = (
    <Fragment>
      {props.reccomendations.map((obj) => {
        return (
          <div key={obj.songName} className="song">
            <h2 className = 'song-name'>{obj.songName}</h2>
            <div>
            <h3 className = 'artist-names'>{obj.artistNames}</h3>
            <a target = "_blank" rel = "noreferrer" href = {obj.spotifyURL} className = "play-btn">Play in Spotify</a>
            </div>
          </div>
        );
      })}
    </Fragment>
  );

  return <div>{songs}</div>;
};

export default SongList;
