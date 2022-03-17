
export default function WebsiteCard(props) {
    return (
        <div className="table-row">
            <a href={props.url} className="table-first-item">{props.name}</a>
            <p className="table-item">{props.intro}</p>
        </div >
    )
}