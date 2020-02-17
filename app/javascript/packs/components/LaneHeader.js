import React from "react";
import PropTypes from "prop-types";

const LaneHeader = props => (
  <div>
    <b>{props.id}</b>({props.cards.length}/{props.totalCount})
  </div>
);

LaneHeader.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.array.isRequired,
  totalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};

export default LaneHeader;
