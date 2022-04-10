const SongList = (props) => {
    const songs = (
        <ul>
          {props.reccomendations.map((obj) => {
            return <li key={obj.artist}>{obj.artist}</li>;
          })}
        </ul>
      );

      return <div>
          {songs}
      </div>
}

export default SongList;