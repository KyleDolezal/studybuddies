import csrf from "./csrf"

const fetch_with_auth_headers = (path, fetch_params, auth_token, setAuthToken) => {
   return fetch(path, {
    ...fetch_params,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrf,
      'access-token': auth_token['access-token'],
      'client': auth_token['client'],
      'expiry': auth_token['expiry'],
      'uid': auth_token['uid']
    }
  })
  .then((response) => {
    const accessToken = response.headers.get('access-token')

    if(accessToken && accessToken.length > 1) {
      setAuthToken({
        'access-token': response.headers.get('access-token'),
        'client': response.headers.get('client'),
        'expiry': response.headers.get('expiry'),
        'uid': response.headers.get('uid')
      })
    }
    return response
  })
}

export default fetch_with_auth_headers;
