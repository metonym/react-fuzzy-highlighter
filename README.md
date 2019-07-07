# react-fuzzy-highlighter

[![NPM][npm]][npm-url]
[![Build][build]][build-badge]
[![Coverage][codecov-shield]][codecov]

> Lightweight fuzzy search highlighting component using [`fuse.js`](https://github.com/krisk/Fuse).

### [Changelog](CHANGELOG.md)

## Install

```bash
yarn add react-fuzzy-highlighter
```

## Usage

```jsx
import * as React from 'react';
import FuzzyHighlighter from 'react-fuzzy-highlighter';

export default class extends React.Component {
  render() {
    return (
      <FuzzyHighlighter
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
      </FuzzyHighlighter>
    );
  }
}
```

## License

[MIT](LICENSE)

[npm]: https://img.shields.io/npm/v/react-fuzzy-highlighter.svg?color=blue
[npm-url]: https://npmjs.com/package/react-fuzzy-highlighter
[build]: https://travis-ci.com/metonym/react-fuzzy-highlighter.svg?branch=master
[build-badge]: https://travis-ci.com/metonym/react-fuzzy-highlighter
[codecov]: https://codecov.io/gh/metonym/react-fuzzy-highlighter
[codecov-shield]: https://img.shields.io/codecov/c/github/metonym/react-fuzzy-highlighter.svg
