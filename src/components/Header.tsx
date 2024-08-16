import { useContext } from "react";
import { Context } from "../App";
import styled from "@emotion/styled";
import rootLogo from '../assets/rootLogo.svg';

const HeaderWrapper = styled.header`
  position: fixed;
  background-color: darkgreen;
  top: 0;
  width: 100%;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  img {
    height: 1.5rem;
  }
  div {
    margin-right: 3rem;
  }
`;

const HeaderContent = () => {
  const [userData, setUserData] = useContext(Context);

  return (
    <HeaderWrapper>
    <img src={rootLogo}/>
    {userData.selected && (
      <div>
        {`Hello ${userData.selected.name}`}
      </div>
    )}
    </HeaderWrapper>
  );
};

export default HeaderContent;