export interface ITypeDescriptor extends Readonly<{
    key: string;
    regex?: string;
    baseType?: string;
}> {
}
