import fetch_with_auth_headers from '../modules/fetch_wrapper';

it("calls fetch with proper params", () => {
  fetch.mockResponseOnce(new Promise(()=>{}));
  fetch.enableMocks();

  const path="/mypath"
  const auth_token={
    'access-token': "auth_token_1",
    'client': 'client',
    'expiry': 'expiry',
    'uid': 'uid'
  }
  const object={"headers": {
    "Content-Type": "application/json",
    "X-CSRF-Token": null,
    "access-token": auth_token }
  }
  const setAuthToken= () => {}



  fetch_with_auth_headers(path, object, auth_token, setAuthToken)

  expect(fetch.mock.calls.length).toEqual(1);

  expect(fetch.mock.calls[0][0]).toEqual(path);
  expect(fetch.mock.calls[0][1]['headers']['access-token']).toEqual('auth_token_1');
})

it("calls the callback function with the proper params", () => {
  const auth_token="auth_token_1"
  const setAuthToken = jest.fn().mockImplementation((token)=>{})

  return(fetch_with_auth_headers('/', {}, auth_token, setAuthToken))
  expect(setAuthToken).toHaveBeenCalledWith(auth_token)
})
