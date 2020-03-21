import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import {fireEvent} from '@testing-library/react';

import Login from '../components/Login'

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders email and password fields with a submit button", () => {
  act(() => {
    render(<Login />, container);
  });

  const userForm = container.querySelector('.userForm');
  expect(userForm.children[0].textContent).toBe("Login");
  expect(userForm.children[1].children[0].textContent).toBe("Email");
  expect(userForm.children[1].children[1].type).toBe("text");
  expect(userForm.children[2].children[0].textContent).toBe("Password");
  expect(userForm.children[2].children[1].type).toBe("password");
});

it("posts form information to the proper endpoint", () => {
  act(() => {
    render(<Login history={[]} loginPath="loginPath"/>, container);
  });

  const response = {};
  response.errors = [];

  fetch.mockResponseOnce(JSON.stringify(response));

  const button = container.querySelector('button');
  fetch.enableMocks();
  fireEvent.click(button, { button: 1 });

  expect(fetch.mock.calls.length).toEqual(1);

  expect(fetch.mock.calls[0][0]).toEqual('loginPath');
  expect(fetch.mock.calls[0][1]['method']).toEqual('POST');
});

it("updates the state based on form values", () => {
  act(() => {
    render(<Login history={[]} loginPath="loginPath"/>, container);
  });

  const emailField           = container.querySelector('.userForm').children[1].children[1];
  const passwordField        = container.querySelector('.userForm').children[2].children[1];

  const setStateSpy = jest.spyOn(Login.prototype, 'setState');

  fireEvent.change(emailField, {target: {value: 'email@adddress.com'}});
  expect(setStateSpy).toHaveBeenLastCalledWith({"email": "email@adddress.com"});

  fireEvent.change(passwordField, {target: {value: 'mypass1234'}});
  expect(setStateSpy).toHaveBeenLastCalledWith({"password": "mypass1234"});
});
