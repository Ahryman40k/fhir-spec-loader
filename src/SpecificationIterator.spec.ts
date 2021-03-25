import path from 'path';
import SpecLoader from "./loader";


describe('SpecificationIterator', () => {

    test("should iterate though IStructureDefinition collection", () => {
        const service = SpecLoader.FromFiles([
            path.join(__dirname, '../FHIR_specs/R4/last/profiles-resources.json'),
        ]);

        const iter = service.resourcesIterator();
        let i: number = 0;
        while (iter.hasNext()) {
            ++i;
            const definition = iter.next();
            expect(definition).toBeDefined();
        }

        expect(i).toBe(152);

    });
/*
    test("should iterate with predicate", () => {
        const service = SpecLoader.FromFiles([
            path.join(__dirname, '../FHIR_specs/R4/last/profiles-resources.json'),,
        ]);

        const iter = service.resourcesIterator( item => {
            return item ? item!.id!.includes('Appointment') : false 
        });
        let i: number = 0;
        while (iter.hasNext()) {
            ++i;
            const definition = iter.next();
            expect(definition).toBeDefined();
        }

        expect(i).toBe(2);

    });*/

  
    test("should return false on end reached", () => {

        const service = SpecLoader.FromFiles([]);

        const iter = service.resourcesIterator();
        
        expect(iter.hasNext()).toBeFalsy();
    });





})

