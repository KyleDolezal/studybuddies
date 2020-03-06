import validateUserInfo from '../modules/validateUserInfo';

const validPassword        = "validPassword567";
const validConfirmPassword = "validPassword567";
const validEmail           = "validEmail@email.com";

beforeEach(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

it("returns false when password is too short", () => {
  expect(validateUserInfo("abc", "abc", validEmail)).toBe(false);
})

it("returns false when passwords do not match", () => {
  expect(validateUserInfo(validPassword, "asdfasdfasdf", validEmail)).toBe(false);
})

it("returns false when email is invalid", () => {
  expect(validateUserInfo(validPassword, validConfirmPassword, "invalidemail")).toBe(false);
})

it("returns true when emails and password meet the acceptance criteria", () => {
  expect(validateUserInfo(validPassword, validConfirmPassword, validEmail)).toBe(true);
})
