# react-fuzzy-highlighter

> Lightweight fuzzy search highlighting component using [`fuse.js`](https://github.com/krisk/Fuse).

This component wraps `fuse.js` and provides matched and unmatched text in an iterable format.

## [Demo](https://metonym.github.io/react-fuzzy-highlighter/) · [Changelog](CHANGELOG.md)

## Install

```bash
# Yarn
yarn add react-fuzzy-highlighter

# npm
npm i react-fuzzy-highlighter

# pnpm
pnpm i react-fuzzy-highlighter
```

## Usage

```jsx
import * as React from "react";
import FuzzyHighlighter, { Highlighter } from "react-fuzzy-highlighter";

export default class extends React.Component {
  render() {
    return (
      <FuzzyHighlighter
        query="old"
        data={[
          { title: "Old Man's War" },
          { title: "The Lock Artist" },
          { title: "HTML5" },
        ]}
        options={{
          shouldSort: true,
          includeMatches: true,
          threshold: 0.6,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: ["title"],
        }}
      >
        {({ results, formattedResults, timing }) => {
          return (
            <ul>
              {formattedResults.map((formattedResult, resultIndex) => {
                if (formattedResult.formatted.title === undefined) {
                  return null;
                }

                return (
                  <li key={resultIndex}>
                    <Highlighter text={formattedResult.formatted.title} />
                  </li>
                );
              })}
            </ul>
          );
        }}
      </FuzzyHighlighter>
    );
  }
}
```

## Example

The [examples](examples) folder contains the source code used for the [demo](https://metonym.github.io/react-fuzzy-highlighter).

## License

[MIT](LICENSE)
