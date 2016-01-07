import React from 'react'

//import Page from 'clear-ui-doc/lib/page'
//import Header from 'clear-ui-doc/lib/header'

import ZContext from 'clear-ui-base/lib/zContext'
import Page from '../page'
import Header from '../header'

class App extends React.Component {
	render() {
		return (
			<Page>
				<ZContext>
					<Header title='Clear UI Material' color='rgb(66, 133, 244)'/>
					<div>
						{this.props.children}
					</div>
				</ZContext>
			</Page>
		)
	}
}

//import Main from './pages/main'
//import Usage from './pages/usage'
import Components from '../pages/components'
import BaseComponentsRoutes from './baseComponents'
import WebComponentsRoutes from './webComponents'
import MaterialComponentsRoutes from './materialComponents'

import Customization from '../pages/customization'

export default {
	path: '/',
	component: App,
	childRoutes: [
		{
			path: 'components',
			component: Components,
			childRoutes: [
				{
					path: 'base',
					childRoutes: BaseComponentsRoutes
				},
				{
					path: 'material',
					childRoutes: MaterialComponentsRoutes
				},
				{
					path: 'web',
					childRoutes: WebComponentsRoutes
				},
				{
					path: 'customization',
					component: Customization
				}
			],
		}
	]
}
