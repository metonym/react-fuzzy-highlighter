import Fuse, { FuseResultWithMatches } from 'fuse.js';
import * as React from 'react';
import { FinalResults, formatResults } from './formatResults';

class FuzzyHighlighter<T, O> extends React.Component<
  IFuzzyHighlighterProps<T, O>,
  IFuzzyHighlighterState<T>
> {
  public readonly state: IFuzzyHighlighterState<T> = {
    results: [],
    cache: {},
    info: { timing: 0 }
  };
  private fuse!: Fuse<T, Options<T>>;

  public componentDidMount() {
    const { data, options } = this.props;
    this.fuse = new Fuse(data, {
      ...options,
      shouldSort: true,
      includeMatches: true
    });
    this.search();
  }

  public componentDidUpdate(prevProps: IFuzzyHighlighterProps<T, O>) {
    if (prevProps.query !== this.props.query) {
      this.search();
    }

    if (prevProps.data !== this.props.data) {
      this.fuse.setCollection(this.props.data);
      this.setState({ cache: {} }, this.search);
    }
  }

  public render() {
    const { children } = this.props;
    const { results, info } = this.state;

    if (children) {
      return children({
        results,
        formattedResults: formatResults(results),
        timing: info.timing
      });
    }

    return null;
  }

  public search() {
    const { query } = this.props;
    const { cache } = this.state;

    if (Object(cache).hasOwnProperty(query)) {
      return this.setState({ results: cache[query], info: { timing: 0 } });
    }

    const start = window.performance.now();
    const search: unknown = this.fuse.search(query);
    const end = window.performance.now();
    const results = search as ReadonlyArray<Fuse.FuseResultWithMatches<T>>;
    const timing = parseFloat((end - start).toFixed(3));

    this.setState({
      results,
      cache: { ...cache, [query]: results },
      info: { timing }
    });
  }
}

type Data<T> = ReadonlyArray<T>;
type Options<T> = Fuse.FuseOptions<T>;

interface IFuzzyHighlighterProps<T, O> {
  query: string;
  data: Data<T>;
  options?: Options<T>;
  children?: (params: {
    results: ReadonlyArray<FuseResultWithMatches<T>>;
    formattedResults: FinalResults<T>;
    timing: number;
  }) => React.ReactNode;
}

export type Result<T> = FuseResultWithMatches<T>;
export type Results<T> = ReadonlyArray<Result<T>>;

interface IFuzzyHighlighterState<T> {
  results: Results<T>;
  cache: { [query: string]: ReadonlyArray<FuseResultWithMatches<T>> };
  info: { timing: number };
}

export default FuzzyHighlighter;
