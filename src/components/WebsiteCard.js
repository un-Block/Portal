
export default function WebsiteCard(props) {
    return (
        <div style={{
            display: "flex", flexDirection: "row", justifyContent: "space-start", alignItems: "space-around"
        }}>
            <a href={props.url} style={{ flex: 1 }}>{props.name}</a>
            <p className="intro" style={{ flex: 4 }}>{props.intro}</p>
        </div >
    )
}