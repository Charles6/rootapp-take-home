import React, { useState } from 'react';
import styled from '@emotion/styled';

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
    div {
      display: flex;
      flex-direction: column;
    }
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

const NewSuggestionForm = () => {

  return (
    <FormContainer>
      <form>
        <div>
        <label>Title: </label>
        <input/>
        <label>Description:</label>
        <textarea
          rows={6}
        />
        </div>
        <button>Add suggestion</button>
      </form>
    </FormContainer>
  )
};

export default NewSuggestionForm;