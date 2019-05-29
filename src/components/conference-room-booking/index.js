import React, { Component } from 'react'
import { connect } from 'react-redux'
import DayPicker from '../day-picker'
import BookTime from '../book-a-time'
import './styles.scss'

class ConferenceRoomBooking extends Component {
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
        // const { colums } = this.props
        let colums = [
            {
                title: 'Бирюзовая',
                color: 'aqua',
                items: ['8:00 - 9:30']
            },
            {
                title: 'Оранжевая',
                color: 'orange',
                items: ['9:00 - 10:30', '11:30 - 17:00']
            },
            {
                title: 'Синяя',
                color: 'blue',
                items: []
            },
            {
                title: 'Сиреневая',
                color: 'purple',
                items: ['9:00 - 9:30', '11:00 - 11:30']
            }
        ]

        return colums.map((col, i) => 
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

export default connect(null)(ConferenceRoomBooking)