import { BundleLike } from "./interfaces";
import { ISpecificationService } from "./interfaces/ISpecificationService";
import { SpecificationService as R4SpecificationService } from './R4'

export abstract class FhirSpecificationServiceFactory {
    static SpecificationService( rawSpec: BundleLike[] ): ISpecificationService {
         // detect version for items in bundles ?
        // Then load files and logic accordingly 

        // Does every resources in every bundles define the same fhir version ? 
        // => otherwise throw because you cannot mix R3 and R5 object definition in the same service
        if ( R4SpecificationService.canHandle( rawSpec ) ) {
            return new R4SpecificationService( rawSpec );
        }
        
        throw new Error( 'Unknown / Unable to parse specification files')
    }
}