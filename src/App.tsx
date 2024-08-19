import {useState, createContext, useEffect, useRef} from 'react';
import styled from '@emotion/styled';
import Suggestion from './components/suggestion';
import SuggestionList from './components/suggestionList';
import HeaderContent from './components/Header';
import Login from './components/Login';
import { getChat, getUsers } from './middleware/apiHarness';
import { createRandomChat } from './middleware/contentGen';

export interface UserProps {
  id: string;
  name: string;
};

export interface UserDataProps {
  selected: UserProps|null;
  users: UserProps[];
};

export interface SuggestionProps {
  id: string,
  title: string,
  description: string,
  submitter: string,
  date: number,
  newInput?:string;
};

export interface ChatProps {
  id?: string;
  suggestionId: string;
  user: string;
  comment: string;
  date: number;
};

interface MobileHeaderProps {
  menu:boolean
}

const Layout = styled.div<MobileHeaderProps>`
  display:flex;
  
  nav {
    flex: 1;
    border-right: solid white 1px;
    max-height: 100vh;
    @media (max-width: 800px) {
      position: fixed;
      background-color: #242424;
      width: 16rem;
      transition: 1s;
      transform: ${props => props.menu?'translate(0)':'translate(-20rem, 0)'};
    }
  }
  main {
    flex: 6;
    max-height: 100vh;
  }
`;

export const Context = createContext({});

const App = () => {
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataProps>({
    selected:null,
    users:[]
  });
  const [selection, setSelection] = useState<SuggestionProps>({
    id:"",
    title:"",
    description:"",
    submitter:"",
    date:0
  });
  const [chat, setChat] = useState<ChatProps[]>([]);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUserData({...userData, users:response.data});
  };

  const fetchChat = async () => {
    const response = await getChat(selection.id);
    const chatData = response.data;
    setChat(chatData.reverse());
  };

  useEffect(()=>{
    //This generates 50 new random comments in a random suggestion
    for (let i = 0; i < 50; i++) {
      createRandomChat();
    };
  
    fetchUsers();
  },[]);

  useEffect(()=>{
    fetchChat();
  },[selection]);

  return (
    <Context.Provider value={[userData, setUserData]}>
      <HeaderContent
        mobileMenu={mobileMenu}
        setMobileMenu={setMobileMenu}
      />
      {userData.selected
      ?(
      <Layout menu={mobileMenu}>
        <nav>
          <SuggestionList
            setSelection={setSelection}
            setMobileMenu={setMobileMenu}
          />
        </nav>
        <main>
          <Suggestion
            selection={selection}
            chat={chat}
            update={setSelection}
          />
        </main>
      </Layout>
      )
      :(
      <Login/>
      )
      }
      
    </Context.Provider>
  );
};

export default App;
