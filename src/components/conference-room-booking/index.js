import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DayPicker from '../day-picker'
import BookTime from '../book-a-time'
import Modal from '../booking-modal'
import './styles.scss'

class ConferenceRoomBooking extends Component {
    static propTypes = {
        columns: PropTypes.array.isRequired
    }

    state = {
        currentDay: 0,
        showModal: false,
        selectedTime: ''
    }

    changeBookingDayHandler(currentDay) {
        this.setState({ currentDay })
        // routing
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
                { this.getModal() }                
            </div>
        )
    }
    
    getColums() {
        const { columns } = this.props
        
        return columns.map((col, i) => 
            <BookTime 
                callback = { this.doSelectTime.bind(this) }
                title = { col.title } 
                color = { col.color}
                data = { col.items } 
                key = { i } 
            />
        )
    }

    doSelectTime(time) {
        this.setState({ selectedTime: time })
        this.toggleModal()
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    getModal() {
        if (this.state.showModal) {
            return (
                <Modal 
                    defaultTime = { this.state.selectedTime }
                    close = { this.toggleModal.bind(this) } 
                    save = { this.bookRoom.bind(this) } 
                /> 
            )
        }

        return null 
    }

    bookRoom() {
        this.toggleModal()
    }
}

export default connect(state => ({ columns: state.columns }))(ConferenceRoomBooking)