import { createSlice } from '@reduxjs/toolkit';

const loadAuthState = () => {
    try {
        const serializedState = localStorage.getItem('authState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveAuthState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('authState', serializedState);
    } catch {
    }
};

const persistedState = loadAuthState();
const initialState = persistedState || {
    id: null,
    email: null,
    role: null,
    nom: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { id, email, role,nom } = action.payload;
            state.role = role;
            state.id = id;
            state.email = email;
            state.nom = nom;
        },
        logout: (state) => {
            state.id = null;
            state.email = null;
            state.role = null;
            state.nom = null;
        },
    },
});

export const authMiddleware = (store) => (next) => (action) => {
    const result = next(action);

    if (action.type === 'auth/setCredentials' || action.type === 'auth/logout') {
        const authState = store.getState().auth;
            saveAuthState({
            id: authState.id,
            email: authState.email,
            role: authState.role,
            nom: authState.nom,
        });
    }

    return result;
};

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;