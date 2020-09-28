import PropTypes from 'prop-types';
import React from "react";
import { Alert, Col, Grid, Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { updateCustom } from '../actions/customActions';
import settings from "../settings_white.png";
import CalendarCustom from './CalendarCustom';
import HotkeysTab from './HotkeysTab';
import ImageOptions from './ImageOptions';
import MonthFocus from './MonthFocus';
import RepeatedTextCounter from './RepeatedTextCounter';
import TableBGColorOptions from './TableBGColorOptions';
import TextColorOptions from './TextColorOptions';

const propTypes = {
  updateCustom: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  custom: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired
};

class Custom extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      opened: false,
      color: ''
    };

    this.clickSettings = this.clickSettings.bind(this);
  }

  clickSettings(e) {
    e.preventDefault();
    const { opened } = this.state;
    if (e.target.className === "settings" || e.target.className === "modal" || e.target.className === "close") {
      this.setState({
        opened: !opened,
      });
    }
  }

  setColor = (color) => {
    this.setState({ color });
  }

  showSetting(i) {
    this.setState({ index: i })
  }

  handleUpdate = (customs, item, value) => {
    const update = Object.assign({}, customs, { [item]: value })
    this.props.updateCustom(update, customs.id);
    this.showAppliedMsg();
  }

  renderSetting() {
    const { custom, items } = this.props;
    const customs = custom && custom[0];
    // sort by year then month
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const sortedItems = items.sort((a, b) => {
      if (a.month.slice(a.month.length - 5) > b.month.slice(b.month.length - 5)) return -1
      if (a.month.slice(a.month.length - 5) < b.month.slice(b.month.length - 5)) return 1
      else {
        if (months.indexOf(b.month.slice(0, b.month.length - 5)) > months.indexOf(a.month.slice(0, a.month.length - 5))) return 1
        if (months.indexOf(b.month.slice(0, b.month.length - 5)) < months.indexOf(a.month.slice(0, a.month.length - 5))) return -1
      }
      return 0;
    });
    const monthArray = sortedItems.map(item => item.month);

    switch (this.state.index) {
      case 1:
        return (
          <RepeatedTextCounter sortedItems={ sortedItems } monthArray={ monthArray } textCount={ this.textCount } />
        );
      case 2:
        return (
          <HotkeysTab />
        );
      case 3:
        return (
          <CalendarCustom customs={ customs } handleUpdate={ this.handleUpdate } />
        );
      case 4:
        return (
          <div>
            <h5 className="title">Style Settings</h5>
            <TableBGColorOptions color={ this.state.color } setColor={ this.setColor } customs={ customs } setStyle={ this.setStyle } handleUpdate={ this.handleUpdate } />
            <TextColorOptions customs={ customs } setStyle={ this.setStyle } handleUpdate={ this.handleUpdate } />
            <ImageOptions customs={ customs } setStyle={ this.setStyle } handleUpdate={ this.handleUpdate } urlPrompt={ this.urlPrompt } />
            <Alert id="applied" bsStyle="success">Applied!</Alert>
          </div>
        );
      default:
        return (
          <MonthFocus items={ items } monthArray={ monthArray } sortedItems={ sortedItems } />
        );
    }
  }

  urlPrompt() {
    var url = window.prompt("Please enter the image url.");
    return url;
  }

  setStyle(property, value) {
    var calendar = document.getElementById("calendar");
    calendar.style[property] = value;
  }

  showAppliedMsg() {
    var appliedMsg = document.getElementById("applied");
    appliedMsg.style.display = "block";
    setTimeout(() => {
      appliedMsg.style.display = "none";
    }, 2500);
  }

  textCount(monthArray) {
    var lineBreakRegExp = /<div><\/div>/g;
    var tagRegExp = /<div>(.*?)<\/div>/g;
    var splitRegExp = /,+/g;
    var emojiRegExp = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    const itemsArray = monthArray
      .map(item => item.trim() // remove white space
        .replace(lineBreakRegExp, ",") // remove line breaks
        .replace(tagRegExp, ",$1") // extract texts wrapped around <div> </div> and remove <div></div> line breaks
        .replace(emojiRegExp, ",$&,") // separate emojis by commas
        .split(splitRegExp) // split all items by commas
      );
    const flattened = itemsArray.reduce((a, b) => a.concat(b), []).filter(e => e);
    const textCount = flattened.reduce((all, day) => {
      if (day in all) {
        all[day]++;
      } else {
        all[day] = 1;
      }
      return all;
    }, {});
    return textCount;
  }

  render() {

    return (
      <div>
        <div onClick={ this.clickSettings }>
          <img src={ settings } className="settings" alt="Settings" />
        </div>
        {this.state.opened && <div className="modal" onClick={ this.clickSettings }>
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={ this.clickSettings }>&times;</span>
              <h4>Settings</h4>
            </div>
            <div className="modal-body">
              <Grid>
                <Row>
                  <Col xs={ 12 } md={ 3 }>
                    <div className="left-options" onClick={ () => this.showSetting(0) }>Month Focus <i className="em em-pencil2"></i></div>
                    <div className="left-options" onClick={ () => this.showSetting(1) }>Month History <i className="em em-1234"></i></div>
                    <div className="left-options" onClick={ () => this.showSetting(2) }>Hotkeys <i className="em em-capital_abcd"></i></div>
                    <div className="left-options" onClick={ () => this.showSetting(3) }>Calendar Settings <i className="em em-calendar"></i></div>
                    <div className="left-options" onClick={ () => this.showSetting(4) }>Style Settings <i className="em em-mag"></i></div>
                    <div className="left-options" onClick={ this.props.logout }>Log Out</div>
                  </Col>
                  <Col className="content" style={ { width: "100%" } } xs={ 12 } md={ 8 }>
                    { this.renderSetting() }
                  </Col>
                </Row>
              </Grid>
            </div>
          </div>
        </div> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.months.items,
  custom: state.custom.settings
})

Custom.propTypes = propTypes;
export default connect(mapStateToProps, { updateCustom })(Custom);