export default function ErrorMessage({error}){
    return (
        <aside className="error">
            <p>Error: {error}</p>
        </aside>
    )
}