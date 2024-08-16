import { useContext } from "react";
import { Context } from "../App";
import styled from "@emotion/styled";

const LoginBox = styled.div`
  width: 20rem;
  height: 25rem;
  border: solid white 1px;
  border-radius: 10px;
  margin: 10rem auto 0;
  form {
    margin: 2rem 2rem;
    display: flex;
    flex-direction: column;
  }
  input {
    border: solid green 1px;
    background: none;
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