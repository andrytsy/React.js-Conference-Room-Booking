import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setColumn } from '../../redux/actions'
import RadioList from '../ui-kit/radio-list'
import DaysList from '../booking-days-list'
import BookingTime from '../booking-time'
import Modal from '../booking-modal'
import './styles.scss'

class ConferenceRoomBooking extends Component {
    static propTypes = {
        columns: PropTypes.array.isRequired
    }

    render() {
        const { isMobile } = this.props 

        return (
            <div className="booking">
                <div className="booking__day-picker">
                    <DaysList range = { 7 } />
                </div>
                <div className="booking__content">
                    { 
                        isMobile 
                            ? this.getColumn()
                            : this.getColums()
                    }
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

    getColumn() {
        const { columns, currentColumn, setColumn  } = this.props
        let col = columns[currentColumn]

        return (
            <div>
                <div className="booking__content-radio-list">
                    <RadioList range = { columns.length } callback = { setColumn } />
                </div>
                <BookingTime 
                    title = { col.title } 
                    color = { col.color }
                    data = { col.items } 
                    key = { currentColumn } 
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        columns: state.columns,
        currentDay: state.currentDay,
        currentColumn: state.currentColumn,
        isMobile: state.isMobile
    }
}


export default connect(mapStateToProps, { setColumn })(ConferenceRoomBooking)