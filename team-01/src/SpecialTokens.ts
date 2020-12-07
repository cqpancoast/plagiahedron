import CharSpecialToken from "./model/CharSpecialToken";
import CommentSpecialToken from "./model/CommentSpecialToken";
import ISpecialToken from "./model/ISpecialToken";

export default class SpecialTokens {
    static emptyLang: ISpecialToken[] = []  // no parsing done on the empty language
    static javaNoComments: ISpecialToken[] = 
        [...["\n", " ", ",", "(", ")", "{", "}", "[", "]", "+", "-", "/", "*", "=", "\\", "."]
                    .map(char => new CharSpecialToken(char))]
    static javaBasic: ISpecialToken[] = 
        [...["\n", " ", ",", "(", ")", "{", "}", "[", "]", "+", "-", "/", "*", "=", "\\", "."]
                    .map(char => new CharSpecialToken(char)),
                new CommentSpecialToken("//", "\n"),
                new CommentSpecialToken("/*", "*/")]
    static javaMCTokens: ISpecialToken[] =  // multi-character tokens. We only include the most common
        [...["\n", " ", ",", "(", ")", "{", "}", "[", "]", "+", "-", "/", "*", "=", "\\", ".",
             "class", "if", "private", "this", "int", "boolean", "float", "public", "else", "super",
             "throws", "new", "void", "try", "catch", "interface", "while", "return", "implements"]
                    .map(char => new CharSpecialToken(char)),
                new CommentSpecialToken("//", "\n"),
                new CommentSpecialToken("/*", "*/")]


    static typescriptBasic: ISpecialToken[] =  // multi-character tokens. We only include the most common
        [...["\n", " ", ",", "(", ")", "{", "}", "[", "]", "+", "-", "/", "*", "=", "\\", ".",
             "class", "if", "private", "this", "int", "boolean", "float", "public", "else", "super",
             "throws", "new", "void", "try", "catch", "interface", "while", "return", "implements", "let",
            "const", "var"]
                    .map(char => new CharSpecialToken(char)),
                new CommentSpecialToken("//", "\n"),
                new CommentSpecialToken("/*", "*/")]
}