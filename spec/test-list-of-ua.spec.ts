import yaml = require('yamljs');
import * as path from 'path';
import Bowser from '../src/bowser';

const listOfUA = yaml.load(path.join(__dirname, './support/useragentStrings.yml'));

const browserNames = Object.keys(listOfUA);

browserNames.forEach((browserName) => {
    describe(browserName, () => {
        listOfUA[browserName].forEach((browser: any, index: number) => {
            it(`Test ${browserName} ${index}`, () => {
                const parsed = Bowser.parse(browser.ua);
                expect(parsed).withContext(browser.ua).toEqual(browser.spec);
                expect(parsed.browser.name).withContext(browser.ua).toBe(browserName);
            });
        });
    });
});
