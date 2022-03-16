import './App.css';
import CategoryCard from './components/CategoryCard.js';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";


const queryTags = gql`
query AllTags{
  __type(name: "Tags") {
    enumValues {
      name
    }
  }
}
`

function App() {
  const { loading, error, data } = useQuery(queryTags);
  if (loading) return null;
  if (error) return `Error! ${error}`;
  if (!data) return null;
  return (
    <div className='container'>
      {data.__type.enumValues.map(item => {
        return (< CategoryCard tag={item.name}></CategoryCard>)
      })
      }
    </div >
  )
}

export default App;
