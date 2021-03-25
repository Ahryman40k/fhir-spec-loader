import { ISpecificationService } from './interfaces/ISpecificationService';
import fs from 'fs';
import tmp from 'tmp';
import path from 'path';
import unzipper from 'unzipper';
import download from 'download';

// import { PathReporter } from 'io-ts/lib/PathReporter'
import { FhirSpecificationServiceFactory } from './SpecificationService';

import { Observable, from, of, forkJoin } from 'rxjs';
import { switchMap, tap, mergeMap, map } from 'rxjs/operators';
import { BundleLike } from './interfaces';


// -------------------------------------------------------------------------------------------------
export enum ArchiveKind {
    Zip = 'zip'
}
// -------------------------------------------------------------------------------------------------
export type LoaderOptions = {
    format: ArchiveKind
}
// -------------------------------------------------------------------------------------------------


export type FhirVersion = 'last' |'4.5.0' | '4.4.0' | '4.2.0' | '4.1.0' | '4.0.1' | '4.0.0' | '3.5.0'


function decodeBundle(raw: string): BundleLike {

    // let validation = R4.RTTI_Bundle.decode(JSON.parse(raw));
    // if (validation.isLeft()) {
    //    throw new Error(/*PathReporter.report(validation).join('/n')*/);
    // }
    //return <R4.IBundle>validation.value;

    return JSON.parse(raw);
}



// -------------------------------------------------------------------------------------------------

export default abstract class FhirSpecificationLoaderStatic { 
    static FromFiles(files: string[]): ISpecificationService {
        // TODO: Test files extension should be json
        try {
            const bundles = files.map(f => fs.readFileSync(f)).map(b => decodeBundle(b.toString()));
            return FhirSpecificationServiceFactory.SpecificationService(bundles);

        } catch (ex) {
            throw ex;
        }
    }

    static FromArchive(filename: string, option: LoaderOptions = { format: ArchiveKind.Zip }): Observable<ISpecificationService> {

        try {
            return from(unzipper.Open.file(filename)).pipe(
                switchMap(directory => of(directory.files.filter(f => path.extname(f.path) === '.json'))),
                // tap(files => console.log(files)),
                mergeMap(files => forkJoin(...files.map(f => f.buffer()))),
                map((buffers: Buffer[]) => buffers.map((b: Buffer) => decodeBundle(b.toString()) )),
                map(bundles => FhirSpecificationServiceFactory.SpecificationService(bundles))
            )
        } catch (err) {
            throw err;
        }

    }

    static FromWebsite(version: FhirVersion): Observable<ISpecificationService> {

        // Create temporary name
        const tmpFile = tmp.fileSync({ prefix: 'fhir-spec', postfix: '.zip' });

        try {
            // Download spec archive and save it with temporary name        
            return from ( download('http://build.fhir.org/definitions.json.zip') ).pipe(
                tap( data => fs.writeFileSync(tmpFile.name, data) ),
                switchMap( data => FhirSpecificationLoaderStatic.FromArchive(tmpFile.name) )
            )
        }
        catch (err) {
            throw err;
        } finally {
            fs.unlink(tmpFile.name, (err) => {
                console.error('cheat');
            });
        }
    }

}
