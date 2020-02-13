/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";

export default function LaneHeader(props) {
  return (
    <div>
      <b>{props.id}</b>({props.cards.length}/{props.totalCount})
    </div>
  );
}

LaneHeader.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.array.isRequired,
  totalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired
};
