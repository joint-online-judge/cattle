module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  'rules': {
    'no-console': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/no-autofocus': 0,
    'no-param-reassign': 0,
    'react/jsx-props-no-spreading': 0,
    'import/no-named-as-default': 0,
    'no-nested-ternary': 1,
    'no-else-return': 0,
    'arrow-body-style': 0,
    '@typescript-eslint/lines-between-class-members': 0,
    'react/prop-types': 'off',
    'react/destructuring-assignment': 0,
    'react/button-has-type': 0,
    'no-plusplus': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/jsx-indent': [
      2,
      2,
      {
        'checkAttributes': false
      }
    ],
    'react/jsx-indent-props': [2, 2],
    'react-hooks/exhaustive-deps': 'off',
    'import/prefer-default-export': 'off',
    'import/no-cycle': 'off',
    'no-multi-assign': 'off',
    'quotes': [
      1,
      'single'
    ],
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-self-compare': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'prefer-destructuring': 'off'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': [
        '.ts',
        '.tsx'
      ]
    }
  },
  parserOptions: {
    'project': './tsconfig.json'
  },
  ignorePatterns: ['.eslintrc.js']
};
