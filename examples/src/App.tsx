import * as React from 'react';
import FuzzyHighlight from 'react-fuzzy-highlight';
import data from './data/default.json';

interface IAppState {
  query: string;
  data: any[];
}

class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    query: '',
    data
  };

  public render() {
    return (
      <>
        <input
          type="search"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <FuzzyHighlight
          query={this.state.query}
          data={this.state.data}
          options={{
            shouldSort: true,
            includeMatches: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: ['title', 'author.firstName']
          }}
        >
          {({ results, timing }) => {
            return (
              <>
                <div>time: {timing}ms</div>
                {JSON.stringify(results, null, 2)}
              </>
            );
          }}
        </FuzzyHighlight>
      </>
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.target.value
    });
  };
}

export default App;
