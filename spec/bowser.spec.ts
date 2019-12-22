
import Bowser from '../src/bowser';
import Parser from '../src/parser';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165';
const browser = Bowser.getParser(UA);

describe('bowser', () => {
    it('Bowser`s constructor returns a Parser instance', () => {
        expect(browser instanceof Parser).toBe(true);
    });

    it('Bowser`s constructor fails if UA is empty', () => {
        expect(() => {
            Bowser.getParser(null);
        }).toThrow();
    });

    it('Bowser.parse parses UA and returns result', () => {
        // This test is flawed, because it is testing execution of Browser.parse against itself.
        // At principle, this is the equivilant of doing expect(true).toBe(true)
        // We should be testing Bowser.parse against a hard-coded expectation
        expect(Bowser.parse(UA)).toEqual(browser.getResult());
    });
});
