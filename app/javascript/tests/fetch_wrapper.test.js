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

it("calls the callback function with the proper params when a token is present", async () => {
  fetch.mockResponse(() => new Promise((success, failure) => {success({headers: {'access-token': 'TOKEN_PRESENT'}})}))
  const setAuthTokenCalled = jest.fn().mockImplementation(()=>{})
  await fetch_with_auth_headers('/', {}, "auth_token_1", setAuthTokenCalled)
  expect(setAuthTokenCalled).toHaveBeenCalledTimes(1)

  fetch.mockResponse(() => new Promise((success, failure) => {success({headers: {'access-token': ''}})}))
  const setAuthTokenNeverCalled = jest.fn().mockImplementation(()=>{})
  await fetch_with_auth_headers('/', {}, "auth_token_1", setAuthTokenNeverCalled)
  expect(setAuthTokenNeverCalled).toHaveBeenCalledTimes(0)
})

it("does not set the auth token if a new token is not present", () => {
  fetch.mockResponseOnce(new Promise(()=>{}));
  const setAuthToken = jest.fn().mockImplementation((token)=>{})
  fetch.enableMocks();

  fetch_with_auth_headers('/', {}, "_", setAuthToken)
  expect(setAuthToken).toHaveBeenCalledTimes(0)
})
