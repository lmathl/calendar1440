import PropTypes from 'prop-types';
import React from 'react';
import Button from "react-bootstrap/lib/Button";
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import { ChromePicker } from 'react-color';

const propTypes = {
    customs: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
    setColor: PropTypes.func.isRequired,
    handleUpdate: PropTypes.func.isRequired,
    setStyle: PropTypes.func.isRequired
};

const TableBGColorOptions = ({ customs, color, setColor, handleUpdate, setStyle }) => {
    const options = ["rgba(255, 255, 255, 0.6)", "rgba(0, 0, 0, 0.2)", "white"];
    const items = ["white with opacity", "black with opacity", "white"];
    return (
        <div>
            <div className="options">
                Table Background Color
                <div className="float-right">
                    <ButtonGroup>
                        { options.map((color, i) =>
                            <Button
                                key={ "bg_" + color }
                                onClick={ () => {
                                    setStyle("backgroundColor", color);
                                    handleUpdate(customs, "tableBackgroundColor", color);
                                } }>
                                { items[i] }
                            </Button>) }
                    </ButtonGroup>
                </div>
            </div>
            <div className="color-picker">
                <div className="float-right">
                    <ChromePicker
                        color={ color }
                        onChangeComplete={ (object) => {
                            const rgb = object.rgb;
                            const color = `rgba(${ rgb.r },${ rgb.g },${ rgb.b },${ rgb.a })`;
                            setColor(color);
                            setStyle("backgroundColor", color);
                            handleUpdate(customs, "tableBackgroundColor", color);
                        } } />
                </div>
            </div>
        </div>
    )
}

TableBGColorOptions.propTypes = propTypes;
export default TableBGColorOptions;