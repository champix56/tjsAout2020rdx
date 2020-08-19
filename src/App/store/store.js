import { createStore } from 'redux';
import { getMessages } from '../services/rest/rest';

const initialState = {
    messages: [],
    users: [],
    user: {}
}

function reducer(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case 'INIT_MESSAGES':getMessages();
            return state;
        case 'ADD_MESSAGES':
            return { ...state, messages: [...state.messages, ...action.values] };
        case 'ADD_USERS':
            return { ...state, users: [...state.users, ...action.values] };
        case 'SET_CURRENT_USER':
            return { ...state, user: action.value };
        default: return state;
    }
}
// let monState = reducer(undefined, { type: 'ADD_MESSAGES', values: [{ id: 1, message: 'HELO' }] })
// console.log(monState);
// monState = reducer(monState, { type: 'ADD_USERS', values: [{ id: 1, name: 'Alex' }] })
// console.log(monState);
// monState = reducer(monState, { type: 'SET_CURRENT_USER', value: { id: 2, name: 'Pierre' }})
// console.log(monState);
const store = createStore(reducer);
// store.subscribe(()=>{
//     console.log(store.getState());
// });
store.dispatch({ type: 'ADD_MESSAGES', values: [{ id: 1, message: 'HELO' }] });
store.dispatch({ type: 'ADD_USERS', values: [{ id: 1, name: 'Alex' }] });
store.dispatch({ type: 'SET_CURRENT_USER', value: { id: 2, name: 'Pierre' }});

export default store;
