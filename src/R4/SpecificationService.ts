import { ISpecificationService } from "../interfaces/ISpecificationService";
import { IIterator } from "../interfaces/IIterator";
import { SpecificationIterator } from "../SpecificationIterator";
import { DescriptorIteratorDecorator } from "./DescriptorIterator";
import { BundleLike, StructureDefinitionLike } from "../interfaces";
import { ItemDescriptor } from "./descriptor";

export class SpecificationService implements ISpecificationService {

    private _conceptMaps?: BundleLike;
    // private _dataElements?  : R4.IBundle;
    // private _extensions?    : R4.IBundle;
    // private _profilesOthers?: R4.IBundle;
    private _resources?: BundleLike;
    private _types?: BundleLike;
    private _searchParams?: BundleLike;
    // private _v2Valuesets?   : R4.IBundle;
    // private _v3Valuesets?   : R4.IBundle;
    // private _valuesets?     : R4.IBundle;


    constructor(private _rawSpec: BundleLike[]) {

        // detect version for items in bundles ?
        // Then load files and logic accordingly 

        // Does every resources in every bundles define the same fhir version ? 
        // => otherwise throw because you cannot mix R3 and R5 object definition in the same service



        this._conceptMaps = _rawSpec.find(spec => spec.id === 'conceptmaps');
        // this._dataElements = _rawSpec.find( spec => spec.id === 'dataelements'); // These are de data time element definition ...
        // this._extensions = _rawSpec.find( spec => spec.id === 'extensions'); // These a re predefined extensions
        // this._profilesOthers = _rawSpec.find( spec => spec.id === 'profiles-others'); // predefined profiles
        this._resources = _rawSpec.find(spec => spec.id === 'resources');
        this._types = _rawSpec.find(spec => spec.id === 'types');
        this._searchParams = _rawSpec.find(spec => spec.id === 'searchParams');
        // this._v2Valuesets = _rawSpec.find( spec => spec.id === 'v2-valuesets'); // predefined valueset
        // this._v3Valuesets = _rawSpec.find( spec => spec.id === 'v3-valuesets'); // predefined valueset
        // this._valuesets = _rawSpec.find( spec => spec.id === 'valuesets');       // predefined valueset
    }

    static canHandle(rawSpec: BundleLike[]): boolean {
        const spec = rawSpec.find(spec => spec);
        if ( spec && spec.entry ) {
            const versions = spec.entry.map( entry => entry.resource.version )
            const maxVersion = versions.reduce( (version, currentVersion ) => currentVersion > version ? currentVersion : version, '')
            return maxVersion[0] === '4'
        }

        return true;
    }

