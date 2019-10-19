import * as rm from "typed-rest-client";

interface Findable<T> {
  findAll(): Promise<T[] | null>;
  findById(id: number): Promise<T | null>;
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
  baseUrl?: string;
  userAgent?: string;
};

export abstract class AsyncRepository<T> implements Findable<T> {
  protected resource: string;
  protected client: rm.RestClient;

  constructor(client: any, options: AsyncRepositoryOpts) {
    const { resource } = options;
    if (!resource) throw new Error("Resource option mandatory");
    this.resource = resource;
    this.client = client;
  }

  async findAll(): Promise<T[] | null> {
    const response: rm.IRestResponse<T[]> = await this.client.get<T[]>(
      this.resource
    );
    return response.result;
  }

  async findById(id: number): Promise<T | null> {
    const response: rm.IRestResponse<T> = await this.client.get<T>(
      `${this.resource}/${id}`
    );
    return response.result;
  }
  findOne(predicate: {}): T {
    throw new Error("Method not implemented.");
  }
}
