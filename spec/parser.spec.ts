
import Parser from '../src/parser';
import Bowser from '../src/bowser';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36 OPR/43.0.2442.1165';
const parser = new Parser(UA, true);

const EDGE_UA = 'Mozilla/5.0 (Linux; Android 8.0; Pixel XL Build/OPP3.170518.006) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.0 Mobile Safari/537.36 EdgA/41.1.35.1';
const edgeParser = new Parser(EDGE_UA, true);

const FOCUS_UA = 'Mozilla/5.0 (Linux; Android 7.1.1) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Focus/1.2.1 Chrome/59.0.3071.125';
const focusParser = new Parser(FOCUS_UA, true);

describe('Parser', () => {

    it('constructor', () => {
        expect(parser instanceof Parser).toBe(true);
    });

    it('Parser.getUA returns a correct UA', () => {
        expect(parser.getUA()).toBe(UA);
    });

    it('Parser.test', () => {
        expect(parser.test(/Chrome/i)).toBeTruthy();
    });

    it('Parser.parseBrowser is being called when the Parser.getBrowser() is called', () => {
        const spy: jasmine.Spy = spyOn(parser, 'parseBrowser').and.callThrough();
        const b = parser.getBrowser();
        expect(spy).toHaveBeenCalled();
        expect(b.name).toBe('Opera');
        expect(b.version).toBe('43.0.2442.1165');
    });

    it('Parser.getBrowserName returns a correct result', () => {
        expect(parser.getBrowserName()).toBe('Opera');
    });

    it('Parser.getBrowserVersion returns a correct result', () => {
        expect(parser.getBrowserVersion()).toBe('43.0.2442.1165');
    });

    it('Parser.parseOS is being called when getOS() called', () => {
        const spy: jasmine.Spy = spyOn(parser, 'parseOS').and.callThrough();
        parser.getOS();
        expect(spy).toHaveBeenCalled();
    });

    it('Parser.getOSName gives a name of the browser', () => {
        expect(parser.getOSName()).toBe('macOS');
    });

    it('Parser.getOSName gives a lower-cased name of the browser', () => {
        expect(parser.getOSName(true)).toBe('macos');
    });

    it('Parser.getOSVersion returns a correct result', () => {
        expect(parser.getOSVersion()).toBe('10.12.4');
    });

    it('Parser.parseEngine is being called when getEngine() called', () => {
        const spy: jasmine.Spy = spyOn(parser, 'parseEngine').and.callThrough();
        parser.getEngine();
        expect(spy).toHaveBeenCalled();
    });

    it('Parser.getEngineName gives a name of the engine', () => {
        expect(parser.getEngineName()).toBe('Blink');
    });

    it('Parser.getEngineName gives a lower-cased name of the engine', () => {
        expect(parser.getEngineName(true)).toBe('blink');
    });

    it('Skip parsing shouldn\'t parse', () => {
        expect(new Parser(UA, true).getResult()).toEqual({});
    });

    it('Parser.satisfies should make simple comparisons', () => {
        // also covers Parser.compareVersion() method
        expect(parser.satisfies({ opera: '>42' })).toBe(true);
        expect(parser.satisfies({ opera: '<44' })).toBe(true);
        expect(parser.satisfies({ opera: '=43.0.2442.1165' })).toBe(true);
        expect(parser.satisfies({ opera: '~43.0' })).toBe(true);
        expect(parser.satisfies({ opera: '>=43' })).toBe(true);
        expect(parser.satisfies({ opera: '<=43' })).toBe(true);
        expect(parser.satisfies({ opera: '>=43.0' })).toBe(true);
        expect(parser.satisfies({ opera: '>=43.0.2442.1165' })).toBe(true);
        expect(parser.satisfies({ opera: '<=43.0.2442.1165' })).toBe(true);
        expect(parser.satisfies({ opera: '>=43.0.2443' })).toBe(false);
        expect(parser.satisfies({ opera: '<=43.0.2443' })).toBe(true);
        expect(parser.satisfies({ opera: '>=43.0.2441' })).toBe(true);
        expect(parser.satisfies({ opera: '~43' })).toBe(true);
    });

    it('Parser.satisfies should make complex comparison', () => {
        expect(parser.satisfies({
            macos: {
                safari: '>11'
            },
            ios: {
                safari: '>10'
            },
            opera: '>42'
        })).toBe(true);
    });

    it('Parser.satisfies should respect platform and OS specific declarations', () => {
        expect(parser.satisfies({
            macos: {
                opera: '>45'
            },
            opera: '>42'
        })).toBe(false);

        expect(parser.satisfies({
            desktop: {
                opera: '>45'
            },
            opera: '>42'
        })).toBe(false);

        expect(parser.satisfies({
            macos: {
                opera: '>45'
            },
            desktop: {
                opera: '>42'
            },
            opera: '>42'
        })).toBe(false);

        expect(parser.satisfies({
            macos: {
                chrome: '>45'
            },
            desktop: {
                chrome: '>42'
            },
            firefox: '>42'
        })).toBe(void 0);
    });

    it('Parser.satisfies for versionless UA strings', () => {
        const _parser = new Parser('Mozilla/5.0 (iPhone; CPU iPhone OS 11_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15G77 [FBAN/FBIOS;FBDV/iPhone7,2;FBMD/iPhone;FBSN/iOS;FBSV/11.4.1;FBSS/2;FBCR/vfnl;FBID/phone;FBLC/nl_NL;FBOP/5;FBRV/0]');

        expect(_parser.satisfies({
            safari: '>9'
        })).toBe(void 0);
    });

    it('Parser.satisfies should consider aliases while handling browsers', () => {
        expect(edgeParser.satisfies({ 'Microsoft Edge': '=41.1.35.1' })).toBe(true);
        expect(edgeParser.satisfies({ 'microsoft edge': '=41.1.35.1' })).toBe(true);
        expect(edgeParser.satisfies({ 'edge': '=41.1.35.1' })).toBe(true);
        expect(edgeParser.satisfies({ 'Edge': '=41.1.35.1' })).toBe(true);
    });

    it('Parser.is should pass', () => {
        expect(parser.is('opera')).toBe(true);
        expect(parser.is('desktop')).toBe(true);
        expect(parser.is('macos')).toBe(true);
    });

    it('Parser.is using constants should pass', () => {
        expect(parser.is(Bowser.BROWSER_MAP.opera)).toBe(true);
        expect(parser.is(Bowser.PLATFORMS_MAP.desktop)).toBe(true);
        expect(parser.is(Bowser.OS_MAP.MacOS)).toBe(true);
    });

    it('Parser.some should pass', () => {
        expect(parser.some([
            'opera',
            'chrome',
            'firefox'
        ])).toBe(true);
        expect(parser.some([ 'macos', 'windows' ])).toBe(true);
        expect(parser.some([ 'chrome', 'firefox' ])).toBe(false);
        expect(parser.some([])).toBe(false);
        expect(parser.some()).toBe(false);
    });

    it('Parser.isBrowser should pass when not loosely checking', () => {
        expect(edgeParser.isBrowser('Microsoft Edge', false)).toBe(true);
        expect(edgeParser.isBrowser('microsoft edge', false)).toBe(true);
        expect(edgeParser.isBrowser('mIcrosoft eDge', false)).toBe(true);
        expect(edgeParser.isBrowser('edge', false)).toBe(false);
        expect(edgeParser.isBrowser('Edge', false)).toBe(false);
    });

    it('Parser.isBrowser should pass when loosely checking', () => {
        expect(edgeParser.isBrowser('Microsoft Edge', true)).toBe(true);
        expect(edgeParser.isBrowser('microsoft edge', true)).toBe(true);
        expect(edgeParser.isBrowser('mIcrosoft eDge', true)).toBe(true);
        expect(edgeParser.isBrowser('edge', true)).toBe(true);
        expect(edgeParser.isBrowser('Edge', true)).toBe(true);
    });

    it('Parser.isBrowser should pass for non-aliased browsers', () => {
        expect(focusParser.isBrowser('Focus', true)).toBe(true);
        expect(focusParser.isBrowser('Focus', false)).toBe(true);
    });
});
