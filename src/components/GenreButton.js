import './SongForm.css'

const GenreButton = (props) => {
    return <button
    className={
      props.clicked ? "button clicked" : "button"
    }
    onClick={props.changeHandler}
    value={props.name}
    name={props.name}
  >
    {props.name}
  </button>
}

export default GenreButton;