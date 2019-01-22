const getProfile = accessToken => {
  return new Promise((resolve, reject) => {
    if (!accessToken) {
      return reject('No accesss token provided');
    }
    const headers = new Headers();
    headers.set('x-access-token', accessToken);
    fetch('http://actyvyst.com/api/auth/profile', { headers: headers })
      .then(response => response.json())
      .then(body => {
        if (body.errors) {
          reject(JSON.stringify(body.errors));
        } else {
          return resolve(body.data);
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
};

const login = (email, password) => {
  const url = 'http://localhost:3050/api/auth/login';
  // const url = 'http://actyvyst.com/api/auth/login';
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => response.json())
      .then(body => {
        if (body.errors) {
          reject(JSON.stringify(body.errors));
        } else {
          return resolve({
            token: body.data.attributes.token,
            refreshToken: body.data.attributes.refreshToken
          });
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
};

const refreshAccessToken = (oldToken, refreshToken) => {
  return new Promise((resolve, reject) => {
    const headers = new Headers();
    headers.set('x-access-token', oldToken);
    headers.set('Content-Type', 'application/json');
    fetch('http://actyvyst.com/api/auth/accesstoken', {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({
        token: oldToken,
        refreshToken: refreshToken
      })
    })
      .then(response => response.json())
      .then(body => {
        if (body.errors) {
          return reject('Token refresh failed');
        } else {
          return resolve({
            newToken: body.data.attributes.token,
            newRefreshToken: body.data.attributes.refreshToken
          });
        }
      })
      .catch(err => {
        return reject(err);
      });
  });
};

const AuthAPI = { login, getProfile, refreshAccessToken };
export { AuthAPI };
