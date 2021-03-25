import { ITypeDescriptor } from "./ITypeDescriptor";
/**
 * Provide meaningful information level about a FHIR resource property
 */
export interface IPropertyDescriptor extends Readonly<{
    /**
     * Name of the property being described
     */
    key: string;
    
    /**
     * what is the purpose of this property
     */
    description: string;
    
    /**
     * Is that property optional
     */
    optional: boolean;
    
    /**
     * Is that property a collection of 'type'
     */
    isArray: boolean;

    /**
     * Type of property
     */
    type: ITypeDescriptor;
    /**
     * if property come from another object
     */
    inherited?: boolean;
}> {
}
