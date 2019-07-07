import { R4 } from '@ahryman40k/ts-fhir-types';
import { ISpecificationService } from './interfaces/ISpecificationService';
import * as fs from 'fs';
import * as http from 'http';
import * as tmp from 'tmp';
import * as unzipper from 'unzipper';

import { PathReporter } from 'io-ts/lib/PathReporter'
import { SpecificationService } from './SpecificationService';

export enum ArchiveKind {
    Zip = 'zip'
}

export type LoaderOptions = {
    format: ArchiveKind
}

function loadData(file: string): R4.IBundle {
    const raw = fs.readFileSync(file);

    let validation = R4.RTTI_Bundle.decode(JSON.parse(raw.toString()));
    if (validation.isLeft) {
        throw new Error(PathReporter.report(validation).join('/n'));
    }

    return <R4.IBundle>validation.value;
}

export class Loader {
    /* 
    * Extract files into temporary folder then call FromFiles()
    */
    static async FromArchive(filename: string, option: LoaderOptions = { format: ArchiveKind.Zip }): Promise<ISpecificationService> {

        const tmpDir = tmp.dirSync({ prefix: 'fhir-spec' });
        fs.createReadStream(filename)
            .pipe(unzipper.Extract({ path: tmpDir.name }));

        return this.FromFiles( fs.readdirSync(tmpDir.name ) );
    }

    static FromFiles(files: string[]): ISpecificationService {
        // TODO: Test files extension should be json
        try {
            return new SpecificationService(
                files.map(f => loadData(f))
            );

        } catch (ex) {
            throw ex;
        } finally {
            return new SpecificationService([]);
        }
    }

    static async FromWebsite(version: R4.StructureDefinitionFhirVersionKind): Promise<ISpecificationService> {
        if (version != R4.StructureDefinitionFhirVersionKind._400) {
            throw new Error('Required FHIR version is not supported by Loader class');
        }

        // Create temporary name
        const tmpFile = tmp.fileSync({ prefix: 'fhir-spec', postfix: '.zip' });
        const downloaded = fs.createWriteStream(tmpFile.name)

        // Download spec archive and save it with temparoray name
        await http.get("https://www.hl7.org/fhir/definitions.json.zip", response => {
            response.pipe(downloaded);
        });

        // Unzip archive
        return Loader.FromArchive(tmpFile.name);
    }
}