import { MockList } from "apollo-server-azure-functions";

const mocks = {
  Day: () => ({
    activities: () => new MockList([0, 5]),
  }),
};

export default mocks;
