import { useState, useContext } from 'react'
import styled from '@emotion/styled';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import ChatRow from './ChatRow';
import { postToChat } from '../middleware/apiHarness';
import { SuggestionProps, ChatProps, Context } from '../App';

interface SuggestionComponentProps {
  selection: SuggestionProps;
  chat:ChatProps[];
  update:(id:SuggestionProps)=>void;
};

const Wrapper = styled.div`
  height: 100%;
  max-height: 100%;
  padding: 3rem 0 0 1rem;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  -moz-box-sizing: border-box; 
  -webkit-box-sizing: border-box; 
  box-sizing: border-box; 
  @media (max-width: 800px) {
    padding: 3rem 0.5rem 0;  
    margin: 0 auto;
    h3 {
      font-size: 1rem;
      margin: 0.25rem;
    }
    h2{
      font-size: 1.2rem;
      margin: 0.25rem;
    }
  }
`;

const NoComments = styled.div`
  flex: 1;
  width: 100%;
  display:flex;
  p{
    font-style: italic
  }
`;

const ChatBox = styled.div`
  flex: 1;
  width: 100%;
  display:flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const ChatLog = styled.div`
  overflow-y: scroll;
  height: 100%;
  display:flex;
  flex-direction: column-reverse;
`;

const ChatInput = styled.form`
  border: 2px Teal solid;
  margin: 1rem auto;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  width: 95%;
  input {
    flex: 1;
    height: 2rem;
    width: auto;
    border: none;
    background: none;
    &:focus {
      outline: none;
    }
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
  @media (max-width: 800px) {
    width: 90%;
    margin: 0 auto 0.25rem;
  }
`;

const Suggestion = ({selection, chat, update }:SuggestionComponentProps) => {
  const [userData, setUserData] = useContext(Context);
  const [chatInput, setChatInput] = useState<string>("");

  const addNewChat = async () =>{
    await postToChat({
      suggestionId: selection.id,
      user: userData.selected.id,
      comment: chatInput,
      date: Math.floor(Date.now()/1000)
    });
  };

  const handleChatSubmit = (event:React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewChat();
    update({...selection,newInput:chatInput});
    setChatInput("");
  };

  return (
    <Wrapper>
      <h2>{selection.title}</h2>
      <h3>{selection.description}</h3>
      {(chat.length > 0)
      ?(
        <ChatBox>
          <ChatLog >
          {(chat.length > 0) &&
            chat.map((chatRow) => (
              <ChatRow 
                chatData={chatRow}
                key={chatRow.id}
              />
          ))}
          </ChatLog>
        </ChatBox>
      )
      :(
        <NoComments>
          <p>No comments yet. Start a conversation on this suggestion here.</p>
        </NoComments>
      )
      }
      
      <ChatInput onSubmit={handleChatSubmit}>
        <input
          placeholder='Add to the discussion...'
          value={chatInput}
          onChange={(event)=>setChatInput(event.target.value)}
        />
        <button
          type='submit'
        >
          <ForwardOutlinedIcon/>
        </button>
      </ChatInput>
    </Wrapper>
  );
};

export default Suggestion;