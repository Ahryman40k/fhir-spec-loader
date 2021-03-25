import { ElementDefinitionLike, IPropertyDescriptor, ITypeDescriptor } from "../interfaces";
import { FHIRCode2NativeType } from "./descriptor";

export class PropertyDescriptor implements IPropertyDescriptor {
    constructor(private _raw: ElementDefinitionLike) {
    }
    private _key?: string;
    get key(): string {
        if (!this._key) {
            const splitted = this._raw.id!.split('.');
            this._key = splitted.splice(1).join('.')
        }
        return this._key;
    }


    get description(): string {
        return this._raw.definition ?? '' + '\n' + this._raw.comment ?? ''
    }


    get optional(): boolean {
        return (this._raw.min ?? 0) === 0;
    }

    get isArray(): boolean {
        return this._raw.max ? this._raw.max === '*' : false;
    }

    get type(): ITypeDescriptor {

        const typeProperty = this._raw.type
        if ( typeProperty ) {
            const typeContainingCode = typeProperty.find( p => p.code !== undefined )
            // const typeContainingExts = typeProperty.find( p => p.extension !== undefined ) // This describe entity base type not property type

            if ( typeContainingCode ) {
                const code = typeContainingCode.code!
                return {
                    key: code,
                    baseType: code.startsWith( 'http://') ? FHIRCode2NativeType[code] : code
                }
            }
        }

        throw 'PropertyDescriptor::get type() is missing logic'
    }

    get inherited(): boolean {
        let result = false; 
        if ( this._raw.base) {
            result = this._raw.id !== this._raw.base.path;
        }
        
        return result;
    }

}
