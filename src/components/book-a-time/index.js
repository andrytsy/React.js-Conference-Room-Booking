import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

class BookTime extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
        callback: PropTypes.func.isRequired,
        start: PropTypes.number,
        end: PropTypes.number,
        color: PropTypes.string
    }

    clickHandler(event) {
        const { callback } = this.props
        let time = event.target.innerText
        
        if (time && time.length < 15)
            callback(time)
    }

    render() {
        const { title } = this.props
        const { color } = this.props

        return (
            <div className="book-time">
                <div className = { color + '-book-time__header'}>
                    { title }
                </div>
                <div onClick = { this.clickHandler.bind(this) } >
                    { this.getTimeListElements() }
                </div>
            </div>
        )
    }

    getTimeListElements() {
        let timeList = this.getTimeList()

        return timeList.map((item, i) => {
            let className = this.getClassName(item.time)
            let style = { height: this.getHeightItem(item.time) + 'px' }

            return (
                <div 
                    key = { i } 
                    className = { className }
                    style = { style }
                >
                    <span className="book-time__time-list-item-event">
                        { item.event }
                    </span>
                    <span>
                        { item.time }
                    </span>
                    <span className="book-time__time-list-item-user">
                        { item.user }
                    </span>
                </div>
            )
        })
    }

    getTimeList() {
        const { data } = this.props
        let defaultTimeList = this.getDefaultTimeList()

        if (data.length) {
            data.forEach(item => {
                let split = item.time.split('-')
                let from = defaultTimeList.findIndex(item => ~item.time.indexOf(split[0]))
                let to = defaultTimeList.findIndex(item => ~item.time.indexOf(split[1]))

                if (from !== to) {
                    let count = to - from + 1
                    defaultTimeList.splice(from, count, item)
                } 
            })
        }

        return defaultTimeList
    }

    getDefaultTimeList(start = 8, end = 22) {
        let arr = []
        let halfHour = ':30'
        let fullHour = ':00'

        for (let i = start; i <= end; i++) {
            let sartTime = i + fullHour + ' - ' + i + halfHour
            let endTime = i + halfHour + ' - ' + (i + 1) + fullHour

            arr.push({time: sartTime})
            arr.push({time: endTime})
        }

        return arr
    }

    getClassName(itemDate) {
        const { data } = this.props
        let { color } = this.props || 'gray'
        
        let isActive = data.find(item => item.time && ~item.time.indexOf(itemDate)) 

        if (isActive) {
            return color + '-book-time__time-list-item_active'
        } else if (this.isCompleted(itemDate)) {
            return 'light-gray-book-time__time-list-item'
        }
        
        return color + '-book-time__time-list-item'
    }

    isCompleted(itemDate) {
        let date = new Date()
        let currentTime = date.getHours() + ':' + date.getMinutes()
        let time = itemDate.split('-')

        return (this.parseTime(time[0]) - this.parseTime(currentTime)) < 0
    }

    getHeightItem(timeRange) {
        let split = timeRange.split('-')
        let defaultHeight = 70
        let defaultMargin = 5
        let rowsQuantity = (this.parseTime(split[1]) - this.parseTime(split[0])) / 30
        
        return rowsQuantity !== 1 
            ? (rowsQuantity * defaultHeight) + ((rowsQuantity - 1) * defaultMargin)
            : 'auto'
    }

    parseTime(time) {
        let split = time.split(':')
        return parseInt(split[0]) * 60 + parseInt(split[1])
    }
}

export default BookTime