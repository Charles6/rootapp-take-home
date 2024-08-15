import { useState, useContext } from 'react'
import { getOpenAIResponse } from '../api/chatGpt';
import styled from '@emotion/styled';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import { Context } from '../App';
import {DiscussionsDatabase, Users} from '../api/mockDatabase';
import { getTime } from '../util/tools';

const Wrapper = styled.div`
  height: 100%;
  padding: 0 1rem;
`;

const ChatLog = styled.div``;

const ChatRow = styled.div`
  display: flex;
  margin: 1rem 0;
  align-items: center;
  flex-direction: ${props => props.self?'row-reverse':'row'};
`;

const UserBubble = styled.div`
  height: 2rem;
  width: 2rem;
  background-color: darkgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  color: lightgreen;
  border-radius: 2rem;
  margin: 0 0.5rem;
`;

const ChatItem = styled.div`
  background-color: ${props => props.self?'DodgerBlue':'gray'};
  padding: 0.5rem;
  border-radius: 10px;
`;

const ChatInput = styled.form`
  border: 2px green solid;
  margin: 1rem auto;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
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

const Suggestion = ({content}) => {
  const [user, setUser] = useContext(Context)
  // const [input, setInput] = useState('');
  // const [response, setResponse] = useState('');
  
  // console.log(content)

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const aiResponse = await getOpenAIResponse(input);
  //   setResponse(aiResponse.choices[0].text);
  // }
  return (
    <Wrapper>
      <h2>{content.title}</h2>
      <h3>{content.description}</h3>
      <ChatLog>
      {
        DiscussionsDatabase.map((chat) => {
          const time = getTime(chat.date);
          let author = null;
          Users.find((user) => {
            if(user.id === chat.user) {
              author = user;
            }
          })

          return (
          <ChatRow
            self={user.id === author.id}
          >
            <UserBubble>
              {author.handle}
            </UserBubble>
            <ChatItem
              self={user.id === author.id}
            >
              {chat.comment + ' - ' + time}
            </ChatItem>
          </ChatRow>
        )})
      }
      </ChatLog>

      <ChatInput>
        <input
          placeholder='Add to the discussion...'
        />
        <button>
          <ForwardOutlinedIcon/>
        </button>
      </ChatInput>
      
      {/* <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          cols={50}
          placeholder='Type your prompt here'
        />
        <button
          type='submit'
        >
          Get Response
        </button>
      </form>
      <div>
        <h2>Response</h2>
        <p>{response}</p>
      </div> */}
    </Wrapper>
  )
}

export default Suggestion;