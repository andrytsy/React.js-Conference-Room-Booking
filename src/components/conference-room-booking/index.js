import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DayPicker from '../day-picker'
import BookTime from '../book-a-time'
import './styles.scss'

class ConferenceRoomBooking extends Component {
    static propTypes = {
        columns: PropTypes.array.isRequired
    }

    state = {
        currentDay: 0
    }

    changeBookingDayHandler(currentDay) {
        this.setState({ currentDay })
        // routing
    }

    timeSelectHandler() {
        console.log('click!');
    }

    render() {
        return (
            <div className="booking">
                <div className="booking__day-picker">
                    <DayPicker 
                        range = { 7 } 
                        active = { this.state.currentDay }
                        callback = { this.changeBookingDayHandler.bind(this) }
                    />
                </div>
                <div className="booking__content">
                    { this.getColums() }
                </div>
            </div>
        )
    }
    
    getColums() {
        const { columns } = this.props
        

        return columns.map((col, i) => 
            <BookTime 
                callback = { this.timeSelectHandler.bind(this) }
                title = { col.title } 
                color = { col.color}
                data = { col.items } 
                key = { i } 
            />
        )
    }
}

export default connect(state => ({ columns: state.columns }))(ConferenceRoomBooking)