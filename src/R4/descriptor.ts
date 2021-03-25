
import { EntityType, IDescriptor, IPropertyDescriptor, ITypeDescriptor, StructureDefinitionLike } from "../interfaces";
import { PropertyDescriptor } from "./PropertyDescriptor";


export const FHIRCode2NativeType: Record<string, string> = {
    "http://hl7.org/fhirpath/System.String": 'string',
    "http://hl7.org/fhirpath/System.Date": 'string',
    "http://hl7.org/fhirpath/System.DateTime": 'string',
    "http://hl7.org/fhirpath/System.Time": 'string',
    "http://hl7.org/fhirpath/System.Decimal": 'number',
    "http://hl7.org/fhirpath/System.Integer": 'number',
    "http://hl7.org/fhirpath/System.Boolean": 'boolean',
}



function extractBaseType(definition: StructureDefinitionLike): ITypeDescriptor | undefined {
    switch (definition.kind) {
        
        case 'resource': {
            return { 
                key: definition.id,
                baseType: definition.baseDefinition!
            }
        }

        case 'primitive-type': {
            const value = definition.snapshot.element.find(element => element.id === `${definition.id}.value`)
            if (value) {
                const extensionGroups = value.type!.filter(t => t.extension !== undefined).map(t => t.extension!)
                const extensions = new Array<{ url: string, valueUri?: string, valueString?: string }>().concat(...extensionGroups)
                // const baseTypeExt = extensions.find(ext => ext.url === "http://hl7.org/fhir/StructureDefinition/structuredefinition-fhir-type")
                const code =  value.type!.find( t => t.code !== undefined )?.code ?? ''
                const regExExt = extensions.find(ext => ext.url === "http://hl7.org/fhir/StructureDefinition/regex")
                return {
                    regex: regExExt ? regExExt.valueString : undefined,
                    key: value.id,
                    baseType: FHIRCode2NativeType[code]
                }
            }
        }
        case 'complex-type':
        default:
            return undefined
    }
}


function extractProperties(definition: StructureDefinitionLike): Map<string, IPropertyDescriptor> {
    switch (definition.kind) {
        case 'complex-type':
        case 'resource': {
            const ps = definition.snapshot.element.slice(1).map(e => new PropertyDescriptor(e));
            return new Map(ps.map(p => [p.key, p]));
        }

        case 'primitive-type':
        default:
            return new Map<string, IPropertyDescriptor>()
    }
}


export class ItemDescriptor implements IDescriptor {
    constructor(private _raw: StructureDefinitionLike) {
    }

    get key(): string {
        return this.
        _raw.id;
    }

    get kind(): EntityType {
        return this._raw.kind;
    }

    get version(): string {
        return this._raw.fhirVersion;
    }

    private _properties?: Map<string, IPropertyDescriptor>;
    get properties(): Map<string, IPropertyDescriptor> {
        if (!this._properties) {
            this._properties = extractProperties(this._raw);
        }
        return this._properties!;
    }

    private _constraints?: string[];
    get constraints(): string[] {
        if (!this.constraints) {
            const baseElement = this._raw.snapshot.element.filter(element => !element.id.includes('.'))
            if (baseElement) {
                const keys = baseElement.map(base => {
                    if (base.constraint) {
                        return base.constraint.map(constraint => constraint.key)
                    }

                    return undefined
                })

                const filteredKeys = keys.filter((item): item is string[] => Boolean(item))
                this._constraints = new Array<string>().concat(...filteredKeys)
            }
        }

        return this._constraints!
    }

    get searchParameters(): Map<string, IPropertyDescriptor> {
        throw new Error('Not yet implemented');
    }

    private _baseType?: ITypeDescriptor;
    get inheritFrom(): ITypeDescriptor {
        if (!this._baseType) {
            this._baseType = extractBaseType(this._raw)
        }

        return this._baseType!
    }

    get description(): string {
        return this._raw.description ? this._raw.description : '';
    }
}
