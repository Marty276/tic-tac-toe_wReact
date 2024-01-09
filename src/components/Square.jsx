export const Square = ({ square_value, id, updateBoard }) => {

  function handleClick() {
    updateBoard(id)
  }

  return <div className="square" onClick={handleClick}>
    {square_value}
  </div>
}