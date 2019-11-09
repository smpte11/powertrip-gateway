import nock from "nock";
import { AsyncRepository } from "./repositories";

describe("Async repository", () => {
  interface Test {}
  class TestRepository extends AsyncRepository<Test> {}
  const baseUrl = "http://api.test.com";
  const repository = new TestRepository({ baseUrl, resource: "tests" });

  it("should initialize correctly", () => {
    expect(repository).toBeDefined();
  });

  it("should find a resource by id", async () => {
    nock("http://api.test.com")
      .get("/tests/1")
      .reply(200, {});

    const response = await repository.findById(1);

    expect(response).toEqual({});
  });
});
