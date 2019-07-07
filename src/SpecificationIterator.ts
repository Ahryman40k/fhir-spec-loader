import { IIterator } from "./interfaces/IIterator";

import * as _ from 'lodash';
import { R4 } from "@ahryman40k/ts-fhir-types";

export class SpecificationIterator implements IIterator<R4.IStructureDefinition> {

    private _current: number = 0;

    constructor(
        private dataSource: R4.IStructureDefinition[]) {
    }

    next(): R4.IStructureDefinition | undefined {
        return this.dataSource[this._current++];
    }

    hasNext(): boolean {
        return this._current < this.dataSource.length;
    }

}