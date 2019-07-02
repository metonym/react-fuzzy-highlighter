# react-fuzzy-highlight

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
