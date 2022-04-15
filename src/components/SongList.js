import "./SongList.css";
import { Fragment, useRef, useState, useEffect } from "react";

const SongList = (props) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    let merge = [];

    for (let i = 0; i < props.features.length; i++) {
      merge.push({
        ...props.reccomendations[i],
        ...props.features[i],
      });
    }

    setSongs(merge);
  }, [props]);

  const convertKeys = (int) => {
    switch (int) {
      case 0:
        return "C";
      case 1:
        return "C#";
      case 2:
        return "D";
      case 3:
        return "D# / Eb";
      case 4:
        return "E";
      case 5:
        return "F";
      case 6:
        return "F# / Gb";
      case 7:
        return "G";
      case 8:
        return "G# / Ab";
      case 9:
        return "A";
      default:
        return "NA";
    }
  };

  const convertTime = (ms) => {
    const secs = Math.round(ms / 1000)
    return `${Math.floor(secs / 60)} min ${secs % 60} secs`
  }

  const songsList = songs.map((obj) => {
    return (
      <div key={obj.songName} className="song">
        <div className="song-description">
          <h2 className="song-name">{obj.songName}</h2>
          <h3 className="artist-names">{obj.artistNames}</h3>
          <p>Key: {convertKeys(+obj.key)}</p>
          <p>Length: {convertTime(+obj.duration_ms)}</p>
        </div>
        <div className="song-stats">
          <div
            className="bar-chart"
            style={{
              width: +obj.danceability * 100 + "%",
              backgroundColor: "#FF9B85",
            }}
          >
            Danceability
          </div>
          <div className="bar-chart" style={{ width: +obj.energy * 100 + "%" }}>
            energy
          </div>
          <div
            className="bar-chart"
            style={{ width: +obj.acousticness * 100 + "%" }}
          >
            acousticness
          </div>
          <div
            className="bar-chart"
            style={{ width: +obj.liveness * 100 + "%" }}
          >
            liveness
          </div>
          <div
            className="bar-chart"
            style={{ width: +obj.loudness * 100 + "%" }}
          >
            loudness
          </div>
        </div>
        <div>
          <button className="play-btn">
            <a target="_blank" rel="noreferrer" href={obj.spotifyURL}>
              Play
            </a>
          </button>
        </div>
      </div>
    );
  });

  const inputRef = useRef();

  const changeHandler = () => {
    const value = inputRef.current.value;

    const sortedArray = [
      ...songs.sort((a, b) => (a[value] > b[value] ? -1 : 1)),
    ];

    setSongs(sortedArray);
  };

  return (
    <Fragment>
      <div>
        <label>Sort Songs By</label>
        <select ref={inputRef} onChange={changeHandler}>
          <option value="danceability">Danceability</option>
          <option value="energy">Energy</option>
          <option value="duration_ms">Length</option>
          <option value="key">Key</option>
          <option value="liveness">Liveness</option>
          <option value="acousticness">Acousticness</option>
          <option value="loudness">Loudness</option>
        </select>
      </div>
      <div className="song-list">{songsList}</div>
    </Fragment>
  );
};

export default SongList;
