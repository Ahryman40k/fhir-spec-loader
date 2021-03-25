import { IIterator } from "./interfaces/IIterator";

import { StructureDefinitionLike } from "./interfaces";

export class SpecificationIterator implements IIterator<StructureDefinitionLike> {

    private _current: number = -1;
    private _next: number = -1;

    constructor(
        private dataSource: StructureDefinitionLike[],
        private predicate: (item: StructureDefinitionLike) => boolean = item => true) {
    }

    next(): StructureDefinitionLike {
        if ( this._next === -1 ) {
            throw new Error( 'No more items');
        }
        
        return this.dataSource[this._current = this._next] ;
    }

    hasNext(): boolean {
        return (this._next = this._nextMatch()) !== -1;
    }

    private _nextMatch(): number {
        const end = (index: number) => index >= this.dataSource.length;
        let index = this._current;
        while ( !end(++index) && !this.predicate(this.dataSource[index])) { 

        }

        return end(index) ? -1 : index;
    }

}