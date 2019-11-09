import * as rm from "typed-rest-client/RestClient";

interface Findable<T> {
  findAll(): Promise<T[] | null>;
  findById(id: number): Promise<T>;
  findOne(predicate: {}): T;
}

interface Creatable<T> {
  create(data: {}): T;
}

interface Updatable<T> {
  update(predicate: {}): T;
}

interface Deletable {
  delete(predicate: {}): boolean;
}

type AsyncRepositoryOpts = {
  resource: string;
  baseUrl: string;
};

export abstract class AsyncRepository<T> implements Findable<T> {
  protected resource: string;
  protected client: rm.RestClient;

  constructor(options: AsyncRepositoryOpts) {
    const { baseUrl, resource } = options;
    this.client = new rm.RestClient("powertrip-gateway", baseUrl);
    this.resource = resource;
  }

  async findById(id: number) {
    try {
      const { result } = await this.client.get<T>(`${this.resource}/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  findOne(predicate: {}): T {
    throw new Error("Method not implemented.");
  }

  findAll(): Promise<T[]> {
    throw new Error("Method not implemented.");
  }
}
