import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Booking from './components/conference-room-booking'

//styles
import './styles/fonts.scss'
import './styles/global.scss'

ReactDOM.render(
    <Provider store = { store }>
        <Booking />
    </Provider>
, document.getElementById('root'))