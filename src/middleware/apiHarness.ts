import axios from 'axios';
import { ChatProps, SuggestionProps } from '../App';

const URL = 'http://localhost:3000';

export const getUsers = async () => {
  return await axios.get(`${URL}/users`);
};

export const getSuggestions = async () => {
  return await axios.get(`${URL}/suggestions`);
};

export const getSuggestionById = async (id:string) => {
  return await axios.get(`${URL}/suggestions/${id}`);
};

export const addSuggestion = async (suggestion:SuggestionProps) => {
  return await axios.post(`${URL}/suggestions`,suggestion);
};

export const getChat = async (id:string) => {
  return await axios.get(`${URL}/discussions`,{
    params:{
      suggestionId:id
    }
  });
};

export const postToChat = async (chatLine:ChatProps) => {
  return await axios.post(`${URL}/discussions`, chatLine);
};