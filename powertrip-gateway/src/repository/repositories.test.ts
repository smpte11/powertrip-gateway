import { AsyncRepository } from "./repositories";

describe("Repositories", () => {
  interface Test {}
  class Client {
    get = jest.fn().mockResolvedValue({});
  }
  class TestRepository extends AsyncRepository<Test> {}
  const client = new Client();
  const repository = new TestRepository(client, {
    baseUrl: "http://localhost",
    userAgent: "test-repository",
    resource: "test"
  });

  it("should initialize correctly", async () => {
    expect(repository).toBeDefined();
  });

  test("should call the provided client", async () => {
    await repository.findAll();
    expect(client.get).toHaveBeenCalledWith("test");
  });
});
