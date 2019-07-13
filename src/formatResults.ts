import set from 'set-value';
import strind from 'strind';
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
    result.matches.forEach(({ indices, key, value }: IFuzzyResult) => {
      const { matched } = strind(
        value,
        indices,
        ({ chars: text, matches }) => ({ text, isHighlighted: matches })
      );

      if (key.split('.').length > 1) {
        set(finalResults[index].formatted, key, matched);
      } else {
        finalResults[index].formatted[key] = matched;
      }
    });
  });

  return finalResults;
}

interface IFuzzyResult {
  arrayIndex: number;
  indices: Array<[number, number]>;
  key: string;
  value: string;
}

export { formatResults };
