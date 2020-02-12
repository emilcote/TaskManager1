/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";

export default class LaneHeader extends React.Component {
  render() {
    const { id, cards, totalCount } = this.props;
    return (
      <div>
        <b>{id}</b>({cards.length}/{totalCount})
      </div>
    );
  }
}

LaneHeader.propTypes = {
  id: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  totalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};
