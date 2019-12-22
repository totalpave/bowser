/**
 * Browsers' descriptors
 *
 * The idea of descriptors is simple. You should know about them two simple things:
 * 1. Every descriptor has a method or property called `test` and a `describe` method.
 * 2. Order of descriptors is important.
 *
 * More details:
 * 1. Method or property `test` serves as a way to detect whether the UA string
 * matches some certain browser or not. The `describe` method helps to make a result
 * object with params that show some browser-specific things: name, version, etc.
 * 2. Order of descriptors is important because a Parser goes through them one by one
 * in course. For example, if you insert Chrome's descriptor as the first one,
 * more then a half of browsers will be described as Chrome, because they will pass
 * the Chrome descriptor's test.
 *
 * Descriptor's `test` could be a property with an array of RegExps, where every RegExp
 * will be applied to a UA string to test it whether it matches or not.
 * If a descriptor has two or more regexps in the `test` array it tests them one by one
 * with a logical sum operation. Parser stops if it has found any RegExp that matches the UA.
 *
 * Or `test` could be a method. In that case it gets a Parser instance and should
 * return true/false to get the Parser know if this browser descriptor matches the UA or not.
 */

import Parser from './parser';
import Utils from './utils';

interface IBrowser {
    name: string;
    version?: string;
}

const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;

const browsersList = [
  /* Googlebot */
    {
        test: [ /googlebot/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Googlebot'
            };
            const version = Utils.getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },

  /* Opera < 13.0 */
    {
        test: [ /opera/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Opera'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },

  /* Opera > 13.0 */
    {
        test: [ /opr\/|opios/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Opera'
            };
            const version = Utils.getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /SamsungBrowser/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Samsung Internet for Android'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /Whale/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'NAVER Whale Browser'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /MZBrowser/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'MZ Browser'
            };
            const version = Utils.getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /focus/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Focus'
            };
            const version = Utils.getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /swing/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Swing'
            };
            const version = Utils.getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /coast/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Opera Coast'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /yabrowser/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Yandex Browser'
            };
            const version = Utils.getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /ucbrowser/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'UC Browser'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /Maxthon|mxios/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Maxthon'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /epiphany/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Epiphany'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /puffin/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Puffin'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /sleipnir/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Sleipnir'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /k-meleon/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'K-Meleon'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /micromessenger/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'WeChat'
            };
            const version = Utils.getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /qqbrowser/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: (/qqbrowserlite/i).test(ua) ? 'QQ Browser Lite' : 'QQ Browser'
            };
            const version = Utils.getFirstMatch(/(?:qqbrowserlite|qqbrowser)[/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /msie|trident/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Internet Explorer'
            };
            const version = Utils.getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /\sedg\//i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Microsoft Edge'
            };

            const version = Utils.getFirstMatch(/\sedg\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /edg([ea]|ios)/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Microsoft Edge'
            };

            const version = Utils.getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /vivaldi/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Vivaldi'
            };
            const version = Utils.getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /seamonkey/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'SeaMonkey'
            };
            const version = Utils.getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /sailfish/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Sailfish'
            };

            const version = Utils.getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /silk/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Amazon Silk'
            };
            const version = Utils.getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /phantom/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'PhantomJS'
            };
            const version = Utils.getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /slimerjs/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'SlimerJS'
            };
            const version = Utils.getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /blackberry|\bbb\d+/i, /rim\stablet/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'BlackBerry'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /(web|hpw)[o0]s/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'WebOS Browser'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua) || Utils.getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /bada/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Bada'
            };
            const version = Utils.getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /tizen/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Tizen'
            };
            const version = Utils.getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /qupzilla/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'QupZilla'
            };
            const version = Utils.getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /firefox|iceweasel|fxios/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Firefox'
            };
            const version = Utils.getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /chromium/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Chromium'
            };
            const version = Utils.getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) || Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /chrome|crios|crmo/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Chrome'
            };
            const version = Utils.getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },
    {
        test: [ /GSA/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Google Search'
            };
            const version = Utils.getFirstMatch(/(?:GSA)\/(\d+(\.?_?\d+)+)/i, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },

  /* Android Browser */
    {
        test(parser: Parser) {
            const notLikeAndroid = !parser.test(/like android/i);
            const butAndroid = parser.test(/android/i);
            return notLikeAndroid && butAndroid;
        },
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Android Browser'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },

  /* PlayStation 4 */
    {
        test: [ /playstation 4/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'PlayStation 4'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },

  /* Safari */
    {
        test: [ /safari|applewebkit/i ],
        describe(ua: string) {
            const browser: IBrowser = {
                name: 'Safari'
            };
            const version = Utils.getFirstMatch(commonVersionIdentifier, ua);

            if (version) {
                browser.version = version;
            }

            return browser;
        }
    },

  /* Something else */
    {
        test: [ /.*/i ],
        describe(ua: string) {
      /* Here we try to make sure that there are explicit details about the device
       * in order to decide what regexp exactly we want to apply
       * (as there is a specific decision based on that conclusion)
       */
            const regexpWithoutDeviceSpec = /^(.*)\/(.*) /;
            const regexpWithDeviceSpec = /^(.*)\/(.*)[ \t]\((.*)/;
            const hasDeviceSpec = ua.search('\\(') !== -1;
            const regexp = hasDeviceSpec ? regexpWithDeviceSpec : regexpWithoutDeviceSpec;
            return {
                name: Utils.getFirstMatch(regexp, ua),
                version: Utils.getSecondMatch(regexp, ua)
            };
        }
    }
];

export default browsersList;
