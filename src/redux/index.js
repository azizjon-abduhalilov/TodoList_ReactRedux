import { createStore } from 'redux'
import student from './student'

const store = createStore(student, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;