module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "object-curly-newline": ["error", {
      "ObjectExpression": {
        "multiline": true,
        "minProperties": 3,
      },
      "ObjectPattern": "never",
    }],
    "no-plusplus": "off",
    "no-mixed-operators": ["error", {
        "allowSamePrecedence": true,
      }
    ],
    "max-len": ["error", {
      "ignoreComments": true,
    },
  ],
  },
  "globals": {
    "document": false,
  },
};