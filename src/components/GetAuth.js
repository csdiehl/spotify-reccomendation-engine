
const GetAuth = () => {
  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=bf7e4aff5a884f51ac39072291709f0e"
  url += "&redirect_uri=http://localhost:3000/redirect"

  const getAuth = () => {
      window.location = url
  };

  return (
    <div>
      <button onClick={getAuth}>Authenticate User</button>
    </div>
  );
};

export default GetAuth;
