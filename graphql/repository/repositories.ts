import * as rm from "typed-rest-client/RestClient";
import { IRequestOptions } from "typed-rest-client/Interfaces";

interface Findable<T> {
  findAll(): Promise<T[] | null>;
  findById(id: number): Promise<T>;
  findOne(predicate: {}): T;
}

interface Creatable<T> {
  create(data: {}): Promise<T>;
}

interface Updatable<T> {
  update(predicate: {}): Promise<T>;
}

interface Deletable {
  delete(predicate: {}): Promise<unknown>;
}

type AsyncRepositoryOpts = {
  resource: string;
  baseUrl: string;
  extraConfig?: IRequestOptions;
};

export abstract class AsyncRepository<T> implements Findable<T>, Creatable<T> {
  protected resource: string;
  protected client: rm.RestClient;

  constructor(options: AsyncRepositoryOpts) {
    const { baseUrl, resource, extraConfig } = options;
    this.client = new rm.RestClient(
      "powertrip-gateway",
      baseUrl,
      [],
      extraConfig
    );
    this.resource = resource;
  }

  async create(data: {}) {
    try {
      const { result } = await this.client.create<T>(`${this.resource}`, data);
      return result;
    } catch (error) {
      console.log(error);
    }
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
