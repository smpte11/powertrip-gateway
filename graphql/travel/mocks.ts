import { MockList } from "apollo-server-azure-functions";

const mocks = {
  Travel: () => ({
    days: () => new MockList([1, 10]),
  }),
};

export default mocks;
