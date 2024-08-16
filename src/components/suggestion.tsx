import { useState, useContext } from 'react'
import styled from '@emotion/styled';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import ChatRow from './ChatRow';
import { postToChat } from '../middleware/apiHarness';
import { SuggestionProps, Context } from '../App';

interface SuggestionComponentProps {
  selection: SuggestionProps;
  chat:ChatProps[];
  update:(id:SuggestionProps)=>void;
};

interface ChatProps {
  id: string;
  suggestionId: string;
  user: string;
  comment: string;
  date: number;
}

const Wrapper = styled.div`
  height: 96vh;
  padding: 0 1rem;
  display:flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChatBox = styled.div`
  flex: 1;
  overflow-y: hidden;
`;

const ChatLog = styled.div`
  overflow-y: scroll;
`;

const ChatInput = styled.form`
  border: 2px green solid;
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
`;

const Suggestion = ({selection, chat, update}:SuggestionComponentProps) => {
  const [userData, setUserData] = useContext(Context);
  const [chatInput, setChatInput] = useState("");

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
      <div>
      <h2>{selection.title}</h2>
      <h3>{selection.description}</h3>
      <ChatBox>
        <ChatLog>
        {(chat.length > 0) &&
          chat.map((chatRow) => (
            <ChatRow 
              chatData={chatRow}
              key={chatRow.id}
            />
        ))}
        </ChatLog>
      </ChatBox>
      </div>
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