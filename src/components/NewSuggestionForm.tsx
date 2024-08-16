import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { Context, SuggestionProps } from '../App';
import { addSuggestion } from '../middleware/apiHarness';

interface NewSuggestionFormProps {
  list:SuggestionProps[];
  closeModal:()=>void;
  cancelClose:(state:boolean)=>void
};

interface FormDataProps {
  title: string;
  description: string;
};

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 20rem;
  width: 20rem;
  background-color: #242424;
  padding: 1rem 4rem;
  border: solid white 1px;
  border-radius: 10px;
  form {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
  input {
    border: 2px green solid;
    border-radius: 6px;
    padding: 0.25rem;
    margin-bottom: 1rem;
    background: none;
  }
  textarea {
    border: 2px green solid;
    border-radius: 6px;
    padding: 0.25rem;
    background: none;
  }
  
`;

const FormOptions = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonOptions = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  button {
    background: none;
    border: none;
    padding: 0.5rem;
    border-radius: 1rem;
    cursor: pointer;
    &:hover {
      transition: 0.5s;
      background-color: green;
    }
  }
`;

const NewSuggestionForm = ({
  list,
  closeModal,
  cancelClose
}:NewSuggestionFormProps) => {
  const [userData, setUserData] = useContext(Context);
  const [formData, setFormData] = useState<FormDataProps>({
    title: "",
    description: "",
  });

  const addNewSuggestion = async (item:SuggestionProps) =>{
    await addSuggestion(item);
  };

  const handleSubmit = (event:React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(formData.title.length === 0) {
      cancelClose(false)
    } else {
      let tempListItem = {
        id: `s${list.length+1}`,
        title: formData.title,
        description: formData.description,
        submitter: userData.selected.id,
        date: Math.floor(Date.now()/1000)
      };
      addNewSuggestion(tempListItem);
      closeModal();
    };
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormOptions>
          <h3>Submit a new suggestion</h3>
          <input
            placeholder='title'
            value={formData.title}
            onChange={(event)=>setFormData({...formData, title:event.target.value})}
          />
          <textarea
            placeholder='description'
            value={formData.description}
            onChange={(event)=>setFormData({...formData, description:event.target.value})}
            rows={6}
          />
        </FormOptions>
        <ButtonOptions>
          <button
            onClick={()=>cancelClose(false)}
          >
            Cancel
          </button>
          <button
            type='submit'
          >
            Add suggestion
          </button>
        </ButtonOptions>
      </form>
    </FormContainer>
  );
};

export default NewSuggestionForm;