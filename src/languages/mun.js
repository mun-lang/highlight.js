/*
Language: Mun
Author: Bas Zalmstra <zalmstra.bas@gmail.com>
Contributors: 
Website: https://mun-lang.org
Category: common, system
*/

function(hljs) {
    var NUM_SUFFIX = '([ui](8|16|32|64|128|size)|f(32|64)|uint|int|float)\?';
    var KEYWORDS =
        'pub break else false for fn if in self super return true ' +
        'while loop let mut pub never extern'
    var BUILTINS =
        // types
        'int float bool never ' +
        'i8 i16 i32 i64 i128 isize ' +
        'u8 u16 u32 u64 u128 usize ' +
        'f32 f64 '
    var NUMBERS = {
        className: 'number',
        variants: [
            { begin: '\\b0b([01_]+)' + NUM_SUFFIX },
            { begin: '\\b0o([0-7_]+)' + NUM_SUFFIX },
            { begin: '\\b0x([A-Fa-f0-9_]+)' + NUM_SUFFIX },
            {
                begin: '\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)' +
                    NUM_SUFFIX
            }
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
        aliases: ['rs'],
        keywords: {
            keyword:
                KEYWORDS,
            literal:
                'true false',
            built_in:
                BUILTINS
        },
        lexemes: hljs.IDENT_RE + '!?',
        illegal: '</',
        contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.COMMENT('/\\*', '\\*/', { contains: ['self'] }),
            hljs.inherit(hljs.QUOTE_STRING_MODE, { begin: /b?"/, illegal: null }),
            // {
            //     className: 'string',
            //     variants: [
            //         { begin: /r(#*)"(.|\n)*?"\1(?!#)/ },
            //         { begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/ }
            //     ]
            // },
            STRING,
            {
                className: 'symbol',
                begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
            },
            {
                className: 'number',
                variants: [
                    { begin: '\\b0b([01_]+)' + NUM_SUFFIX },
                    { begin: '\\b0o([0-7_]+)' + NUM_SUFFIX },
                    { begin: '\\b0x([A-Fa-f0-9_]+)' + NUM_SUFFIX },
                    {
                        begin: '\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)' +
                            NUM_SUFFIX
                    }
                ],
                relevance: 0
            },
            {
                className: 'function',
                beginKeywords: 'fn', end: '(\\(|<)', excludeEnd: true,
                contains: [hljs.UNDERSCORE_TITLE_MODE]
            },
            // {
            //     className: 'meta',
            //     begin: '#\\!?\\[', end: '\\]',
            //     contains: [
            //         {
            //             className: 'meta-string',
            //             begin: /"/, end: /"/
            //         }
            //     ]
            // },
            // {
            //     className: 'class',
            //     beginKeywords: 'type', end: ';',
            //     contains: [
            //         hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, { endsParent: true })
            //     ],
            //     illegal: '\\S'
            // },
            // {
            //     className: 'class',
            //     beginKeywords: 'trait enum struct union', end: '{',
            //     contains: [
            //         hljs.inherit(hljs.UNDERSCORE_TITLE_MODE, { endsParent: true })
            //     ],
            //     illegal: '[\\w\\d]'
            // },
            {
                begin: hljs.IDENT_RE + '::',
                keywords: { built_in: BUILTINS }
            },
            {
                begin: '->'
            }
        ]
    };
}
