import { SpecificationService } from "../src/SpecificationService";
import * as path from 'path';
import { FromFiles } from "../src";


describe('SpecificationIterator', () => {

    test("should iterate though IStructureDefinition collection", () => {
        const service = FromFiles([
            path.join(__dirname, '../../../R4/definition/profiles-resources.json'),
        ]);

        const iter = service.ResourcesIterator();
        let i: number = 0;
        while (iter.hasNext()) {
            ++i;
            const definition = iter.next();
            expect(definition).toBeDefined();
        }

        expect(i).toBe(202);

    });


    test("should fail on invalid collection type", () => {

        //  expect(T.decode(value)._tag).toBe('Right');
    });

  
    test("should provide undefined on end reached", () => {

        const service = FromFiles([]);

        const iter = service.ResourcesIterator();
        expect(iter.next()).toBeUndefined();
    });





})

