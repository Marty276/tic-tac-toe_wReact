export const Scores = ({ players, scores }) => {
    return <section className="scores">
        <div className="score_card">
            <span>{players.x}</span>
            <span>:</span>
            <span>{scores.x}</span>
        </div>
        <div className="score_card">
            <span>{players.o}</span>
            <span>:</span>
            <span>{scores.o}</span>
        </div>
    </section>
}