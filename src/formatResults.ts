import get from 'get-value';
import set from 'set-value';
import { Result, Results } from './FuzzyHighlighter';

interface IFinalResult<T> extends Result<T> {
  formatted: {
    [key: string]: $FixMe;
  };
}

export type FinalResults<T> = Array<IFinalResult<T>>;

function formatResults<T>(results: Results<T>): FinalResults<T> {
  const finalResults: FinalResults<T> = [];

  results.forEach((result, index) => {
    finalResults.push({ ...result, formatted: { ...result.item } });

    result.matches.forEach(
      (match: {
        arrayIndex: number;
        indices: Array<[number, number]>;
        key: string;
        value: string;
      }) => {
        const { key, value, indices } = match;
        const nestedKey = key.split('.').length > 1;

        if (nestedKey) {
          set(finalResults[index].formatted, key, []);
        } else {
          finalResults[index].formatted[key] = [];
        }

        let initialIndex = 0;
        let open = false;

        const chars = value.split('');

        for (let i = 0, len = chars.length; i < len; i++) {
          const character = chars[i];
          const item = { text: character, isHighlighted: false };

          const entryCurrent = nestedKey
            ? get(finalResults[index].formatted, key)
            : finalResults[index].formatted[key];

          let entryLast = [];

          if (entryCurrent.length > 0) {
            const lastIndex = entryCurrent.length - 1;

            entryLast = nestedKey
              ? get(finalResults[index].formatted, key)[lastIndex]
              : entryCurrent[lastIndex];
          } else {
            entryLast = nestedKey
              ? get(finalResults[index].formatted, key)[0]
              : entryCurrent[0];
          }

          if (
            initialIndex === indices.length - 1 &&
            i >= indices[initialIndex][1]
          ) {
            if (entryLast !== undefined) {
              entryLast.text += item.text;

              const tail = chars.slice(i + 1, chars.length).join('');

              if (entryLast.isHighlighted) {
                if (tail.length > 0) {
                  entryCurrent.push({
                    text: tail,
                    isHighlighted: false
                  });
                }
              } else {
                entryLast.text += tail;
              }
            }

            break;
          }

          const [start, end] = indices[initialIndex];

          if (start === end) {
            entryCurrent.push(item);
            entryCurrent.push({
              text: chars[start],
              isHighlighted: true
            });

            i += 1;
            initialIndex += 1;
          } else {
            if (i === start) {
              open = true;
            }

            if (i === end) {
              open = false;
              initialIndex += 1;
            }

            item.isHighlighted = open;

            if (open && entryCurrent.length > 0) {
              if (entryLast.isHighlighted) {
                entryLast.text += item.text;
              } else {
                entryCurrent.push(item);
              }
            }

            if (open && entryCurrent.length === 0) {
              entryCurrent.push(item);
            }

            if (!open && entryCurrent.length > 0) {
              if (entryLast.isHighlighted) {
                entryCurrent.push(item);
              } else {
                entryLast.text += item.text;
              }
            }

            if (!open && entryCurrent.length === 0) {
              entryCurrent.push(item);
            }
          }
        }
      }
    );
  });

  return finalResults;
}

export { formatResults };
