import * as React from "react";

function Highlighter(props: IHighlighterProps) {
  if (Array.isArray(props.text)) {
    const Mark = props.mark || "mark";
    return (
      <>
        {props.text.map(({ text, isHighlighted }, index) => {
          const key = `${text}${index}`; // TODO: generate id

          if (isHighlighted) {
            return <Mark key={key}>{text}</Mark>;
          }

          return <React.Fragment key={key}>{text}</React.Fragment>;
        })}
      </>
    );
  }

  return <>{props.text}</>;
}

interface IHighlighterProps {
  /**
   * The text to display.
   * Either a `string` or an array of formatted results from the FuzzyHighlighter.
   */
  text: string | { text: string; isHighlighted: boolean }[];
  /**
   * Custom JSX element to surround highlighted text.
   * Default: 'mark'
   */
  mark?: keyof JSX.IntrinsicElements | React.ComponentType;
}

export { Highlighter };
