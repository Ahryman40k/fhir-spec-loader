import { IIterator } from "./interfaces/IIterator";

import * as _ from 'lodash';
import { R4 } from "@ahryman40k/ts-fhir-types";

export class SpecificationIterator implements IIterator<R4.IStructureDefinition> {

    private _current: number = -1;
    private _next: number = -1;

    constructor(
        private dataSource: R4.IStructureDefinition[],
        private predicate: (item: R4.IStructureDefinition) => boolean = item => true) {
       // this._nextMatch();
    }

    next(): R4.IStructureDefinition | undefined {
        return this._next !== -1 ? this.dataSource[this._current = this._next] : undefined;
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