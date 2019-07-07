export interface IIterator<T> {
    next(): T | undefined;
    hasNext(): boolean;
}