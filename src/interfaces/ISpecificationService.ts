import { IIterator } from "./IIterator";
import { IDescriptor } from "./IDescriptor";


export interface ISpecificationService {
  /*  conceptMapsDefinition( id: string  ): R4.IConceptMap;
    
    
    resourceDefinition( id: string ): R4.IStructureDefinition;
    resources(): R4.IStructureDefinition[];
    resourcesRawIterator( predicate?: (item: R4.IStructureDefinition) => boolean  ): IIterator<R4.IStructureDefinition>;
    
    
    compartmentDefinition( id: string ): R4.ICompartmentDefinition;
    compartments(): R4.ICompartmentDefinition[];



    operationDefinition(id: string): R4.IOperationDefinition
    operations(): R4.IOperationDefinition[];
    
    
    searchParameters( resource: string): R4.ISearchParameter[];
    primitiveTypesIterator(): IIterator<R4.IStructureDefinition>;
    complexTypesIterator(): IIterator<R4.IStructureDefinition>;*/

    resourcesIterator(): IIterator<IDescriptor>;
    primitypeIterator(): IIterator<IDescriptor>;
    complexTypeIterator(): IIterator<IDescriptor>;

}
