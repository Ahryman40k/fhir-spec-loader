
import { IIterator, StructureDefinitionLike } from "../interfaces";
import { ItemDescriptor } from "./descriptor";


export class DescriptorIteratorDecorator implements IIterator<ItemDescriptor> {

    constructor(
        private _iter: IIterator<StructureDefinitionLike>
    ) {
    }

    next(): ItemDescriptor {
        if (!this._iter) {
            throw new Error('No more item to iterate');
        }


        return new ItemDescriptor(this._iter.next());
    }

    hasNext(): boolean {
        return this._iter ? this._iter.hasNext() : false;
    }
}



