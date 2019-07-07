import * as React from 'react';

function Highlighter(props: IHighlighterProps) {
  if (Array.isArray(props.text)) {
    return (
      <>
        {props.text.map(({ text, isHighlighted }, index) => {
          const key = `${text}${index}`; // TODO: generate id

          if (isHighlighted) {
            // TODO: allow custom highlight element
            return <mark key={key}>{text}</mark>;
          }

          return <React.Fragment key={key}>{text}</React.Fragment>;
        })}
      </>
    );
  }

  return <>{props.text}</>;
}

interface IHighlighterProps {
  text: string | Array<{ text: string; isHighlighted: boolean }>;
}

export { Highlighter };
