import csrf from "./csrf"

const fetch_with_auth_headers = (path, fetch_params, auth_token, setAuthToken) => {
   return fetch(path, {
    ...fetch_params,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrf,
      'access-token': auth_token
    }
  })
  .then((response) => {
    setAuthToken(response.headers.get('access-token'))
    return response
  })
}

export default fetch_with_auth_headers;
