import classes from './GetAuth.module.css'

const GetAuth = () => {

  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=bf7e4aff5a884f51ac39072291709f0e"
  url += "&redirect_uri=http://localhost:3000/redirect"

  const getAuth = () => {
      window.location = url
  };

  return (
    <div className = {classes.container}>
      <h1>Music Reccomendations</h1>
      <p>Login using your spotify account</p>
      <button className = {classes.button} onClick={getAuth}>Login With Spotify</button>
      <p>Powered by the Spotify Web API</p>
    </div>
  );
};

export default GetAuth;
