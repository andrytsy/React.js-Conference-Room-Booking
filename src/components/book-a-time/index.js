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
        let { color } = this.props || 'gray'

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
        const { data, start, end } = this.props
        let { color } = this.props || 'gray'

        let timeList = this.getTimeList(start, end)

        return timeList.map((item, i) => {
            return (
                <div key = { i } className = { color + '-book-time__time-list-item'}>
                    { item }
                </div>
            )
        })
    }

    // todo KISS
    getTimeList(start = 8, end = 22) {
        let arr = []
        let step = 30

        for (let i = start; i <= end; i++) {
            let time1 = i + ':00 - ' + i + ':' + step
            let time2 = i + ':' + step + ' - ' + (i + 1) + ':00'

            arr.push(time1)
            arr.push(time2)
        }

        return arr
    }
}

export default BookTime