import { R4 } from '@ahryman40k/ts-fhir-types';
import { ISpecificationService } from './interfaces/ISpecificationService';
import * as fs from 'fs';
import * as tmp from 'tmp';
import * as unzipper from 'unzipper';

import download from 'download';

import { PathReporter } from 'io-ts/lib/PathReporter'
import { SpecificationService } from './SpecificationService';
// -------------------------------------------------------------------------------------------------
export enum ArchiveKind {
    Zip = 'zip'
}
// -------------------------------------------------------------------------------------------------
export type LoaderOptions = {
    format: ArchiveKind
}
// -------------------------------------------------------------------------------------------------
function loadData(file: string): R4.IBundle {
    const raw = fs.readFileSync(file);

    let validation = R4.RTTI_Bundle.decode(JSON.parse(raw.toString()));
    if (validation.isLeft()) {
        throw new Error(PathReporter.report(validation).join('/n'));
    }

    return <R4.IBundle>validation.value;
}

// -------------------------------------------------------------------------------------------------
/* 
* Extract files into temporary folder then call FromFiles()
*/
export async function FromArchive(filename: string, option: LoaderOptions = { format: ArchiveKind.Zip }): Promise<ISpecificationService> {

    const tmpDir = tmp.dirSync({ prefix: 'fhir-spec' });
    let service: ISpecificationService;
    try {

        fs.createReadStream(filename)
            .pipe(unzipper.Extract({ path: tmpDir.name }));


        service = FromFiles(fs.readdirSync(tmpDir.name));

    } catch (err) {
        throw err;
    } finally {
        tmpDir.removeCallback();
    }
    return service;
}
// -------------------------------------------------------------------------------------------------
export function FromFiles(files: string[]): ISpecificationService {
    // TODO: Test files extension should be json

    let service: ISpecificationService;
    try {
        service = new SpecificationService(
            files.map(f => loadData(f))
        );

    } catch (ex) {
        throw ex;
    } finally {
        // @ts-ignore
        if ( !service ) {
            service = new SpecificationService([]);
        }
    }

    return service;
}
// -------------------------------------------------------------------------------------------------
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
// -------------------------------------------------------------------------------------------------