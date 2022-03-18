
export default function WebsiteCard(props) {
    return (
        <div className="table-row">
            <div className="table-first-item">
                <a href={props.url} >{props.name}</a>
            </div>
            <p className="table-item">{props.intro}</p>
        </div >
    )
}