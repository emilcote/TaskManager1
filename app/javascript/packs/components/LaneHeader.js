import React from 'react';
import PropTypes from 'prop-types';

const LaneHeader = ({ id, cards, totalCount }) => (
  <div>
    <b>{id}</b>
    (
    {cards.length}
    /
    {totalCount}
    )
  </div>
);

LaneHeader.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.array.isRequired,
  totalCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default LaneHeader;
