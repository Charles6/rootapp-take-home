import React from 'react';
import styled from '@emotion/styled';
import {getDate, getTime} from '../util/tools';
import { Users } from '../api/mockDatabase';

const SuggestionContainer = styled.div`
  margin: 0.5rem;
  h4, p {
    margin: 0;
  }
  div {
    display: flex;
    align-items: center;
  }
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
  margin-right: 0.5rem;
`;

const SuggestionListItem = ({suggestion}) => {
  const date = getDate(suggestion.date);
  const time = getTime(suggestion.date);
  let author = null;

  Users.find((user) => {
    if(user.id === suggestion.submitter) {
      author = user;
    }
  })

  return (
    <SuggestionContainer>
      <h4>{suggestion.title}</h4>
      <p>{date + " @ " + time}</p>
      {author && (
        <div>
          <UserBubble>{author.handle}</UserBubble><p>{author.name}</p>
        </div>
      )}
    </SuggestionContainer>
  )
}

export default SuggestionListItem;