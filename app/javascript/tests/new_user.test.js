import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import {fireEvent} from '@testing-library/react';

import validateUserInfo from "../modules/validateUserInfo"
jest.mock('../modules/validateUserInfo');

import NewUser from '../components/NewUser'

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders email, password, and confirm password fields with a submit button", () => {
  act(() => {
    render(<NewUser />, container);
  });

  const userForm = container.querySelector('.userForm');
  expect(userForm.children[0].textContent).toBe("New user");
  expect(userForm.children[1].children[0].textContent).toBe("Email");
  expect(userForm.children[1].children[1].type).toBe("text");
  expect(userForm.children[2].children[0].textContent).toBe("Password");
  expect(userForm.children[2].children[1].type).toBe("password");
  expect(userForm.children[3].children[0].textContent).toBe("Confirm password");
  expect(userForm.children[3].children[1].type).toBe("password");
});

it("posts form information to the proper endpoint", () => {
  act(() => {
    render(<NewUser history={[]} createUserPath="mockUserPath"/>, container);

    validateUserInfo.mockResolvedValue(true);
  });

  const response = {};

  response.status = 'success';
  response.errors = {};
  response.errors.full_messages = [""];

  fetch.mockResponseOnce(JSON.stringify(response));

  const button = container.querySelector('button');
  fetch.enableMocks();
  fireEvent.click(button, { button: 1 });

  expect(fetch.mock.calls.length).toEqual(1);

  expect(fetch.mock.calls[0][0]).toEqual('mockUserPath');
  expect(fetch.mock.calls[0][1]['method']).toEqual('POST');
});

it("updates the state based on form values", () => {
  act(() => {
    render(<NewUser history={[]} createUserPath="mockUserPath"/>, container);
  });

  const emailField           = container.querySelector('.userForm').children[1].children[1];
  const passwordField        = container.querySelector('.userForm').children[2].children[1];
  const confirmPasswordField = container.querySelector('.userForm').children[3].children[1];

  const setStateSpy = jest.spyOn(NewUser.prototype, 'setState');

  fireEvent.change(emailField, {target: {value: 'email@adddress.com'}});
  expect(setStateSpy).toHaveBeenLastCalledWith({"email": "email@adddress.com"});

  fireEvent.change(passwordField, {target: {value: 'mypass1234'}});
  expect(setStateSpy).toHaveBeenLastCalledWith({"password": "mypass1234"});

  fireEvent.change(confirmPasswordField, {target: {value: 'mypass1234'}});
  expect(setStateSpy).toHaveBeenLastCalledWith({"password_confirmation": "mypass1234"});
});
