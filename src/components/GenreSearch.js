import { useState, useContext, useEffect, useRef } from "react";
import AuthContext from "../store/auth-context";
import classes from "./GenreSearch.module.css";
import GenreButton from "./GenreButton";

const GenreSearch = (props) => {
  const ctx = useContext(AuthContext);
  const [genres, setGenres] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);

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
        setGenres(data.genres);
        setFilteredGenres(data.genres);
      });
  }, [ctx.token]);

  const changeHandler = () => {
    const text = inputRef.current.value.toLowerCase();
    const newGenres = genres.filter((item) =>
      item.toLowerCase().includes(text)
    );

    setFilteredGenres(newGenres);
  };

  const handleChange = (event) => {
    event.preventDefault();

    let arrayCopy = [...props.selectedGenres];
    const name = event.target.name;

    if (arrayCopy.includes(name) === false) {
      //add to array
      arrayCopy.push(name);
    } else {
      //remove from array
      const index = arrayCopy.indexOf(name);
      arrayCopy.splice(index, 1);
    }

    props.updateGenres(arrayCopy)
  };

  const buttons = filteredGenres.map((item) => {
    return (
      <GenreButton
        key={item}
        name={item}
        changeHandler={handleChange}
        disabled = {props.selectedGenres.length >= 5 ? true : false}
        clicked={props.selectedGenres.includes(item)}
      />
    );
  });

  return (
    <div>
      <input
        className={classes["search-bar"]}
        placeholder = "Search for a Genre..."
        type="text"
        ref={inputRef}
        onChange={changeHandler}
      />
      <div className={classes["list-container"]}>
        {buttons}
      </div>
    </div>
  );
};

export default GenreSearch;
