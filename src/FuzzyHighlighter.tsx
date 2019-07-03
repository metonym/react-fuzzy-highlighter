import Fuse from 'fuse.js';
import * as React from 'react';

class FuzzyHighlighter<T, O> extends React.Component<
  IFuzzyHighlighterProps<T, O>,
  IFuzzyHighlighterState<T>
> {
  public readonly state: IFuzzyHighlighterState<T> = {
    results: [],
    cache: {},
    info: {
      timing: 0
    }
  };
  private fuse!: Fuse<T, Options<O>>;

  public componentDidMount() {
    const { data, options } = this.props;
    this.fuse = new Fuse(data, options || {});
    this.search();
  }

  public componentDidUpdate(prevProps: IFuzzyHighlighterProps<T, O>) {
    if (prevProps.query !== this.props.query) {
      this.search();
    }

    if (prevProps.data !== this.props.data) {
      this.setState(
        {
          cache: {}
        },
        () => {
          this.search();
        }
      );
    }
  }

  public render() {
    const { children } = this.props;
    const { results, info } = this.state;

    if (children) {
      return children({ results, timing: info.timing });
    }

    return null;
  }

  public search() {
    const { query } = this.props;
    const { cache } = this.state;

    if (Object(cache).hasOwnProperty(query)) {
      return this.setState({
        results: cache[query],
        info: {
          timing: 0
        }
      });
    }

    const start = window.performance.now();
    const results = this.fuse.search(query);
    const end = window.performance.now();

    this.setState({
      results,
      cache: {
        ...cache,
        [query]: results
      },
      info: {
        timing: parseFloat((end - start).toFixed(3))
      }
    });
  }
}

type Data<T> = ReadonlyArray<T>;
type Options<O> = Fuse.FuseOptions<Readonly<O>>;

interface IFuzzyHighlighterProps<T, O> {
  query: string;
  data: Data<T>;
  options?: Options<O>;
  children?: (params: { results: Data<T>; timing: number }) => React.ReactNode;
}

interface IFuzzyHighlighterState<T> {
  results: Data<T>;
  cache: {
    [query: string]: Data<T>;
  };
  info: {
    timing: number;
  };
}

export default FuzzyHighlighter;
