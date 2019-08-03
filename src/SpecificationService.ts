import { ISpecificationService } from "./interfaces/ISpecificationService";
import { R4 } from "@ahryman40k/ts-fhir-types";
import { IIterator } from "./interfaces/IIterator";
import { SpecificationIterator } from "./SpecificationIterator";

export class SpecificationService implements ISpecificationService {

    constructor( private _rawSpec: R4.IBundle[]) {
     /* const conceptMaps = _rawSpec.find( spec => spec.id === 'conceptmaps');
        const dataelements = _rawSpec.find( spec => spec.id === 'dataelements');
        const extensions = _rawSpec.find( spec => spec.id === 'extensions');
        const profilesOthers = _rawSpec.find( spec => spec.id === 'profiles-others');
        const resources = _rawSpec.find( spec => spec.id === 'resources');
        const types = _rawSpec.find( spec => spec.id === 'types');
        const searchParams = _rawSpec.find( spec => spec.id === 'searchParams');
        const v2Valuesets = _rawSpec.find( spec => spec.id === 'v2-valuesets');
        const v3Valuesets = _rawSpec.find( spec => spec.id === 'v3-valuesets');
        const valuesets = _rawSpec.find( spec => spec.id === 'valuesets');*/
    }

    primitiveTypesIterator(): IIterator<R4.IStructureDefinition> {
        const types = this._rawSpec.find( spec => spec.id === 'types');
        if ( types ) {
            const definitions = types.entry!.map( e => e.resource as R4.IStructureDefinition ) ;
            return new SpecificationIterator(definitions);
        }
        
        return new SpecificationIterator([]);
    }
    ComplexTypesIterator(): IIterator<R4.IStructureDefinition> {
        const types = this._rawSpec.find( spec => spec.id === 'types');
        if ( types ) {
            const definitions = types.entry!.map( e => e.resource as R4.IStructureDefinition ) ;
            return new SpecificationIterator(definitions);
        }
        
        return new SpecificationIterator([]);
    }
    ResourcesIterator( predicate?: (item: R4.IStructureDefinition) => boolean  ): IIterator<R4.IStructureDefinition> {
        const resources = this._rawSpec.find( spec => spec.id === 'resources');
        if ( resources ) {
            const definitions = resources.entry!.filter( e => (e.resource as any).resourceType === 'StructureDefinition' ).map( e => e.resource as R4.IStructureDefinition ) ;
            return new SpecificationIterator(definitions, predicate);
        }
        
        return new SpecificationIterator([]);
    }   
    
}