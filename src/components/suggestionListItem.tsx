import { useState, useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import {getDate, getTime} from '../util/tools';
import NameBubble from './NameBubble';
import { SuggestionProps, Context, UserProps } from '../App';

interface SuggestionListItemProps {
  suggestion:SuggestionProps;
};

const SuggestionContainer = styled.div`
  padding: 0.5rem;
  border-bottom: solid 1px gray;
  h4, p {
    margin: 0;
  }
  h4 {
    font-weight: bold;
    font-size: 1rem;
  }
  div {
    display: flex;
    align-items: center;
  }
  div p {
    margin: 0 0.5rem;
  }
`;

const SuggestionListItem = ({suggestion}:SuggestionListItemProps) => {
  const [userData, setUserData] = useContext(Context);
  const [author, setAuthor] = useState<UserProps|null>(null)
  const date = getDate(suggestion.date);
  const time = getTime(suggestion.date);

  useEffect(() => {
    let tempUserInfo = userData.users.filter((user:UserProps)=>user.id === suggestion.submitter);
    setAuthor(tempUserInfo[0]);
  },[]);

  return (
    <SuggestionContainer>
      <h4>{suggestion.title}</h4>
      <p>{date + " @ " + time}</p>
      {author && (
        <div>
          <NameBubble name={author.name}/>
          <p>{author.name}</p>
        </div>
      )}
    </SuggestionContainer>
  );
};

export default SuggestionListItem;