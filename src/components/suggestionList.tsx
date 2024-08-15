import React, { useState } from 'react';
import styled from '@emotion/styled';
import SuggestionListItem from './suggestionListItem';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Modal } from '@mui/material';
import NewSuggestionForm from './NewSuggestionForm';

const SuggestionListWrapper = styled.div`
  width: 100%;
  display:flex;
  flex-direction: column;
`

const SelectContainer = styled.button`
  background: none;
  border: none;
  text-align: left;
  cursor:pointer;
  border-bottom: solid 1px grey;
  margin: 1rem;
  &:hover {
    transition: 0.5s;
    background-color: grey;
    color: black;
  }
`;

const NewSuggestion = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor:pointer;
  &:hover {
    transition: 0.5s;
    background-color: grey;
    color: black;
  }
`;

const SuggestionList = ({list, setSelection}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <SuggestionListWrapper>
      {
        list.map((item) => (
          <SelectContainer
            key={item.id}
            onClick={()=>setSelection(item)}
          >
            <SuggestionListItem
              suggestion={item}
            />
          </SelectContainer>
        ))
      }
      </SuggestionListWrapper>
      <NewSuggestion
        onClick={handleOpen}
      >
        <EditNoteIcon/>
        <p>New suggestion</p>
      </NewSuggestion>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <NewSuggestionForm/>
      </Modal>
    </>
  )
}

export default SuggestionList;