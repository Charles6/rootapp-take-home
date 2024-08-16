import {useState, createContext, useEffect} from 'react'
import styled from '@emotion/styled';
import Suggestion from './components/suggestion';
import SuggestionList from './components/suggestionList';
import HeaderContent from './components/Header';
import Login from './components/Login';
import { getChat, getUsers } from './middleware/apiHarness';

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

const Layout = styled.div`
  display:flex;
  nav {
    padding-top: 2rem;
    flex: 1;
    border-right: solid white 1px;
  }
  main {
    padding-top: 2rem;
    flex: 6;
  }
`;

export const Context = createContext({});

const App = () => {
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
    setChat(response.data);
  };

  useEffect(()=>{
    fetchUsers();
  },[]);

  useEffect(()=>{
    fetchChat();
  },[selection]);

  return (
    <Context.Provider value={[userData, setUserData]}>
      <HeaderContent/>
      {userData.selected
      ?(
      <Layout>
        <nav>
          <SuggestionList
            setSelection={setSelection}
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
