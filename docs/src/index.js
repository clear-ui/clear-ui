import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import {Router} from 'react-router'
import createHistory from 'history/lib/createHashHistory'
import useScrollToTop from 'scroll-behavior/lib/useScrollToTop'

import routes from './routes'

let history = useScrollToTop(createHistory)({queryKey: false})

$(() => {
	ReactDOM.render(
		<Router children={routes} history={history}/>,
		document.querySelector('.container')
	)
})
