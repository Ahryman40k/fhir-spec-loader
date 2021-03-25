
export type EntityType = 'complex-type' | 'primitive-type' | 'resource'

export type ResourceLike = {
    version: string;
    resourceType: string;
}

export type BundleLike = {
    id: string;
    entry?: {
        resource: ResourceLike
    }[];
};

export type ElementDefinition_TypeLike = {
    extension?: {
        url: string,
        valueUri?: string
        valueString?: string
    }[],
    code?: string
}

export type ElementDefinitionLike = {
    id: string,
    constraint? : {
        key: string
    }[],
    type?: ElementDefinition_TypeLike[],
    min?: number,
    max?: string,
    base?: {
        path: string
    },
    definition?: string
    comment?: string
}

export type StructureDefinitionSnapshotLike = {
	element: ElementDefinitionLike[];
}

export type StructureDefinitionLike = {
    id: string
    resourceType: 'StructureDefinition'
    kind: EntityType
    fhirVersion: string
    snapshot: StructureDefinitionSnapshotLike
    description:string
    baseDefinition?: string
}


export function isStructureDefinitionLike( object: { resourceType: string } ): object is StructureDefinitionLike {
    return object.resourceType === 'StructureDefinition'
}
