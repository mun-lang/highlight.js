/*
Language: Mun
Author: Bas Zalmstra <zalmstra.bas@gmail.com>
Contributors: 
Website: https://mun-lang.org
Category: common, system
*/

function(hljs) {
    var BUILTINS = 
        // types
        'int float bool never';

    var KEYWORDS = {
        keyword: 'break else false for fn if in null self super return true while loop ' +
                  'let mut pub never ',
        literal: 'true false null',
        built_in: BUILTINS
    }
        ;
    var NUMBERS = {
        className: 'number',
        variants: [
            //{ begin: '\\b0b([01_]+)' + NUM_SUFFIX },
            //{ begin: '\\b0o([0-7_]+)' + NUM_SUFFIX },
            { begin: '\\b0x([A-Fa-f0-9_]+)' },
            { begin: '\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)' }
        ],
        relevance: 0
    };
    var STRING = {
        variants: [
            // INTERPOLATED_VERBATIM_STRING,
            // INTERPOLATED_STRING,
            // VERBATIM_STRING,
            // hljs.APOS_STRING_MODE,
            hljs.QUOTE_STRING_MODE
        ]
    };
    return {
        keywords: KEYWORDS,
        contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            hljs.QUOTE_STRING_MODE,
            STRING,
            NUMBERS,
            {
                className: 'symbol',
                begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
            },
            {
                className: 'function',
                beginKeywords: 'fn', end: /\s*[{;=]/, excludeEnd: true,
                contains: [
                    {
                        begin: hljs.IDENT_RE + '\\s*\\(', returnBegin: true,
                        contains: [hljs.UNDERSCORE_TITLE_MODE],
                        relevance: 0
                    },
                    {
                        className: 'params',
                        begin: /\(/, end: /\)/,
                        excludeBegin: true,
                        excludeEnd: true,
                        keywords: KEYWORDS,
                        relevance: 0,
                        contains: [
                            STRING,
                            NUMBERS,
                            hljs.C_BLOCK_COMMENT_MODE
                        ]
                    },
                    {
                        className: 'return',
                        begin: /:/, end: /[{;]/,
                        excludeEnd: true,
                        keywords: KEYWORDS,
                        relevance: 0,
                        contains: [
                            hljs.C_BLOCK_COMMENT_MODE
                        ]
                    },
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE
                ]
            },
            {
                begin: hljs.IDENT_RE + '::',
                keywords: { built_in: BUILTINS }
            },
        ]

    }
}
