
import { BROWSER_ALIASES_MAP } from '../src/constants';

describe('constants', () => {
    it('check duplicate aliases', () => {
        const aliasesList = Object.keys(BROWSER_ALIASES_MAP).map(value => (BROWSER_ALIASES_MAP[value]));
        let foundOnce, foundTwice;
    
        const duplicates = aliasesList.filter(item => {
            foundOnce = aliasesList.indexOf(item);
            foundTwice = aliasesList.indexOf(item, foundOnce + 1);
            return +foundTwice !== -1;
        });
    
        expect(duplicates).toEqual([]);
    });
});
