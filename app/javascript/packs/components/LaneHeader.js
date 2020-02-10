import React from 'react'
import PropTypes from 'prop-types';


export default class LaneHeader extends React.Component {
  render () {
    return <div>
      <b>{this.props.id}</b> ({this.props.cards.length}/{this.props.totalCount})
    </div>
  }
}

LaneHeader.propTypes = {
  id: PropTypes.string,
  cards: PropTypes.array,
  totalCount: PropTypes.number
};