import parseUserInterests from '../modules/parse_user_interests';

const userInterestList = [
  {
    "id": "1",
    "type": "users",
    "attributes": {
      "email": "asdf@asdf.com"
    }
  },
  {
    "id": "1",
    "type": "interests",
    "attributes": {
      "title": "title1"
    }
  },
  {
    "id": "2",
    "type": "interests",
    "attributes": {
      "title": "title2"
    }
  }
]

it("returns users when querying for users", () => {
  expect(parseUserInterests(userInterestList, 'users', 'email')).toMatchObject([{"id": "1", "email": 'asdf@asdf.com'}]);
})

it("returns interests when querying for interests", () => {
  expect(parseUserInterests(userInterestList, 'interests', 'title')).
    toMatchObject([{"id": "1", "title": 'title1'},
                  {"id": "2", "title": "title2"}]);
})
