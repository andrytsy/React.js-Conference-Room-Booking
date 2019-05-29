import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

class BookTime extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        data: PropTypes.array.isRequired,
        callback: PropTypes.func.isRequired,
        start: PropTypes.string,
        end: PropTypes.string
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
            
            return (
                <div key = { i } className = { className }>
                    { item }
                </div>
            )
        })
    }

    getTimeList(start = 8, end = 22) {
        const { data } = this.props
        // let arr = ['10:30 - 11:30', '12:00 - 15:00']
        let arr = data.slice()

        if (arr.length) {
            for (let i = start; i <= end; i++) {
                let j = 0
                let item = arr[j]
    
                if (item) {

                }
            }
        } else {
            this.getDefaultTimeList.apply(this, arguments)
        }
        
    }

    getDefaultTimeList(start = '08:00', end = '22:00') {
        let arr = []
        let time = ''
        let isStartHour = true
        let halfHour = ':30'
        let fullHour = ':00'

        let count = this.calculateIterationCount(start, end)

        for (let i = start; i <= count; i++) {
            if (isStartHour) 
                time = hour + fullHour + ' - ' + hour + halfHour
            else
                time = hour + halfHour + ' - ' + (hour + 1) + fullHour

            isStartHour = !isStartHour

            arr.push(time)
        }

        return arr
    }

    calculateIterationCount(start, end) {
        return (parseTime(end) - parseTime(start)) / 30
    }

    parseTime(time) {
        let split = time.split(':')
        return parseInt(split[0]) * 60 + parseInt(split[1])
    }

    getClassName(itemDate) {
        const { data } = this.props
        const { color } = this.props || 'gray'

        if (~data.indexOf(itemDate)) {
            return color + '-book-time__time-list-item_active'
        } else if () {

        }

        let itemDate = this.getObjParsedDate(data)
        let itemDate = this.getObjParsedDate(itemDate)


        // ~data.indexOf(item) 
        //                         ? color + '-book-time__time-list-item_active'
        //                         : color + '-book-time__time-list-item'
    }

    getObjParsedDate(date) {
        let split = date.split(' - ')

        return {
            start: split[0],
            end: split[1]
        }
    }
}

export default BookTime