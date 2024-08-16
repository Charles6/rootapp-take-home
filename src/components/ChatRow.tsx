import {useState, useEffect, useContext} from 'react';
import styled from '@emotion/styled';
import { ChatProps, Context, UserProps } from '../App';
import { getTime } from '../util/tools';
import NameBubble from './NameBubble';

interface ChatDataProps {
  chatData:ChatProps;
};

interface StyleProps {
  self:boolean;
};

const ChatContainer = styled.div<StyleProps>`
  display: flex;
  margin: 1rem 0;
  align-items: center;
  flex-direction: ${props => props.self?'row-reverse':'row'};
`;

const ChatItem = styled.div<StyleProps>`
  background-color: ${props => props.self?'DodgerBlue':'gray'};
  padding: 0.5rem;
  border-radius: 10px;
  margin: 0 0.5rem;
`;

const ChatRow = ({chatData}:ChatDataProps) => {
  const [userData, setUserData] = useContext(Context);
  const [author, setAuthor] = useState<UserProps|null>(null);
  const time = getTime(chatData.date);

  useEffect(() => {
    let tempUserInfo = userData.users.filter((user:UserProps)=>user.id === chatData.user);
    setAuthor(tempUserInfo[0]);
  },[]);

  return (
    <>
    {author && (
    <ChatContainer
      self={userData.selected.id === author.id}
      key={chatData.id}
    >
      <NameBubble name={author.name}/>
        <ChatItem
          self={userData.selected.id === author.id}
        >
          {chatData.comment + ' - ' + time}
        </ChatItem>
    </ChatContainer>
    )}
    </>
  );
};

export default ChatRow;