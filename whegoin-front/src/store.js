const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const login = (loginUser) => {
  const request = fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },

    body: JSON.stringify(loginUser),
  }).then((res) => res.data);
  return {
    type: LOGIN,
    payload: request,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

const initstate = {
  isLogin: false,
  user: {
    id: '',
    username: '',
    email: '',
    token: '',
  },
};

const reducer = (state = initstate, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLogin: true, user: action.payload };
    case LOGOUT:
      return {
        isLogin: false,
        // user: {
        //   id: '',
        //   username: '',
        //   email: '',
        //   role: '',
        // },
      };
    default:
      return state;
  }
};
export default reducer;
