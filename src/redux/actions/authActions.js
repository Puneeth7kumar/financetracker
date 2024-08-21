import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    try {
        const response = await axios.post('/api/auth/login', { email, password });
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
    }
};
