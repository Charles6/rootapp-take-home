import { addSuggestion, getSuggestions, getUsers, postToChat } from './apiHarness';

const adjectives = [
  "tall",
  "large",
  "old",
  "young",
  "small",
  "complicated"
];

const nouns = [
  "document",
  "file",
  "computer",
  "database",
  "book",
  "game",
  "tool",
  "phone"
];

const adverbs = [
  "quickly",
  "quietly",
  "knowingly",
  "randomly"
];

const verbs = [
  "sort",
  "pick",
  "rate",
  "mix",
  "elevate",
  "combine",
  "move"
];

const pickList = (arr:string[]) => {
  return arr[Math.floor(Math.random()*arr.length)];
};

export const genSentence = () => {
  const Templates = [
    `Let's ${pickList(verbs)} a ${pickList(nouns)}`,
    `I need to ${pickList(verbs)} a ${pickList(nouns)} ${pickList(adverbs)}`,
    `${pickList(nouns)} won't ${pickList(verbs)}`,
    `We need to ${pickList(verbs)} ${pickList(nouns)}`,
    `The ${pickList(nouns)} is a bit ${pickList(adjectives)}`,
    `I would like a ${pickList(adjectives)} ${pickList(nouns)}`,
    `Can you ${pickList(verbs)} the ${pickList(nouns)} ${pickList(adverbs)}`
  ];

  return pickList(Templates);
};


const fetchRandomUser = async () => {
  const response = await getUsers();
  const users = response.data;
  return users[Math.floor(Math.random()*users.length)].id;
};

const fetchRandomSuggestion = async () => {
  const response = await getSuggestions();
  let suggestion = response.data;
  return suggestion[Math.floor(Math.random()*suggestion.length)].id;
}

const createNewSuggestionId = async () => {
  const response = await getSuggestions();
  let output = response.data
  return `s${output.length + 1}`;
};

export const createRandomSuggestion = () => {
  const AddNewSuggestion = async () => {
    const userId = await fetchRandomUser();
    const nextSuggestionId = await createNewSuggestionId();
    
    const tempListItem = {
      id: nextSuggestionId,
      title: genSentence(),
      description: genSentence(),
      submitter: userId,
      date: Math.floor(Date.now()/1000)
    };

    await addSuggestion(tempListItem);
  };

  AddNewSuggestion();
};

export const createRandomChat = () => {
  const addNewChat = async () =>{
    const userId = await fetchRandomUser();
    const suggestionId = await fetchRandomSuggestion();

    const tempChatLine = {
      suggestionId: suggestionId,
      user: userId,
      comment: genSentence(),
      date: Math.floor(Date.now()/1000)
    };

    await postToChat(tempChatLine);
  };
  addNewChat();
};