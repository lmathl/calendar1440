import PropTypes from 'prop-types';
import React from "react";
import Button from 'react-bootstrap/lib/Button';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { connect } from 'react-redux';
import { newMonth, selectAll, selectDay, unselectAll, unselectDay, updateMonth } from '../actions/monthActions';

const propTypes = {
    newMonth: PropTypes.func.isRequired,
    updateMonth: PropTypes.func.isRequired,
    selectDay: PropTypes.func.isRequired,
    unselectDay: PropTypes.func.isRequired,
    selectAll: PropTypes.func.isRequired,
    unselectAll: PropTypes.func.isRequired,
    selectedDays: PropTypes.array,
    daysArray: PropTypes.array.isRequired,
    currentMonth: PropTypes.object.isRequired,
    dateContext: PropTypes.object.isRequired
};

class SelectionBar extends React.Component {

    emptyContent(cells, daysArray, monthData) {
        if (monthData) {
            var newArray = daysArray;
            newArray = [...daysArray.slice(0, cells[0] - 1), "    ", ...daysArray.slice(cells[0])];

            for (var i = 1; i < cells.length; i++) {
                newArray = [...newArray.slice(0, cells[i] - 1), "    ", ...newArray.slice(cells[i])];
            }
            const update = Object.assign({}, monthData, { days: newArray });
            this.props.updateMonth(update, monthData.id);
        }
        this.props.unselectAll();
    }

    textPrompt = () => {
        var text = window.prompt("Please input text here", "");
        return text;
    }

    appendText(cells, daysArray, monthData, text, monthString, nextLine) {
        if (text) {
            const lineBreak = nextLine ? "<div></div>" : "";
            var newArray = [...daysArray.slice(0, cells[0] - 1), daysArray[cells[0] - 1] + lineBreak + text, ...daysArray.slice(cells[0])]
            for (var i = 1; i < cells.length; i++) {
                newArray = [...newArray.slice(0, cells[i] - 1), newArray[cells[i] - 1] + lineBreak + text, ...newArray.slice(cells[i])];
            }
            if (!monthData.id) {
                const data = {
                    month: monthString,
                    days: newArray
                }
                this.props.newMonth(data);
                this.props.unselectAll();
            } else {
                const update = Object.assign({}, monthData, { days: newArray });
                this.props.updateMonth(update, monthData.id);
                this.props.unselectAll();
            }
        }
    }

    removeText(cells, daysArray, monthData, text) {
        if (text && monthData) {
            var reg = new RegExp(text, "g");
            var newArray = daysArray;
            newArray = [...daysArray.slice(0, cells[0] - 1), daysArray[cells[0] - 1].replace(reg, ""), ...daysArray.slice(cells[0])];
            for (var i = 1; i < cells.length; i++) {
                if (newArray[cells[i] - 1].includes(text)) {
                    newArray = [...newArray.slice(0, cells[i] - 1), newArray[cells[i] - 1].replace(reg, ""), ...newArray.slice(cells[i])];
                }
            }
            const update = Object.assign({}, monthData, { days: newArray });
            this.props.updateMonth(update, monthData.id);
        }
        this.props.unselectAll();
    }

    render() {

        const { selectedDays, daysArray, currentMonth, dateContext } = this.props;
        var monthString = `${ dateContext.format("MMMM") } ${ dateContext.format("Y") }`;

        return (
            <ButtonToolbar id="msg-selected-buttons" className="justify-content-center">
                <ButtonGroup>
                    <button className="btn btn-secondary active cursor-text">{ selectedDays.length } days selected</button>
                    <Button bsStyle="info" onClick={ () => this.props.selectAll(daysArray.length) }>Select All</Button>
                    <Button bsStyle="info" onClick={ () => this.props.unselectAll() }>Unselect All</Button>
                    <Button bsStyle="info" onClick={ () => this.emptyContent(selectedDays, daysArray, currentMonth) }>Empty Cells</Button>
                    <Button bsStyle="info" onClick={ () => this.appendText(selectedDays, daysArray, currentMonth, this.textPrompt(), monthString, false) }>Append Text (Same Line)</Button>
                    <Button bsStyle="info" onClick={ () => this.appendText(selectedDays, daysArray, currentMonth, this.textPrompt(), monthString, true) }>Append Text (Next Line)</Button>
                    <Button bsStyle="info" onClick={ () => this.removeText(selectedDays, daysArray, currentMonth, this.textPrompt()) }>Remove Text</Button>
                </ButtonGroup>
            </ButtonToolbar>
        );
    }
}

SelectionBar.propTypes = propTypes;
export default connect(null, { newMonth, updateMonth, selectDay, unselectDay, selectAll, unselectAll })(SelectionBar);