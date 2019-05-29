import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

class BookTime extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
        callback: PropTypes.func.isRequired,
        start: PropTypes.number,
        end: PropTypes.number
    }

    render() {
        const { title, callback } = this.props
        const { color } = this.props || 'gray'

        return (
            <div className="book-time">
                <div className = { color + '-book-time__header'}>
                    { title }
                </div>
                <div onClick = { callback.bind(this) } >
                    { this.getTimeListElements() }
                </div>
            </div>
        )
    }

    getTimeListElements() {
        const { start, end } = this.props

        let timeList = this.getTimeList(start, end)

        return timeList.map((item, i) => {
            let className = this.getClassName(item)
            let style = { height: this.getHeightItem(item) + 'px' }

            return (
                <div 
                    key = { i } 
                    className = { className }
                    style = { style }
                >
                    <span>
                        { item }
                    </span>
                </div>
            )
        })
    }

    getTimeList() {
        const { data } = this.props
        let arr = data.slice()
        let defaultTimeList = this.getDefaultTimeList()

        if (arr.length) {
            let timeList = defaultTimeList.slice()

            arr.forEach(time => {
                let split = time.split('-')
                let from = defaultTimeList.findIndex(item => ~item.indexOf(split[0]))
                let to = defaultTimeList.findIndex(item => ~item.indexOf(split[1]))

                if (from !== to) {
                    timeList.splice(from, to + 1, time)
                } 
            })

            return timeList
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

            arr.push(sartTime)
            arr.push(endTime)
        }

        return arr
    }

    getClassName(itemDate) {
        const { data } = this.props
        const { color } = this.props || 'gray'

        return ~data.indexOf(itemDate) 
            ? color + '-book-time__time-list-item_active'
            : color + '-book-time__time-list-item'
    }

    getHeightItem(timeRange) {
        let split = timeRange.split('-')
        let defaultHeight = 70
        let defaultMargin = 5
        let rowsQuantity = (this.parseTime(split[1]) - this.parseTime(split[0])) / 30
        
        return rowsQuantity !== 1 
            ? (rowsQuantity * defaultHeight) + (rowsQuantity * defaultMargin)
            : defaultHeight
    }

    parseTime(time) {
        let split = time.split(':')
        return parseInt(split[0]) * 60 + parseInt(split[1])
    }
}

export default BookTime