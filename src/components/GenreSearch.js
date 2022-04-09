import { useState, useContext, useEffect, useRef } from 'react';
import AuthContext from "../store/auth-context";
import classes from './GenreSearch.module.css';

const GenreSearch = () => {
    const ctx = useContext(AuthContext);
    const [genres, setGenres] = useState([]);
    const [filteredGenres, setFilteredGenres] = useState([])

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
            setFilteredGenres(data.genres)
          });
      }, [ctx.token]);

      const changeHandler = () => {
        const text = inputRef.current.value.toLowerCase()
        const newGenres = genres.filter(item => item.toLowerCase().includes(text) )

        setFilteredGenres(newGenres);
      }

    return <div>
        <input type = 'text' ref = {inputRef} onChange = {changeHandler} />
        <div className = {classes['list-container']}>
        <ul>
            {filteredGenres.map(item => { return <li key = {item}>{item}</li>}) }
        </ul>
        </div>
    </div>
}

export default GenreSearch