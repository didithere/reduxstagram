// reducer takes 2 things: the action, copy of current state

function posts(state = [], action){
    console.log(state, action);
    switch (action.type) {
        case 'INCREMENT_LIKES':
            const i = action.index;
            return [
                ...state.slice(0,i),
                {...state[i], likes: state[i].likes + 1},
                ...state.slice(i+1)
            ];
        case 'LOAD_POST':
            console.log('initial load post reducer');
            return action.posts;
        default:
            return state;
    }
}

export default posts;