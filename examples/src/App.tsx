import * as React from "react";
import FuzzyHighlighter, { Highlighter } from "react-fuzzy-highlighter";
import data from "./data/default.json";

interface IAppState {
  query: string;
  data: Array<{
    title: string;
    author: {
      firstName: string;
      lastName: string;
    };
  }>;
}

class App extends React.Component<{}, IAppState> {
  public state: IAppState = {
    query: "John",
    data,
  };

  public render() {
    return (
      <>
        <input
          type="search"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <FuzzyHighlighter
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
            keys: ["title", "author.firstName"],
          }}
        >
          {({ formattedResults }) => {
            return (
              <ul>
                {formattedResults.map((formattedResult, resultIndex) => {
                  if (formattedResult.formatted.title === undefined) {
                    return null;
                  }

                  return (
                    <li
                      key={resultIndex}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "1rem",
                      }}
                    >
                      <div>
                        <Highlighter text={formattedResult.formatted.title} />
                      </div>
                      <div>
                        <Highlighter
                          text={formattedResult.formatted.author.firstName}
                        />{" "}
                        <Highlighter
                          text={formattedResult.formatted.author.lastName}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            );
          }}
        </FuzzyHighlighter>
      </>
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      query: e.target.value,
    });
  };
}

export default App;
