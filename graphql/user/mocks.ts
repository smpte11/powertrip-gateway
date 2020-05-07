import casual from "casual";

const mocks = {
  User: () => ({
    email: casual.email,
    username: casual.username,
    isLogged: true,
  }),
};

export default mocks;
