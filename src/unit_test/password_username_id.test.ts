// Module Imports
import { FormCheck } from "../modules/formCheck";

const username: string = "username";
const password: string = "abc123";
const id: string = "ABC123";

describe("This is a RegEx", () => {
  test("Check for valid Username", () => {
    expect(FormCheck.checkForRegex(username, "username")).toBe(true);
  });
});

describe("This is a RegEx", () => {
  test("Check for valid Password", () => {
    expect(FormCheck.checkForRegex(password, "password")).toBe(true);
  });
});

describe("This is a RegEx", () => {
  test("Check for valid Password", () => {
    expect(FormCheck.checkForRegex(id, "id")).toBe(true);
  });
});
