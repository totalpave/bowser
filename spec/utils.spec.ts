
import Utils from '../src/utils';

describe('Utils', () => {
    it('getFirstMatch', () => {
        const matchedVersion = Utils.getFirstMatch(/version\/(\S+)/i, 'Chrome Version/11.11.11');
        expect(matchedVersion).toBe('11.11.11');
    });

    it('getWindowsVersionName', () => {
        expect(Utils.getWindowsVersionName('NT 5.0')).toBe('2000');
        expect(Utils.getWindowsVersionName('XXX')).toBe(void 0);
    });

    it('getMacOSVersionName', () => {
        expect(Utils.getMacOSVersionName('10.14.5')).toBe('Mojave');
        expect(Utils.getMacOSVersionName('10.15')).toBe('Catalina');
        expect(Utils.getMacOSVersionName('10.999999')).toBe(void 0);
        expect(Utils.getMacOSVersionName('XXX')).toBe(void 0);
    });

    it('getAndroidVersionName', () => {
        expect(Utils.getAndroidVersionName('1.0')).toBe(void 0);
        expect(Utils.getAndroidVersionName('8.0')).toBe('Oreo');
        expect(Utils.getAndroidVersionName('9')).toBe('Pie');
        expect(Utils.getAndroidVersionName('XXX')).toBe(void 0);
    });

    it('compareVersions', () => {
        const comparisionsTasks = [
            [
                '9.0',
                '10',
                -1
            ],
            [
                '11',
                '10',
                1
            ],
            [
                '1.10.2.1',
                '1.8.2.1.90',
                1
            ],
            [
                '1.010.2.1',
                '1.08.2.1.90',
                1
            ],
            [
                '1.10.2.1',
                '1.10.2.1',
                0
            ],
            [
                '1.10.2.1',
                '1.10.2',
                0,
                true
            ],
            [
                '1.10.2.1',
                '1.10',
                0,
                true
            ],
            [
                '1.10.2.1',
                '1',
                0,
                true
            ],
            [
                '1.10.2.1',
                '1.0800.2',
                -1
            ],
            [
                '1.0.0-alpha',
                '1.0.0-alpha.1',
                -1
            ],
            [
                '1.0.0-alpha.1',
                '1.0.0-alpha.beta',
                -1
            ],
            [
                '1.0.0-alpha.beta',
                '1.0.0-beta',
                -1
            ],
            [
                '1.0.0-beta',
                '1.0.0-beta.2',
                -1
            ],
            [
                '1.0.0-beta.11',
                '1.0.0-rc.1',
                -1
            ],
            [
                '1.0.0-rc.1',
                '1.0.0',
                -1
            ]
        ];

        comparisionsTasks.forEach((testingParams) => {
            const versionA: string = <string>testingParams[0];
            const versionB: string = <string>testingParams[1];
            const result: number = <number>testingParams[2];
            const isLoose: boolean = testingParams.length > 3 ? <boolean>testingParams[3] : false;
            let matching: string = isLoose ? '~' : ' == ';

            if (result > 0) {
                matching = ' > ';
            }
            else if (result < 0) {
                matching = ' < ';
            }

            expect(Utils.compareVersions(versionA, versionB, isLoose)).withContext(`version ${versionA} should be ${matching} version ${versionB}`).toBe(result);
        });
    });

    it('getBrowserAlias', () => {
        expect(Utils.getBrowserAlias('Microsoft Edge')).toBe('edge');
        expect(Utils.getBrowserAlias('Unexisting Browser')).toBe(void 0);
    });
});
