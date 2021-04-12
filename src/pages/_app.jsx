import React from 'react'
import { Provider } from 'react-redux'
import "../polyfills"

import store from '../store'

// import '../styles/bootstrap.scss'
import '../styles/global.scss'



function Root({Component, pageProps }) {    

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    )
}


export default Root

