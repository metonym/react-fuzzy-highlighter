# react-fuzzy-highlight

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]
[![Coverage][codecov-shield]][codecov]

> Lightweight fuzzy search highlighting component using [`fuse.js`](https://github.com/krisk/Fuse).

## Install

```bash
yarn add react-fuzzy-highlight
```

## Usage

```jsx
import * as React from 'react';
import FuzzyHighlight from 'react-fuzzy-highlight';

export default class extends React.Component {
  render() {
    return (
      <FuzzyHighlight
        query="old"
        data={[
          { title: "Old Man's War" },
          { title: 'The Lock Artist' },
          { title: 'HTML5' }
        ]}
        options={{
          shouldSort: true,
          includeMatches: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ['title']
        }}
      >
        {({ results }) => {
          return JSON.stringify(results, null, 2);
        }}
      </FuzzyHighlight>
    );
  }
}
```

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/react-fuzzy-highlight.svg?color=blue
[npm-url]: https://npmjs.com/package/react-fuzzy-highlight
[build]: https://travis-ci.com/metonym/react-fuzzy-highlight.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/react-fuzzy-highlight
[codecov]: https://codecov.io/gh/metonym/react-fuzzy-highlight
[codecov-shield]: https://img.shields.io/codecov/c/github/metonym/react-fuzzy-highlight.svg
