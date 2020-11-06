import PHFile from "./PHFile";
import PHFileSubstring from "./PHFileSubstring";


/**
 * Parses a file into a form of type T for the purpose of identifying similar substrings.
 * 
 * A procedure for parsing file contents into a form of type T more conducive
 * for finding abstract similarities between files. For example, a T==string-type parser
 * could turn every token into the letter “x” and leave operators such as brackets
 * untouched. A parser must have an “unparse” operation capable of identifying zero or
 * more substrings of an unparsed file that will parse into a given string. The parser
 * is also capable of idenifying similarities in the resultant parsing of two files.
 */
export default interface IParser<T> {

    /**
     * Parses a file.
     * 
     * @param file A file in a program, the content of which is guaranteed to be a string.
     * @returns A parsed version of the file in a form conducive to identifying similarities.
     */
    parse(file: PHFile): T

    /**
     * Finds substrings in the file that parse down to the given parseFeature.
     * 
     * @param parseFeature A similarity identified between the parsed contents of one or more files.
     * @param file A file in a program, the content of which is guaranteed to be a string.
     * @throws TypeError if PHFile's parsed contents are not of type T or if they are undefined.
     * @returns 
     */
    unparse(parseFeature: T, file: PHFile): PHFileSubstring[]

    /**
     * Finds shared parse features between two files.
     * 
     * @param f1 
     * @param f2 
     */
    findParsedMatches(f1: PHFile, f2: PHFile): T[]

}