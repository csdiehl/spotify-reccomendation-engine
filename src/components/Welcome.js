import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import SongForm from "./SongForm";
import AuthContext from "../store/auth-context";

const Welcome = () => {
  const ctx = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.hash);
    const token = params.get("#access_token");

    ctx.login(token);
  }, [ctx, location.hash]);


  return (
    <div>
      <h1>Welcome!</h1>
      <div>
        <SongForm />
      </div>
    </div>
  );
};

export default Welcome;
