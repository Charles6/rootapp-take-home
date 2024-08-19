import React, { useState, useContext } from 'react';
import styled from '@emotion/styled';
import { Context, SuggestionProps } from '../App';
import { addSuggestion } from '../middleware/apiHarness';
import { createRandomSuggestion } from '../middleware/contentGen';

interface NewSuggestionFormProps {
  list:SuggestionProps[];
  closeModal:()=>void;
  cancelClose:(state:boolean)=>void
};

interface FormDataProps {
  title: string;
  description: string;
  random: boolean;
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
    border: 2px teal solid;
    border-radius: 6px;
    padding: 0.25rem;
    margin-bottom: 1rem;
    background: none;
    &:disabled {
      border: 2px darkgray solid;
      background-color: gray;
    }
  }
  textarea {
    border: 2px teal solid;
    border-radius: 6px;
    padding: 0.25rem;
    background: none;
    &:disabled {
      border: 2px darkgray solid;
      background-color: gray;
    }
  }
  @media (max-width: 800px) {
    padding: 0.5rem;
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
      background-color: teal;
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
    random: false,
  });

  const addNewSuggestion = async (item:SuggestionProps) =>{
    await addSuggestion(item);
  };

  const handleSubmit = (event:React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData)
    if(formData.random) {
      createRandomSuggestion();
      closeModal();
    } else if (formData.title.length === 0) {
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
            disabled={formData.random}
          />
          <textarea
            placeholder='description'
            value={formData.description}
            onChange={(event)=>setFormData({...formData, description:event.target.value})}
            rows={6}
            disabled={formData.random}
          />
          <label>            
            <input 
              type='checkbox'
              onChange={()=>setFormData({...formData,random:!formData.random})}
            />
            random suggestion
          </label>
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