import { useContext } from "react";
import { Context } from "../App";
import styled from "@emotion/styled";

const LoginBox = styled.div`
  width: 20rem;
  height: 20rem;
  border: solid white 1px;
  border-radius: 10px;
  margin: 10rem auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 1rem;
  }
  form {
    margin: 2rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  input {
    border: solid teal 1px;
    padding: 0.5rem;
    margin: 0 0 1rem;
    border-radius: 10px;
    background: none;
  }
  button {
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: 1rem;
    cursor: pointer;
    &:hover {
      transition: 0.5s;
      background-color: teal;
    }
  }
`;

const Login = () => {
  const [userData, setUserData] = useContext(Context);

  const handleLogin = (event:React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUserData({
      ...userData,
      selected: {
        id: "u1",
        name: "Lynette Marvin"
      }
    });
  };

  return (
    <LoginBox>
      <h1>Enter your username and password</h1>
      <form onSubmit={handleLogin}>
        <input
          placeholder="email"
          value="LMarvin"
        />
        <input
          placeholder="password"
          value={1234}
          type="password"
        />
        <button
          type='submit'
        >Login</button>
      </form>
    </LoginBox>
  );
};

export default Login;