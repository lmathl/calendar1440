import React from 'react';
import PropTypes from 'prop-types';
import Button from "react-bootstrap/lib/Button";
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

const propTypes = {
  customs: PropTypes.object.isRequired,
  setStyle: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired
};

const TextColorOptions = ({ customs, setStyle, handleUpdate }) => {
  const options = ["black", "navy", "grey", "white"];
  return(
    <div className="options">
      Text Color
      <div className="float-right">
        <ButtonGroup>
          {options.map(color =>
            <Button
              key={"text_" + color}
              onClick={() => {
                setStyle("color", color)
                handleUpdate(customs, "textColor", color);
              }}
            >
              {color}
            </Button>)}
        </ButtonGroup>
      </div>
    </div>
)}

TextColorOptions.propTypes = propTypes;
export default TextColorOptions;