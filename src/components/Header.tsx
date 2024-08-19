import { useContext } from "react";
import { Context } from "../App";
import styled from "@emotion/styled";
import rootLogo from '../assets/rootLogo.svg';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  mobileMenu: boolean;
  setMobileMenu:(state:boolean)=>void;
};

const HeaderWrapper = styled.header`
  position: fixed;
  background-color: teal;
  top: 0;
  width: 100%;
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  img {
    height: 1.5rem;
  }
`;

const HeaderRight = styled.div`
  display:flex;
  margin-right: 2rem;
  display: flex;
  align-items: center;
`;

const MobileMenu = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  height: 2rem;
  width: 2rem;
  @media (min-width: 800px) {
    display: none;
  }
`;

const HeaderContent = ({ mobileMenu, setMobileMenu }:HeaderProps) => {
  const [userData, setUserData] = useContext(Context);

  return (
    <HeaderWrapper>
      <img src={rootLogo}/>
    <HeaderRight>
    {userData.selected && (
      <>
        <div>
          {`Hello ${userData.selected.name}`}
        </div>
        <MobileMenu
          onClick={()=>setMobileMenu(!mobileMenu)}
        >
          <MenuIcon/>
        </MobileMenu>
      </>
    )}
    </HeaderRight>
    </HeaderWrapper>
  );
};

export default HeaderContent;