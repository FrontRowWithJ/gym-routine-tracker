import "./login.css";
import { Label } from "../Label";
import { Input } from "../Input";
import { useEffect, useRef, useState } from "react";
import { User } from "../../resources/SVG";
import {
  BASE_URL,
  isLoggedIn,
  screenRoute,
  setLoggedIn,
  useNavigate,
} from "../../misc";
import { Link } from "../CustomRouterComponents";

export const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const backgroundColor = "#36454f";
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => void (isLoggedIn() && navigate("/")), [navigate]);

  return (
    <main className="login-page" style={{ backgroundColor }}>
      <Label pos={1} text="Sign In" />
      <form>
        <Input
          className="login-input"
          placeholder="Username"
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
          backgroundColor={backgroundColor}
          focusColor="#0A81D1"
          required
          Icon={User}
          inputRef={usernameRef}
        />
        <Input
          className="login-input"
          placeholder="Password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          backgroundColor={backgroundColor}
          focusColor="#0A81D1"
          required
          type="password"
          inputRef={passwordRef}
        />
        <button
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            const { current: usernameInput } = usernameRef;
            const { current: passwordInput } = passwordRef;
            if (!usernameInput || !passwordInput) return;
            if (!usernameInput.checkValidity())
              return usernameInput.reportValidity();
            if (!passwordInput.checkValidity())
              return passwordInput.reportValidity();
            fetch(`${BASE_URL}/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password }),
              credentials: "include",
            }).then((res) => {
              if (res.ok) {
                setLoggedIn(true);
                navigate("/");
              } else {
                //todo provide better error message
                alert("Incorrect username or password");
              }
            });
          }}
        >
          Sign In
        </button>
      </form>
      <div>
        <span>Don't have an account?&nbsp;</span>
        <Link<screenRoute> to="/register">Sign Up</Link>
      </div>
    </main>
  );
};
