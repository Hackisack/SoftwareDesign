// Module Imports
import { FormCheck } from "../modules/formCheck";
const username = "username";
const password = "abc123";
const id = "ABC123";
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
//# sourceMappingURL=password_username_id.test.js.map