import "./register.css";
import { Input } from "../Input";
import { useEffect, useRef, useState } from "react";
import { User } from "../../resources/SVG/User";
import { Label } from "../Label";
import {
  BASE_URL,
  isLoggedIn,
  screenRoute,
  setLoggedIn,
  useNavigate,
} from "../../misc";
import { Link } from "../CustomRouterComponents";

const VALID = { filter: "grayScale(0)", opacity: 1 };
const INVALID = { filter: "grayScale(1)", opacity: 0.6 };

const passwordRegex =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_+\-={}[\]|\\:;"'<>,.?/()])(?!.*\s).{8,}$/;

const isStrongPassword = (str: string) =>
  str.length >= 8 && passwordRegex.test(str);

const isWithinLength = ({ length }: string, min: number, max: number) =>
  length >= min && length <= max;

export const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const backgroundColor = "#36454f";
  const [isUsernameUnique, setIsUsernameUnique] = useState<boolean>(false);
  const [isUsernameWithinLength, setIsUsernameWithinLength] =
    useState<boolean>(false);
  const [isPasswordStrong, setIsPasswordStrong] = useState<boolean>(false);
  const [isPasswordWithinLength, setIsPasswordWithinLength] =
    useState<boolean>(false);
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>();
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>();
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState<string>();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => void (isLoggedIn() && navigate("/")), [navigate]);
  return (
    <main className="register-page" style={{ backgroundColor }}>
      <Label pos={0} text="Sign Up" />
      <form>
        <Input
          className="register-input"
          inputRef={usernameRef}
          placeholder="Username"
          value={username}
          onChange={({ target: { value } }) => {
            fetch(`${BASE_URL}/is_username_unique/?username=${value}`, {
              method: "GET",
              credentials: "include",
            }).then(async (res) => setIsUsernameUnique(await res.json()));
            setUsername(value);
            setIsUsernameWithinLength(isWithinLength(value, 3, 50));
          }}
          backgroundColor={backgroundColor}
          focusColor="#0A81D1"
          required
          Icon={User}
          pattern="^[a-zA-Z0-9_]{3,50}$"
          errorMessage={usernameErrorMessage}
          setErrorMessage={setUsernameErrorMessage}
        />
        <Input
          className="register-input"
          inputRef={passwordRef}
          placeholder="Password"
          value={password}
          onChange={({ target: { value } }) => {
            setPassword(value);
            setIsPasswordStrong(isStrongPassword(value));
            setIsPasswordWithinLength(value.length >= 8);
            setIsPasswordSame(value === confirmPassword && !!value.length);
          }}
          backgroundColor={backgroundColor}
          focusColor="#0A81D1"
          required
          type="password"
          pattern={passwordRegex.toString().slice(1, -1)}
          errorMessage={passwordErrorMessage}
          setErrorMessage={setPasswordErrorMessage}
        />
        <Input
          className="register-input"
          inputRef={confirmPasswordRef}
          placeholder="Confirm Password"
          backgroundColor={backgroundColor}
          value={confirmPassword}
          onChange={({ target: { value } }) => {
            setConfirmPassword(value);
            setIsPasswordSame(value === password && !!value.length);
          }}
          focusColor="#0A81D1"
          required
          type="password"
          pattern={passwordRegex.toString().slice(1, -1)}
          errorMessage={confirmPasswordErrorMessage}
          setErrorMessage={setConfirmPasswordErrorMessage}
        />

        <button
          type="submit"
          onClick={(evt) => {
            evt.preventDefault();
            const { current: usernameInput } = usernameRef;
            const { current: passwordInput } = passwordRef;
            const { current: confirmPasswordInput } = confirmPasswordRef;
            if (!usernameInput || !passwordInput || !confirmPasswordInput)
              return;
            if (!usernameInput.checkValidity())
              return usernameInput.reportValidity();
            if (!passwordInput.checkValidity())
              return passwordInput.reportValidity();
            if (!confirmPasswordInput.checkValidity())
              return confirmPasswordInput.reportValidity();
            if (!isUsernameUnique)
              return setUsernameErrorMessage("Username is not unique");
            if (!isUsernameWithinLength)
              return setUsernameErrorMessage(
                "Username is not within 50 characters"
              );
            if (!isPasswordStrong)
              return setPasswordErrorMessage("Password is not strong enough.");
            if (!isPasswordWithinLength)
              return setPasswordErrorMessage(
                "Password is not within 8 characters"
              );
            if (!isPasswordSame) return alert("Passwords are not the same");

            setUsernameErrorMessage(undefined);
            setPasswordErrorMessage(undefined);
            setConfirmPasswordErrorMessage(undefined);
            fetch(`${BASE_URL}/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ username, password, confirmPassword }),
              credentials: "include",
            }).then((res) => {
              if (res.ok) {
                setLoggedIn(true);
                navigate("/");
              } else {
                //todo handle error
              }
            });
          }}
        >
          Sign Up
        </button>
      </form>
      <div>
        <span>Already have an account?&nbsp;</span>
        <Link<screenRoute> to="/login">Login</Link>
      </div>
      <ul>
        <li style={isUsernameUnique ? VALID : INVALID}>Username is Unique</li>
        <li style={isUsernameWithinLength ? VALID : INVALID}>
          Username is within 50 characters
        </li>
        <li>
          <span style={isPasswordStrong ? VALID : INVALID}>
            Password contains a mix of uppercase and lowercase letters, numbers,
            <br /> and at least one of these special characters:
          </span>
          <span style={{ color: "orange" }}>
            &nbsp;!@#$%^&*()_+-={}[]|\:";'<>,.?/</>
          </span>
        </li>
        <li style={isPasswordWithinLength ? VALID : INVALID}>
          Password is at least 8 characters long
        </li>
        <li style={isPasswordSame ? VALID : INVALID}>
          Both passwords are the same.
        </li>
      </ul>
    </main>
  );
};
