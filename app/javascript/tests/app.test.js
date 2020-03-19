import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import{act} from 'react-dom/test-utils';
import TestRenderer from 'react-test-renderer';
import NewUser from '../components/NewUser'

import App from '../components/App';

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

it("renders newUser when no user is present", () => {
  const testRenderer = TestRenderer.create(<App />);
  const testInstance = testRenderer.root;

  expect(testInstance.findByType(NewUser)).toBeTruthy();
});

it("does not render a newUser when a user is present", () => {
  const testRenderer = TestRenderer.create(<App user="user"/>);
  const testInstance = testRenderer.root;

  expect(testInstance.findAllByType(NewUser).length).toBe(0);
});
