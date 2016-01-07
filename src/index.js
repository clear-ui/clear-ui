import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import {Router} from 'react-router'
import createHistory from 'history/lib/createHashHistory'

import routes from './routes'

let history = createHistory({queryKey: false})

$(() => {
	ReactDOM.render(
		<Router children={routes} history={history}/>,
		document.querySelector('.container')
	)
})
