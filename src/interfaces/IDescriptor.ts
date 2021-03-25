import { ITypeDescriptor } from "./ITypeDescriptor";
import { EntityType } from "./BundleLike";
import { IPropertyDescriptor } from "./IPropertyDescriptor";

/**
 * Provide high level service over FHIR StructureDefinition object
 */
export interface IDescriptor extends Readonly<{
    properties: Map<string, IPropertyDescriptor>;
    /**
     * Name of resource being describes
     */
    key: string;
    kind: EntityType;
    version: string;
    constraints: string[];
    searchParameters: Map<string, IPropertyDescriptor>;
    inheritFrom: ITypeDescriptor;
    description: string;
}> {
}

