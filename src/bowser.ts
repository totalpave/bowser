/*!
 * Bowser - a browser detector
 * https://github.com/lancedikson/bowser
 * MIT License | (c) Dustin Diaz 2012-2015
 * MIT License | (c) Denis Demchenko 2015-2019
 * MIT LICENSE | (c) Total Pave Inc 2020+
 */
import Parser from './parser';
import {
    BROWSER_MAP,
    ENGINE_MAP,
    OS_MAP,
    PLATFORMS_MAP
} from './constants';

/**
 * Bowser class.
 * Keep it simple as much as it can be.
 * It's supposed to work with collections of {@link Parser} instances
 * rather then solve one-instance problems.
 * All the one-instance stuff is located in Parser class.
 *
 * @class
 * @classdesc Bowser is a static object, that provides an API to the Parsers
 * @hideconstructor
 */
class Bowser {

    private constructor() {}

  /**
   * Creates a {@link Parser} instance
   *
   * @param {String} UA UserAgent string
   * @param {Boolean} [skipParsing=false] Will make the Parser postpone parsing until you ask it
   * explicitly. Same as `skipParsing` for {@link Parser}.
   * @returns {Parser}
   * @throws {Error} when UA is not a String
   *
   * @example
   * const parser = Bowser.getParser(window.navigator.userAgent);
   * const result = parser.getResult();
   */
    public static getParser(UA: string, skipParsing: boolean = false): Parser {
        if (typeof UA !== 'string') {
            throw new Error('UserAgent should be a string');
        }
        return new Parser(UA, skipParsing);
    }

  /**
   * Creates a {@link Parser} instance and runs {@link Parser.getResult} immediately
   *
   * @param UA
   * @return {ParsedResult}
   *
   * @example
   * const result = Bowser.parse(window.navigator.userAgent);
   */
    public static parse(UA: string): any {
        return (new Parser(UA)).getResult();
    }

  public static BROWSER_MAP: any = BROWSER_MAP;
  public static ENGINE_MAP: any = ENGINE_MAP;
  public static OS_MAP: any = OS_MAP;
  public static PLATFORMS_MAP: any = PLATFORMS_MAP;
}

export default Bowser;
