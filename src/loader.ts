import { R4 } from '@ahryman40k/ts-fhir-types';
import { ISpecificationService } from './interfaces/ISpecificationService';
import * as fs from 'fs';
import * as tmp from 'tmp';
import * as path from 'path';
import * as unzipper from 'unzipper';

import download from 'download';

import { PathReporter } from 'io-ts/lib/PathReporter'
import { SpecificationService } from './SpecificationService';
import { promises } from 'dns';
// -------------------------------------------------------------------------------------------------
export enum ArchiveKind {
    Zip = 'zip'
}
// -------------------------------------------------------------------------------------------------
export type LoaderOptions = {
    format: ArchiveKind
}
// -------------------------------------------------------------------------------------------------

/*function loadData(file: string): R4.IBundle {
    const raw = fs.readFileSync(file);

    let validation = R4.RTTI_Bundle.decode(JSON.parse(raw.toString()));
    if (validation.isLeft()) {
        throw new Error(PathReporter.report(validation).join('/n'));
    }

    return <R4.IBundle>validation.value;
}*/

function decodeBundle(raw: string): R4.IBundle {

    let validation = R4.RTTI_Bundle.decode(JSON.parse(raw));
    if (validation.isLeft()) {
        throw new Error(PathReporter.report(validation).join('/n'));
    }

    return <R4.IBundle>validation.value;
}

// -------------------------------------------------------------------------------------------------
/* 
* Extract files into temporary folder then call FromFiles()
*/
/*
export async function FromArchive(filename: string, option: LoaderOptions = { format: ArchiveKind.Zip }): Promise<ISpecificationService> {

    let service: ISpecificationService = new SpecificationService([]);
    try {
        const directory = await unzipper.Open.file(filename);
        const files = directory.files.filter(f => path.extname(f.path) === '.json');

        const asyncMapToBuffer = async () => {
            return await Promise.all(files.map(async f => await f.buffer()));
        }

        const buffers = await asyncMapToBuffer();
        const bundles = buffers.map(b => decodeBundle(b.toString()));
        service = new SpecificationService(bundles);

    } catch (err) {
        throw err;
    }

    return service;
}
*/
// -------------------------------------------------------------------------------------------------

export function FromFiles(files: string[]): ISpecificationService {
    // TODO: Test files extension should be json

    let service: ISpecificationService = new SpecificationService([]);;
    try {
        const bundles = files.map(f => fs.readFileSync(f)).map(b => decodeBundle(b.toString()));
        service = new SpecificationService(bundles);

    } catch (ex) {
        throw ex;
    }

    return service;
}

// -------------------------------------------------------------------------------------------------
/*
export async function FromWebsite(version: R4.StructureDefinitionFhirVersionKind): Promise<ISpecificationService> {

    if (version != R4.StructureDefinitionFhirVersionKind._400) {
        throw new Error('Required FHIR version is not supported by Loader class');
    }

    // Create temporary name
    const tmpFile = tmp.fileSync({ prefix: 'fhir-spec', postfix: '.zip' });

    let service: ISpecificationService;
    try {
        // Download spec archive and save it with temparoray name        
        const data = await download('http://www.hl7.org/fhir/definitions.json.zip')
        fs.writeFileSync(tmpFile.name, data);

        // Unzip archive
        service = await FromArchive(tmpFile.name);
    }
    catch (err) {
        throw err;
    } finally {
        fs.unlink(tmpFile.name, (err) => {
            console.error('cheat');
        });
    }

    // @ts-ignore
    return service;
}
*/
// -------------------------------------------------------------------------------------------------