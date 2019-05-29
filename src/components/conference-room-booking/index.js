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
                items: [
                    {
                        event: 'Meeting',
                        user: 'Ivanov',
                        time: '8:00 - 9:30'
                    },
                    {
                        event: 'Meeting',
                        user: 'Ivanov',
                        time: '10:00 - 11:30'
                    },
                    {
                        event: 'Meeting',
                        user: 'Ivanov',
                        time: '14:00 - 17:00'
                    }
                ]
            },
            {
                title: 'Оранжевая',
                color: 'orange',
                items: [
                    {
                        event: 'Conference',
                        user: 'Perov',
                        time: '9:00 - 10:30'
                    },
                    {
                        event: 'Bussines meeting',
                        user: 'Ivanov',
                        time: '11:30 - 17:00'
                    }
                ]
            },
            {
                title: 'Синяя',
                color: 'blue',
                items: []
            },
            {
                title: 'Сиреневая',
                color: 'purple',
                items: [
                    {
                        event: 'Conference',
                        user: 'Perov',
                        time: '9:00 - 9:30'
                    },
                    {
                        event: 'Bussines meeting',
                        user: 'Ivanov',
                        time: '11:00 - 11:30'
                    },
                    {
                        event: 'English',
                        user: 'Jukov',
                        time: '12:00 - 15:30'
                    }
                ]
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