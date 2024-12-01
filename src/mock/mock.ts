import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);
mock.onPost("/api/auth/login").reply(200, {
  toekn: "fake",
});
