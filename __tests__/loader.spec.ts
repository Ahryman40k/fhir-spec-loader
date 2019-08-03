

import * as path from 'path';
import { FromFiles } from '../src/loader';

describe('Loaders', () => {
    describe('Loading from files', () => {

        test("should provide a specification service", () => {
            const service = FromFiles([
                path.join(__dirname, '../../../R4/definition/profiles-resources.json'),
            ]);
            expect(service).toBeDefined();
            // @ts-ignore
            expect(service['_rawSpec'].length).toBe(1);
        });

        test("should provide empty service if no files", () => {
            const service = FromFiles([]);
            expect(service).toBeDefined();
            // @ts-ignore
            expect(service['_rawSpec'].length).toBe(0);
        });
    })
/*
    describe('Loading from archive', () => {

        test("should provide a specification service", () => {

            return FromArchive(path.join(__dirname, '../../../R4/r4-spec.zip'))
                .then(service => {
                    expect(service).toBeDefined();
                    // @ts-ignore
                    expect(service['_rawSpec'].length).toBeGreaterThan(0);
                })
        }, 100000);

        test("should fail if archive isn't zip file", () => {

            return FromArchive(path.join(__dirname, 'loader.spec.ts'))
                .then(service => {
                    expect(true).toBe(false);
                }).catch(err => {
                    expect(err).toMatchSnapshot();
                    expect(err).toBeDefined();
                });
        });

    })
*/
/*
    describe('Loading from website', () => {

        test("should provide a specification service", () => {

            return FromWebsite(StructureDefinitionFhirVersionKind._400).then(service => {
                expect(service).toBeDefined();
                // @ts-ignore
                expect(service['_rawSpec'].length).toBe(0);
            })
        }, 100000);


        test("should fail if version is different from R4", () => {

            return FromWebsite(StructureDefinitionFhirVersionKind._350).then(service => {
                expect(true).toBe(false);
            }).catch(err => {
                expect(err).toMatchSnapshot();
                expect(err).toBeDefined();
            })
        });
    })
    */
})