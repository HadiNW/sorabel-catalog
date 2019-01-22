import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer} from 'react-redux-firebase'

import productReducer from './productReducer'

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  products: productReducer
});

export default rootReducer;
