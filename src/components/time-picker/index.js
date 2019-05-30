import React, { Component } from 'react'

class timePicker extends Component {
    plusTimeHandler() {
        const { callback } = this.props

    }

    minusTimeHandler() {
        const { callback } = this.props
        
    }

    render() {
        const { title, time } = this.props
        return (
            <div>
                <div className="time-picker__header">{ title }</div>
                <div className="time-picker__group">
                    <span className="time-picker__group-plus" onClick = { this.plusTimeHandler }></span>
                    <span className="time-picker__group-time">{ time }</span>
                    <span className="time-picker__group-minus" onClick = { this.minusTimeHandler }></span>
                </div>
            </div>
        )
    }
}

export default timePicker