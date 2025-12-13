import type { Filter } from "mongodb";

export type FilterQuery<T> = Filter<T>;

export interface IBaseRepository<T> {
  find(filter: FilterQuery<T>): Promise<T[]>;
  findAll(limit: number, skip: number, filter: FilterQuery<T>): Promise<{ items: T[]; total: number}>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findById(filter: FilterQuery<T>): Promise<T | null>;
  save(data: Partial<T>): Promise<T>;
  findOneAndUpdate(filter: FilterQuery<T>, value: Partial<T>): Promise<T | null>;
}
