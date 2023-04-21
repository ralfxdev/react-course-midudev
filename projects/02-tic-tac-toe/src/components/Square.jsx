import PropTypes from "prop-types";

export const Square = ({ children, updateBoard, index, isSelected }) => {
  const isSelectedClassName = `square ${isSelected ? "is-selected" : ""}`;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={isSelectedClassName}>
      {children}
    </div>
  );
};

Square.propTypes = {
  children: PropTypes.node,
  updateBoard: PropTypes.func,
  index: PropTypes.number,
  isSelected: PropTypes.bool,
};
