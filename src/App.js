import "./App.css";
import CategoryCard from "./components/CategoryCard.js";
import {gql, useQuery} from "@apollo/client";
import {useState} from "react";

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
    const {loading, error, data} = useQuery(queryTags);
    // sortedTags to control the order of the tags and we will append other tags at the end of the page
    const sortedTags = ["Promoted", "CEX", "DEX"];
    const [tagSelectedState, setTagSelectedState] = useState([])

    function toggleTagState(index) {
        let newTagSelectedState = [...tagSelectedState]
        newTagSelectedState[index] = !newTagSelectedState[index]
        setTagSelectedState(newTagSelectedState)
        console.log(newTagSelectedState)
    }

    if (loading) return null;
    if (error) return `Error! ${error}`;
    if (!data) return null;
    console.log(data)
    return (
        <div className="terminal">
            <head>
                <title>un.Block Portal</title>
            </head>
            <div className="terminal-logo" style={{marginLeft: "2em"}}>
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
                {/*tag*/}
                <nav className="terminal-menu">
                    <ul>
                        {data.__type.enumValues.map((item, index) => {
                            if (tagSelectedState[index]) {
                                return <li><a className="menuItem active" onClick={() => {
                                    toggleTagState(index)
                                }}
                                              key={index}>#{item.name}</a>
                                </li>
                            } else {
                                return <li><a className="menuItem" onClick={() => {
                                    toggleTagState(index)
                                }}
                                              key={index}>#{item.name}</a>
                                </li>
                            }
                        })}
                    </ul>
                </nav>
                {
                    tagSelectedState.includes(true) ?
                        <CategoryCard key="multiple" tag={data.__type.enumValues.filter((tag, index) =>
                            tagSelectedState[index]
                        ).map(value => value.name)}></CategoryCard> : null
                }
                {sortedTags.map((tag) => (
                    <CategoryCard key={tag} tag={[tag]}></CategoryCard>
                ))}
                {/*{data.__type.enumValues.map((item) => {*/}
                {/*    if (!sortedTags.includes(item.name)) {*/}
                {/*        return (*/}
                {/*            <CategoryCard key={item.name} tag={[item.name]}></CategoryCard>*/}
                {/*        );*/}
                {/*    }*/}
                {/*    return null;*/}
                {/*})}*/}
            </div>
        </div>
    );
}

export default App;
