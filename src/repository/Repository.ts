import mongoose, { HydratedDocument, Model } from "mongoose";

export abstract class Repository<T, TDoc> implements IRepository<T, TDoc> {
  protected model: Model<TDoc>

  protected constructor(model: Model<TDoc>) {
    this.model = model;
  }

  public getAll = async () => {
    const items = await this.model.find();

    return items.map(this.accessor)
  }

  public getById = async (id: mongoose.Types.ObjectId) => {
    const item = await this.model.findById(id);

    if (!item) return null;

    return this.accessor(item);
  }

  public create = async (data: T) => {
    const item = await this.model.create(this.mutator(data))

    return this.accessor(item)
  }

  public update = async (id: mongoose.Types.ObjectId, data: Partial<T>) => {
    const item: unknown = await this.model.updateOne({ _id: id }, data, { new: true });

    return this.accessor(item as HydratedDocument<TDoc>);
  }

  public delete = async (id: mongoose.Types.ObjectId) => {
    await this.model.deleteOne({ _id: id });
  }

  public abstract accessor(data: TDoc): T;

  public abstract mutator(data: T): Omit<T, "_id">;
}

export interface IRepository<T, TDoc> {
  getAll: () => Promise<Partial<T>[]>;
  getById: (id: mongoose.Types.ObjectId) => Promise<Partial<T> | null>;
  create: (data: T) => Promise<Partial<T>>;
  update: (id: mongoose.Types.ObjectId, data: Partial<T>) => Promise<Partial<T>>;
  delete: (id: mongoose.Types.ObjectId) => Promise<void>

  accessor: (data: HydratedDocument<TDoc>) => T;

  mutator: (data: T) => Omit<T, "_id">;
}
