
import { ElementDefinition_TypeLike, ITypeDescriptor } from "../interfaces";

export class ResourceTypeDescriptor implements ITypeDescriptor {
    constructor(obj: ElementDefinition_TypeLike);

    constructor(private _raw: ElementDefinition_TypeLike) {
    }
    
    private _key?: string;
    get key(): string {
        if (!this._key) {
            /*if (this._raw.code && isArray(this._raw.code.extension)) {
                this._key = this._raw.code.extension[0].valueString;
            }
            else {
                this._key = this._raw.code as string;
            }*/
        }
        return this._key ? this._key : '';
    }

    /*
        get kind(): PropertyTypeKind {
            // array, enum, basic, resource
            return CodeSystem_PropertyTypeKind
        }*/
}
