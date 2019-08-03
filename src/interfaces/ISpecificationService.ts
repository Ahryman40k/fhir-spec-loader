import { IIterator } from "./IIterator";
import { R4 } from "@ahryman40k/ts-fhir-types";

export interface ISpecificationService {
    primitiveTypesIterator(): IIterator<R4.IStructureDefinition>;
    ComplexTypesIterator(): IIterator<R4.IStructureDefinition>;
    ResourcesIterator(predicate?: (item: R4.IStructureDefinition) => boolean): IIterator<R4.IStructureDefinition>;

}