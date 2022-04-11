import "./SongList.css";
import { Fragment } from "react";

const SongList = (props) => {
  const songs = (
    <Fragment>
      {props.reccomendations.map((obj) => {
        return (
          <div className="song">
            <h2 className = 'song-name' key={obj.songName}>{obj.songName}</h2>
            <h3 className = 'artist-names'>{obj.artistNames}</h3>
          </div>
        );
      })}
    </Fragment>
  );

  return <div>{songs}</div>;
};

export default SongList;
