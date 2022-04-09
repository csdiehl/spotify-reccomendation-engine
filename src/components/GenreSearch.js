import { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from "../store/auth-context";
import classes from './GenreSearch.module.css';

const GenreSearch = () => {
    const ctx = useContext(AuthContext);
    const [genres, setGenres] = useState(['classical']);

    const inputRef = useRef();

    useEffect(() => {
        if (!ctx.token) {
            return;
        }

        fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${ctx.token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setGenres(data.genres)
          });
      }, [ctx.token]);

      const changeHandler = () => {
        console.log(inputRef.current.value)
      }

    return <div>
        <input type = 'text' ref = {inputRef} onChange = {changeHandler} />
        <div className = {classes['list-container']}>
        <ul>
            {genres.map(item => { return <li key = {item}>{item}</li>}) }
        </ul>
        </div>
    </div>
}

export default GenreSearch