    /*
        conceptMapsDefinition(id: string): R4.IConceptMap {
            const cme = this._conceptMaps!.entry!.find(cme => cme.resource!.id === id);
            if (!cme) {
                throw new Error('Id doesn\'t exist');
            }
            return cme!.resource as R4.IConceptMap;
        }
    
        resourceDefinition(id: string): R4.IStructureDefinition {
            return this._resources!.entry!.find(be => be.resource!.id === id && be.resource!.resourceType === 'StructureDefinition')!.resource as R4.IStructureDefinition;
        }
    
        resources(): R4.IStructureDefinition[] {
            return this._resources!.entry!
                .filter(be => be.resource!.resourceType === 'StructureDefinition')
                .map(re => re.resource as R4.IStructureDefinition);
        }
    
        resourcesRawIterator(predicate?: (item: R4.IStructureDefinition) => boolean): IIterator<R4.IStructureDefinition> {
            const resources = this._rawSpec.find(spec => spec.id === 'resources');
            if (resources) {
                const definitions = resources.entry!.filter(e => (e.resource as any).resourceType === 'StructureDefinition' ).map(e => e.resource as R4.IStructureDefinition);
                return new SpecificationIterator(definitions, predicate);
            }
    
            return new SpecificationIterator([]);
        }
    
        capabilityStatement(id: string): R4.ICapabilityStatement {
            return this._resources!.entry!.find(be => be.resource!.id === id && be.resource!!.resourceType === 'CapabilityStatement')!.resource as R4.ICapabilityStatement;
        }
    
    
        capabilities(): R4.ICapabilityStatement[] {
            return this._resources!.entry!
                .filter(be => be.resource!.resourceType === 'CapabilityStatement')
                .map(re => re.resource as R4.ICapabilityStatement);
        }
    
        compartmentDefinition(id: string): R4.ICompartmentDefinition {
            return this._resources!.entry!.find(be => be.resource!.id === id && be.resource!!.resourceType === 'CompartmentDefinition')!.resource as R4.ICompartmentDefinition;
        }
    
    
        compartments(): R4.ICompartmentDefinition[] {
            return this._resources!.entry!
                .filter(be => be.resource!.resourceType === 'CompartmentDefinition')
                .map(re => re.resource as R4.ICompartmentDefinition);
        }
    
        operationDefinition(id: string): R4.IOperationDefinition {
            return this._resources!.entry!.find(be => be.resource!.id === id && be.resource!!.resourceType === 'OperationDefinition')!.resource as R4.IOperationDefinition;
        }
    
    
        operations(): R4.IOperationDefinition[] {
            return this._resources!.entry!
                .filter(be => be.resource!.resourceType === 'OperationDefinition')
                .map(re => re.resource as R4.IOperationDefinition);
        }
    
        searchParameters(resource: string): R4.ISearchParameter[] {
            return this._searchParams!.entry!
                .filter(be => (<R4.ISearchParameter>be.resource!).base!.includes(resource))
                .map(be => be.resource as R4.ISearchParameter);
        }
    
    
        primitiveTypesIterator(): IIterator<R4.IStructureDefinition> {
            const definitions = this._types!.entry!.map(e => e.resource as R4.IStructureDefinition);
            return new SpecificationIterator(definitions);
        }
        complexTypesIterator(): IIterator<R4.IStructureDefinition> {
            const definitions = this._types!.entry!.map(e => e.resource as R4.IStructureDefinition);
            return new SpecificationIterator(definitions);
    
        }
    
    */

    private rawResourcesIterator(predicate?: (item: StructureDefinitionLike) => boolean): IIterator<StructureDefinitionLike> {
        const resources = this._rawSpec.find(spec => spec.id === 'resources');
        if (resources) {
            const definitions = resources.entry!.filter(e => (e.resource as any).resourceType === 'StructureDefinition').map(e => e.resource as unknown as StructureDefinitionLike);
            return new SpecificationIterator(definitions, predicate);
        }

        return new SpecificationIterator([]);
    }


    private rawComplexTypesIterator(): IIterator<StructureDefinitionLike> {
        const definitions = this._types!.entry!.map(e => e.resource as unknown as StructureDefinitionLike);
        return new SpecificationIterator(definitions, item => item.resourceType === "StructureDefinition" && item.kind! === 'complex-type' );

    }

    private rawPrimitiveTypesIterator(): IIterator<StructureDefinitionLike> {
        const definitions = this._types!.entry!.map(e => e.resource as unknown as StructureDefinitionLike);
        return new SpecificationIterator(definitions, item => item.resourceType === "StructureDefinition" && item.kind! === 'primitive-type' );

    }

    resourcesIterator(): IIterator<ItemDescriptor> {
        return new DescriptorIteratorDecorator(this.rawResourcesIterator())
    }

    primitypeIterator(): IIterator<ItemDescriptor> {
        return new DescriptorIteratorDecorator( this.rawPrimitiveTypesIterator() );
    }
    
    complexTypeIterator(): IIterator<ItemDescriptor> {
        return new DescriptorIteratorDecorator(  this.rawComplexTypesIterator() )
    }

}
