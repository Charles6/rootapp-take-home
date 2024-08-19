import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import SuggestionListItem from './suggestionListItem';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Modal } from '@mui/material';
import NewSuggestionForm from './NewSuggestionForm';
import { getSuggestions } from '../middleware/apiHarness';
import { SuggestionProps } from '../App';
import { createRandomSuggestion } from '../middleware/contentGen';

interface SuggestionListProps {
  setSelection: (suggestion:SuggestionProps) => void;
  setMobileMenu: (state:boolean) => void;
};

const NavContainer = styled.div`
  max-height: 100%;
  padding: 0;
  display:flex;
  width:100%;
  flex-direction: column;
  justify-content: space-between;
  -moz-box-sizing: border-box; 
  -webkit-box-sizing: border-box; 
  box-sizing: border-box;
`;

const SuggestionListWrapper = styled.div`
  margin-top: 3rem;
  flex: 1;
  width: 100%;
  display:flex;
  flex-direction: column;
  overflow-y: hidden;
  @media (max-width: 800px) {
    margin-top: 0;
  }
`;

const SuggestionListItems = styled.div`
  overflow-y: scroll;
  @media (max-width: 800px) {
    height: 94vh;
  }
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

const SuggestionList = ({ setSelection, setMobileMenu }:SuggestionListProps) => {
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
    <>
    <NavContainer>
      <SuggestionListWrapper>
        <SuggestionListItems>
        {(list.length > 0) &&
          list.map((item:SuggestionProps) => {
            return (
            <SelectContainer
              key={item.id}
              onClick={()=>{
                setSelection(item);
                setMobileMenu(false);
              }}
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
    </>
  );
};

export default SuggestionList;