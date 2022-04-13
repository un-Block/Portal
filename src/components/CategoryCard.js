import {gql, useQuery} from "@apollo/client";
import WebsiteCard from './WebsiteCard.js';


const queryWebsitesByTag = gql`
query GetWebsiteByTag($tag: [Tags!]) {
  websites(where: { tag_contains_all: $tag }) {
    name,
    intro,
    url
  }
}
`

export default function CategoryCard(props) {
    console.log(props.tag)
    const { loading, error, data } = useQuery(queryWebsitesByTag, {
        variables: {tag: props.tag}
    });
    if (loading) return null;
    if (error) return `Error! ${error}`;
    if (data.websites.length === 0) return null;

    return (
        <div>
            <p className="tag">{props.tag.join(", ")}</p>
            <div className="table">
                {
                    data.websites.map(item => {
                        return <WebsiteCard key={item.name} url={item.url} name={item.name}
                                            intro={item.intro}></WebsiteCard>
                    })
                }
            </div>
        </div>
    )
}