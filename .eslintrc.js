module.exports = {
  'parser': 'babel-eslint',
  'extends': ['eslint:recommended'],
  'env': {
    'browser': true,
    'node': true,
    'es6': true,
    'jquery': true,
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
  },
  'globals': {
    '__DEV__': true
  },
  'rules': {
    'no-console': 0,
    'max-len': ['error', {
      'code': 120,
      'ignoreUrls': true,
      'ignoreTemplateLiterals': true,
      'ignoreRegExpLiterals': true,
    }],

    'guard-for-in': 2,
    'no-plusplus': 0,
    'no-caller': 2,
    'no-extend-native': 2,
    'no-new-wrappers': 2,
    'semi': 2,

    'array-bracket-spacing': [2, 'never'],
    'block-spacing': [2, 'never'],
    'brace-style': 2,
    'comma-dangle': [2, 'never'],
    'comma-spacing': 2,
    'comma-style': 2,
    'computed-property-spacing': 2,
    'eol-last': 2,
    'func-call-spacing': 2,
    "indent": [2, 2],
    'key-spacing': 2,
    'keyword-spacing': 2,
    'new-cap': 2,
    'no-array-constructor': 2,
    'no-multiple-empty-lines': [2, {
      'max': 2
    }],
    'no-multi-spaces': 2,
    'no-multi-str': 2,
    'no-new-object': 2,
    'no-tabs': 2,
    'no-trailing-spaces': 2,
    'operator-linebreak': 2,
    'quotes': [2, 'single'],
    'semi-spacing': 2,
    'space-before-blocks': 2,
    'multiline-comment-style': [2, 'starred-block'],
    'space-before-function-paren': [2, {
      'anonymous': 'never',
      'named': 'never',
    }],
    'spaced-comment': [2, 'always'],
    'switch-colon-spacing': 2,

    // ES6.
    'generator-star-spacing': [2, 'after'],
    'no-var': 2,
    'prefer-rest-params': 2,
    'prefer-spread': 2,
    'rest-spread-spacing': 2,
    'yield-star-spacing': [2, 'after'],
  }
}
