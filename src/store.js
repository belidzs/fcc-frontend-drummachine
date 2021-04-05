import * as Redux from 'redux';

const PLAY = "PLAY";

const reducer = (state = { lastPlayed: "" }, action) => {
  switch (action.type) {
    case PLAY: {
      return Object.assign({}, state, { lastPlayed: action.keyCode });
    }
    default: return state;
  }
}

export const store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
