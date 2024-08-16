import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import SuggestionListItem from './suggestionListItem';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Modal } from '@mui/material';
import NewSuggestionForm from './NewSuggestionForm';
import { getSuggestions } from '../middleware/apiHarness';
import { SuggestionProps } from '../App';

interface SuggestionListProps {
  setSelection: (suggestion:SuggestionProps) => void;
};

const NavContainer = styled.div`
  height: 96vh;
  display:flex;
  flex-direction: column;
`;

const SuggestionListWrapper = styled.div`
  flex: 1;
  width: 100%;
  display:flex;
  flex-direction: column;
  overflow-y: hidden;
`;

const SuggestionListItems = styled.div`
  overflow-y: scroll;
`;

const SelectContainer = styled.button`
  background: none;
  border: none;
  text-align: left;
  cursor:pointer;
  margin-top: 1rem;
  width: 100%;
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

const SuggestionList = ({setSelection}:SuggestionListProps) => {
  const [list, setList] = useState<SuggestionProps[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const fetchSuggestions = async () =>{
    const response = await getSuggestions();
    setList(response.data);
    setSelection(response.data[0]);
  };

  useEffect(()=>{
    fetchSuggestions();
  },[]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    fetchSuggestions();
    setOpen(false);
  };

  return (
    <NavContainer>
      <SuggestionListWrapper>
        <SuggestionListItems>
        {(list.length > 0) &&
          list.map((item:SuggestionProps) => {
            return (
            <SelectContainer
              key={item.id}
              onClick={()=>setSelection(item)}
            >
              <SuggestionListItem
                suggestion={item}
              />
            </SelectContainer>
          )})
        }
        </SuggestionListItems>
      </SuggestionListWrapper>
      <NewSuggestion
        onClick={handleOpen}
      >
        <EditNoteIcon/>
        <p>New suggestion</p>
      </NewSuggestion>
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <NewSuggestionForm
          closeModal={handleClose}
          cancelClose={setOpen}
          list={list}
        />
      </Modal>
    </NavContainer>
  );
};

export default SuggestionList;