import React, {useState, useEffect, createContext} from 'react'
import rootLogo from './assets/rootLogo.svg';
import styled from '@emotion/styled';
import { SuggestionsDatabase, Users } from './api/mockDatabase';
import Suggestion from './components/suggestion';
import SuggestionList from './components/suggestionList';

const HeaderTop = styled.header`
  position: fixed;
  background-color: darkgreen;
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
`

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

export const Context = createContext();

const App = () => {
  const [selection, setSelection] = useState(SuggestionsDatabase[0])
  const [user, setUser] = useState(Users[0])

  return (
    <Context.Provider value={[user,setUser]}>
      <HeaderTop>
        <img src={rootLogo}/>
        <div>
          {`Hello ${user.name}`}
        </div>
      </HeaderTop>
      <Layout>
        <nav>
          <SuggestionList
            list={SuggestionsDatabase}
            setSelection={setSelection}
          />
        </nav>
        <main>
          <Suggestion content={selection}/>
        </main>
      </Layout>
    </Context.Provider>
  )
}

export default App
