import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import{act} from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import App from '../components/App';
import Login from "../components/Login"

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

it("does not render login when a user is present", () => {
  act(() => {
    render(<App user="user"/>, container);
  });

  const header = container.querySelector('h1');
  expect(header.textContent).not.toBe("Login");
});

it("renders login when no user is present", () => {
  act(() => {
    render(<App />, container);
  });

  const login = container.querySelector('h1');
  expect(login.textContent).toBe("Login");
});
