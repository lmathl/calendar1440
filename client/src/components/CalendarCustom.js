import PropTypes from 'prop-types';
import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Button from "react-bootstrap/lib/Button";
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

const propTypes = {
    customs: PropTypes.object.isRequired,
    handleUpdate: PropTypes.func.isRequired
};

const CalendarCustom = ({ customs, handleUpdate }) => {

    const customArray = ["monFirst", "showFocus", "showMonth", "showYear", "showWeekday", "weekdayShortForm"];
    const customItems = ["First Weekday", "Show Focus", "Show Month", "Show Year", "Show Weekday", "Weekday"];
    const customOptions1 = ["Monday", "Show", "Show", "Show", "Show", "Short Form"];
    const customOptions2 = ["Sunday", "Hide", "Hide", "Hide", "Hide", "Long Form"];

    return (
        <div>
            <h5 className="title">Calendar Settings</h5>
            {customArray.map((item, i) =>
                <div key={ item } className="options">
                    { customItems[i] }
                    <div className="float-right">
                        <ButtonGroup>
                            <Button active={ customs[item] }
                                onClick={ () => handleUpdate(customs, item, true) }>
                                { customOptions1[i] }
                            </Button>
                            <Button active={ !customs[item] }
                                onClick={ () => handleUpdate(customs, item, false) }>
                                { customOptions2[i] }
                            </Button>
                        </ButtonGroup>
                    </div>
                </div>) }
            <Alert id="applied" bsStyle="success">Applied!</Alert>
        </div>
    );
}

CalendarCustom.propTypes = propTypes;
export default CalendarCustom;