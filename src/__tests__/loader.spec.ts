
import { Loader } from '..';

describe('Loading from files', () => {

    test("should provide a specification service", () => {
        Loader.FromFiles([])
    });

    test("should provide empty service if no files", () => {
        const service = Loader.FromFiles([]);
        const iter = service.ResourcesIterator();
        expect(iter.hasNext()).toBeFalsy();
    });



})

describe('Loading from archive', () => {

    test("should provide a specification service", () => {

        //  expect(T.decode(value)._tag).toBe('Right');
    });

    test("should fail if archive isn't zip file", () => {

        //  expect(T.decode(value)._tag).toBe('Right');
    });

})

describe('Loading from website', () => {

    test("should provide a specification service", () => {

        //  expect(T.decode(value)._tag).toBe('Right');
    });


    test("should fail on wrong url", () => {

        //  expect(T.decode(value)._tag).toBe('Right');
    });
})
