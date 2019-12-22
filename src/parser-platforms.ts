import Utils from './utils';
import { PLATFORMS_MAP } from './constants';
import Parser from './parser';

interface IPlatform {
    type: string;
    vendor: string;
    model?: string;
}

/*
 * Tablets go first since usually they have more specific
 * signs to detect.
 */

export default [
  /* Googlebot */
    {
        test: [ /googlebot/i ],
        describe() {
            return {
                type: 'bot',
                vendor: 'Google'
            };
        }
    },

  /* Huawei */
    {
        test: [ /huawei/i ],
        describe(ua: string) {
            const model = Utils.getFirstMatch(/(can-l01)/i, ua) && 'Nova';
            const platform: IPlatform = {
                type: PLATFORMS_MAP.mobile,
                vendor: 'Huawei'
            };
            if (model) {
                platform.model = model;
            }
            return platform;
        }
    },

  /* Nexus Tablet */
    {
        test: [ /nexus\s*(?:7|8|9|10).*/i ],
        describe() {
            return {
                type: PLATFORMS_MAP.tablet,
                vendor: 'Nexus'
            };
        }
    },

  /* iPad */
    {
        test: [ /ipad/i ],
        describe() {
            return {
                type: PLATFORMS_MAP.tablet,
                vendor: 'Apple',
                model: 'iPad'
            };
        }
    },

  /* Amazon Kindle Fire */
    {
        test: [ /kftt build/i ],
        describe() {
            return {
                type: PLATFORMS_MAP.tablet,
                vendor: 'Amazon',
                model: 'Kindle Fire HD 7'
            };
        }
    },

  /* Another Amazon Tablet with Silk */
    {
        test: [ /silk/i ],
        describe() {
            return {
                type: PLATFORMS_MAP.tablet,
                vendor: 'Amazon'
            };
        }
    },

  /* Tablet */
    {
        test: [ /tablet(?! pc)/i ],
        describe() {
            return {
                type: PLATFORMS_MAP.tablet
            };
        }
    },

  /* iPod/iPhone */
    {
        test(parser: Parser) {
            const iDevice = parser.test(/ipod|iphone/i);
            const likeIDevice = parser.test(/like (ipod|iphone)/i);
            return iDevice && !likeIDevice;
        },
        describe(ua: string) {
            const model = Utils.getFirstMatch(/(ipod|iphone)/i, ua);
            return {
                type: PLATFORMS_MAP.mobile,
                vendor: 'Apple',
                model
            };
        }
    },

  /* Nexus Mobile */
    {
        test: [ /nexus\s*[0-6].*/i, /galaxy nexus/i ],
        describe() {
            return {
                type: PLATFORMS_MAP.mobile,
                vendor: 'Nexus'
            };
        }
    },

  /* Mobile */
    {
        test: [ /[^-]mobi/i ],
        describe() {
            return {
                type: PLATFORMS_MAP.mobile
            };
        }
    },

  /* BlackBerry */
    {
        test(parser: Parser) {
            return parser.getBrowserName(true) === 'blackberry';
        },
        describe() {
            return {
                type: PLATFORMS_MAP.mobile,
                vendor: 'BlackBerry'
            };
        }
    },

  /* Bada */
    {
        test(parser: Parser) {
            return parser.getBrowserName(true) === 'bada';
        },
        describe() {
            return {
                type: PLATFORMS_MAP.mobile
            };
        }
    },

  /* Windows Phone */
    {
        test(parser: Parser) {
            return parser.getBrowserName() === 'windows phone';
        },
        describe() {
            return {
                type: PLATFORMS_MAP.mobile,
                vendor: 'Microsoft'
            };
        }
    },

  /* Android Tablet */
    {
        test(parser: Parser) {
            const osMajorVersion = Number(String(parser.getOSVersion()).split('.')[0]);
            return parser.getOSName(true) === 'android' && (osMajorVersion >= 3);
        },
        describe() {
            return {
                type: PLATFORMS_MAP.tablet
            };
        }
    },

  /* Android Mobile */
    {
        test(parser: Parser) {
            return parser.getOSName(true) === 'android';
        },
        describe() {
            return {
                type: PLATFORMS_MAP.mobile
            };
        }
    },

  /* desktop */
    {
        test(parser: Parser) {
            return parser.getOSName(true) === 'macos';
        },
        describe() {
            return {
                type: PLATFORMS_MAP.desktop,
                vendor: 'Apple'
            };
        }
    },

  /* Windows */
    {
        test(parser: Parser) {
            return parser.getOSName(true) === 'windows';
        },
        describe() {
            return {
                type: PLATFORMS_MAP.desktop
            };
        }
    },

  /* Linux */
    {
        test(parser: Parser) {
            return parser.getOSName(true) === 'linux';
        },
        describe() {
            return {
                type: PLATFORMS_MAP.desktop
            };
        }
    },

  /* PlayStation 4 */
    {
        test(parser: Parser) {
            return parser.getOSName(true) === 'playstation 4';
        },
        describe() {
            return {
                type: PLATFORMS_MAP.tv
            };
        }
    },

  /* Roku */
    {
        test(parser: Parser) {
            return parser.getOSName(true) === 'roku';
        },
        describe() {
            return {
                type: PLATFORMS_MAP.tv
            };
        }
    }
];
