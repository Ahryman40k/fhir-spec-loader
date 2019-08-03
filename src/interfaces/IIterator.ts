export interface IIterator<T> {
    next(): T | undefined;
    hasNext(): boolean;

    nextUntil( predicate: (item: T|undefined) => boolean ): T | undefined;
}