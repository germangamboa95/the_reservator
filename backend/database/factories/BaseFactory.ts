import { getRepository, ObjectType, Repository } from "typeorm";

export abstract class BaseFactory<T> {
  protected repository: Repository<T>;

  public constructor(entity: ObjectType<T>) {
    this.repository = getRepository(entity);
  }

  public make(partial: Partial<T> = {}): T {
    return this.repository.create({
      ...this.repository.create(),
      ...this.definition(),
      ...partial,
    });
  }

  public create(partial: Partial<T> = {}) {
    return this.repository.save(this.make(partial));
  }

  protected definition(): Partial<T> {
    return this.repository.create();
  }
}