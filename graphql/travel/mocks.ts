import casual from "casual";

import { MockList } from "apollo-server-azure-functions";

const mocks = {
  Travel: () => ({
    name: casual.word,
    destination: casual.country,
    days: () => new MockList([1, 10]),
  }),
};

export default mocks;
