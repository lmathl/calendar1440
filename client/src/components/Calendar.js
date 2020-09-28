import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import { connect } from 'react-redux';
import { fetchCustom } from '../actions/customActions';
import { fetchMonths, newMonth, selectAll, selectDay, unselectAll, unselectDay, updateMonth } from '../actions/monthActions';
import CalendarBody from './CalendarBody';
import CalendarHead from './CalendarHead';
import MonthNavigation from './MonthNavigation';
import MonthSidebar from './MonthSidebar';
import SelectionBar from './SelectionBar';

const propTypes = {
    fetchMonths: PropTypes.func.isRequired,
    fetchCustom: PropTypes.func.isRequired,
    newMonth: PropTypes.func.isRequired,
    updateMonth: PropTypes.func.isRequired,
    selectDay: PropTypes.func.isRequired,
    unselectDay: PropTypes.func.isRequired,
    selectAll: PropTypes.func.isRequired,
    unselectAll: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    selectedDays: PropTypes.array,
    custom: PropTypes.array.isRequired
};

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            dateContext: moment(),
            isFocus: false,
        }
    }

    componentDidMount() {
        this.props.fetchMonths();
        this.props.fetchCustom();
        this.editingCheck();
        this.selectAllHotkey();
        this.prevNextHotkeys();
    }

    editingCheck = () => {
        // check if user is editing, if so, do not listen for arrow clicks
        const inputs = document.querySelectorAll('div[contenteditable], span[contenteditable]');
        for (let input of inputs) {
            input.addEventListener('focus', () => this.setState({ isFocus: true }));
            input.addEventListener('blur', () => this.setState({ isFocus: false }));
        }
    }

    selectAllHotkey = () => {
        // get number of days in the month shown
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext);
        var numberOfDays = dateContext.daysInMonth();
        document.addEventListener('keydown', e => {
            if (!this.state.isFocus && e.ctrlKey && e.keyCode === 65) {
                this.props.selectAll(numberOfDays);
            }
        });
    }

    prevNextHotkeys = () => {
        document.addEventListener('keydown', e => {
            if (!this.state.isFocus && e.keyCode === 37) {
                this.prevMonth();
            } else if (!this.state.isFocus && e.keyCode === 39) {
                this.nextMonth();
            }
        });
    }

    componentDidUpdate(prevState) {
        if (prevState.dateContext !== this.state.dateContext) {
            this.editingCheck(); // add event listeners for new day cells            
            this.selectAllHotkey(); // needs update since the number of days in each month is different
        }
    }

    componentWillReceiveProps(nextProps) {
        const { custom } = nextProps;
        const settings = (custom && custom[0]) || {};
        const { backgroundImage, tableBackgroundColor, textColor } = settings;
        if (settings) {
            var calendar = document.getElementById("calendar");
            if (calendar) {
                calendar.style.backgroundColor = tableBackgroundColor;
                calendar.style.color = textColor;
                if (backgroundImage === "none") {
                    document.body.style.backgroundImage = "none";
                } else {
                    document.body.style.backgroundImage = `url(${ backgroundImage })`;
                }
            }
        }
    }

    setTime = (key, value) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set(key, value);
        this.setState({ dateContext });
        this.showNoRecordMessage(dateContext);
        this.props.unselectAll();
    }

    onKeyUpYear = (e) => {
        if (e.which === 13 || e.which === 27) {
            this.setTime("year", e.target.value);
        }
    }

    toggleMonthSidebar = () => {
        var sidebar = document.getElementById("month-sidebar");
        if (sidebar.style.width === "200px") {
            sidebar.style.width = "0";
        } else {
            sidebar.style.width = "200px";
        }
    }

    showNoRecordMessage(dateContext) {
        const { items } = this.props;
        const currentIndex = items.map(e => e.month).indexOf(`${ dateContext.format("MMMM") } ${ dateContext.format("Y") }`);
        const currentMonth = items && items[currentIndex];
        if (currentMonth === undefined) {
            document.getElementById("msg").style.display = "block";
            setTimeout(() => {
                document.getElementById("msg").style.display = "none";
            }, 2500);
        }
    }

    nextMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).add(1, "month");
        this.setState({ dateContext });
        this.showNoRecordMessage(dateContext);
        this.props.unselectAll();
    }

    prevMonth = () => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).subtract(1, "month");
        this.setState({ dateContext });
        this.showNoRecordMessage(dateContext);
        this.props.unselectAll();
    }

    editFocus = (newFocus, dateContext, daysArray, currentMonth) => {
        if (currentMonth.month === `${ dateContext.format("MMMM") } ${ dateContext.format("Y") }` && currentMonth.focus !== newFocus) {
            const monthWithFocus = Object.assign({}, currentMonth, { focus: newFocus });
            this.props.updateMonth(monthWithFocus, currentMonth.id);
        } else {
            const data = {
                month: `${ dateContext.format("MMMM") } ${ dateContext.format("Y") }`,
                days: daysArray,
                focus: newFocus
            }
            this.props.newMonth(data);
        }
    }

    render() {

        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext);
        const { items, selectedDays } = this.props;
        if (!items) return <div>Not authorized.</div>;
        const currentIndex = items ? items.map(e => e.month).indexOf(`${ dateContext.format("MMMM") } ${ dateContext.format("Y") }`) : -1;
        const currentMonth = (items && items[currentIndex]) || {};
        var numberOfDays = dateContext.daysInMonth();
        const daysArray = (currentMonth && currentMonth.days) || (new Array(numberOfDays).fill("            "));
        const { custom } = this.props;
        const settings = (custom && custom[0]) || {};
        return (
            <div>
                <MonthSidebar setTime={ this.setTime } toggleMonthSidebar={ this.toggleMonthSidebar } />
                <MonthNavigation prevMonth={ this.prevMonth } nextMonth={ this.nextMonth } />
                { selectedDays.length > 0 &&
                    <SelectionBar
                        selectedDays={ selectedDays }
                        daysArray={ daysArray }
                        currentMonth={ currentMonth }
                        dateContext={ dateContext }
                    /> }
                <table id="calendar" className="text-align-center">
                    <CalendarHead settings={ settings } toggleMonthSidebar={ this.toggleMonthSidebar } editFocus={ this.editFocus } daysArray={ daysArray } currentMonth={ currentMonth } dateContext={ dateContext } onKeyUpYear={ this.onKeyUpYear } setTime={ this.setTime } />
                    <CalendarBody settings={ settings } items={ items } selectedDays={ selectedDays } daysArray={ daysArray } currentMonth={ currentMonth } dateContext={ dateContext } />
                </table>
                <Alert id="msg">No record for this month. Click on a cell to start recording.</Alert>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    items: state.months.items,
    selectedDays: state.months.selectedDays,
    custom: state.custom.settings
});

Calendar.propTypes = propTypes;
export default connect(mapStateToProps, { fetchMonths, newMonth, updateMonth, selectDay, unselectDay, selectAll, unselectAll, fetchCustom })(Calendar);