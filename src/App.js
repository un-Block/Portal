import "./App.css";
import CategoryCard from "./components/CategoryCard.js";
import { useQuery, gql } from "@apollo/client";

const queryTags = gql`
  query AllTags {
    __type(name: "Tags") {
      enumValues {
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(queryTags);
  // sortedTags to control the order of the tags and we will append other tags at the end of the page
  const sortedTags = ["Promoted", "CEX", "DEX"];
  if (loading) return null;
  if (error) return `Error! ${error}`;
  if (!data) return null;
  return (
    <div className="terminal">
      <head>

      </head>
      <div className="terminal-logo" style={{ marginLeft: "2em" }}>
        <div className="logo terminal-prompt">
          <a
            href="https://twitter.com/unblock256"
            target="_blank"
            rel="noreferrer"
            className="no-style"
          >
            un.Block
          </a>
        </div>
      </div>
      <div className="container">
        {sortedTags.map((tag) => (
          <CategoryCard key={tag} tag={tag}></CategoryCard>
        ))}
        {data.__type.enumValues.map((item) => {
          if (!sortedTags.includes(item.name)) {
            return (
              <CategoryCard key={item.name} tag={item.name}></CategoryCard>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
