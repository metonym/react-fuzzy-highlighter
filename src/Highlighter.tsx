import * as React from 'react';

function Highlighter({
  text
}: {
  text: string | Array<{ text: string; isHighlighted: boolean }>;
}) {
  if (Array.isArray(text)) {
    return (
      <>
        {text.map((fragment, index) => {
          const key = `${fragment}${index}`; // TODO: generate id

          if (fragment.isHighlighted) {
            // TODO: allow custom highlight element
            return <mark key={key}>{fragment.text}</mark>;
          }
          return <React.Fragment key={key}>{fragment.text}</React.Fragment>;
        })}
      </>
    );
  }

  return <>{text}</>;
}

export { Highlighter };
