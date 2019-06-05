import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DaysList from '../booking-days-list'
import BookingTime from '../booking-time'
import Modal from '../booking-modal'
import './styles.scss'

class ConferenceRoomBooking extends Component {
    static propTypes = {
        columns: PropTypes.array.isRequired
    }

    changeBookingDayHandler(currentDay) {
        this.setState({ currentDay })
        // routing
    }

    render() {
        return (
            <div className="booking">
                <div className="booking__day-picker">
                    <DaysList range = { 7 } />
                </div>
                <div className="booking__content">
                    { this.getColums() }
                </div>

                <Modal />
            </div>
        )
    }
    
    getColums() {
        const { columns } = this.props
        
        return columns.map((col, i) => 
            <BookingTime 
                title = { col.title } 
                color = { col.color }
                data = { col.items } 
                key = { i } 
            />
        )
    }
}

function mapStateToProps(state) {
    return {
        columns: state.columns,
        currentDay: state.currentDay
    }
}


export default connect(mapStateToProps)(ConferenceRoomBooking)