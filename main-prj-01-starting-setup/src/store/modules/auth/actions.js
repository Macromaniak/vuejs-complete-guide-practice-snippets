let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    const url =
      mode === 'login'
        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRUVp_XPmKQBtYQ7pZT7Fi9C8QqzHyJiY'
        : 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRUVp_XPmKQBtYQ7pZT7Fi9C8QqzHyJiY';

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to authenticate');
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    // const expiresIn = 5000;
    const expirationDate = new Date().getTime() + expiresIn;
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpire', expirationDate);

    timer = setTimeout(function () {
      context.dispatch('autoLogout');

    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expiry = localStorage.getItem('tokenExpire');
    const currentTime = new Date().getTime();

    if (currentTime > expiry) return;

    const timeToExpire = +expiry - currentTime;
    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, timeToExpire);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },
  autoLogout(context){
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpire');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
};
