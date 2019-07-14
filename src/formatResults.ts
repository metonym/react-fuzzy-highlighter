import set from 'set-value';
import strind from 'strind';
import { Result, Results } from './FuzzyHighlighter';

function formatResults<T>(results: Results<T>): FinalResults<T> {
  const finalResults: FinalResults<T> = [];

  results.forEach((result, index) => {
    finalResults.push({ ...result, formatted: { ...result.item } });
    result.matches.forEach(({ indices, key, value }: IFuzzyResult) => {
      const output = strind(value, indices, ({ chars: text, matches }) => ({
        text,
        isHighlighted: matches
      }));
      const formattedResult = output.matched as IFormattedResult[];
      const formatted = finalResults[index].formatted as IFormatted;

      if (key.split('.').length > 1) {
        set(formatted, key, formattedResult);
      } else {
        formatted[key] = formattedResult;
      }
    });
  });

  return finalResults;
}

interface IFormattedResult {
  text: string;
  isHighlighted: boolean;
}

interface IFormatted {
  [key: string]: IFormattedResult[];
}

interface IFinalResult<T> extends Result<T> {
  formatted: T | IFormatted;
}

export type FinalResults<T> = Array<IFinalResult<T>>;

interface IFuzzyResult {
  arrayIndex: number;
  indices: Array<[number, number]>;
  key: string;
  value: string;
}

export { formatResults };
