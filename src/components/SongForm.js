import { useState } from "react";
import "./SongForm.css";
import GenreButton from "./GenreButton";

const SongForm = (props) => {
  const [choices, setChoices] = useState({
    genres: ["country", "rock"],
    acousticness: 0.5,
    danceability: 0.5,
  });

  const changeHandler = (event) => {
    let arrayCopy = [...choices.genres];
    const name = event.target.name;

    if (arrayCopy.includes(name) === false) {
      //add to array
      arrayCopy.push(name);
    } else {
      //remove from array
      const index = arrayCopy.indexOf(name);
      arrayCopy.splice(index, 1);
    }

    setChoices((prevState) => {
      return { ...prevState, genres: arrayCopy };
    });
  };

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

  const submitHandler = (event) => {
    event.preventDefault();
    props.callback(choices);
  };

  return (
  <div>
    <h2>Genres</h2>
    <GenreButton name = 'country' changeHandler = {changeHandler} clicked = {choices.genres.includes('country')} />
    <GenreButton name = 'classical' changeHandler = {changeHandler} clicked = {choices.genres.includes('classical')} />
    <GenreButton name = 'rock' changeHandler = {changeHandler} clicked = {choices.genres.includes('rock')} />
    
    <h2>Musical Quality</h2>
    <label>Acoustic</label>
    <input onChange={musicChangeHandler} type="checkbox" value="acoustic" />
    <label>Danceable</label>
    <input onChange={musicChangeHandler} type="checkbox" value="danceable" />

    <button onClick = {submitHandler} type="submit">Get Recomendations</button>
  </div>)
};

export default SongForm;
