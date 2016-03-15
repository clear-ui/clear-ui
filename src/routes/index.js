import React from 'react'

//import Page from 'clear-ui-doc/lib/page'
//import Header from 'clear-ui-doc/lib/header'

import ZContext from 'clear-ui-base/lib/zContext'
import Page from '../page'
import Header, {HeaderItem} from '../header'

class App extends React.Component {
	render() {
		return (
			<Page>
				<ZContext>
					<Header title='Clear UI' color='rgb(30, 136, 229)'>
						<HeaderItem link='/docs/'>Docs</HeaderItem>
						<HeaderItem link='/github/'>Github</HeaderItem>
					</Header>
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

import Index from '../pages/index'
import Docs from '../pages/docs'
import GetStarted from '../pages/docs/getStarted'
import Customization from '../pages/docs/customization'
import BaseComponentsRoutes from './baseComponents'
import WebComponentsRoutes from './webComponents'
import MaterialComponentsRoutes from './materialComponents'

export default {
	path: '/',
	component: App,
	indexRoute: {component: Index},
	childRoutes: [
		{
			path: 'docs',
			component: Docs,
			childRoutes: [
				{
					path: 'get-started',
					component: GetStarted
				},
				{
					path: 'customization',
					component: Customization
				},
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
				}
			]
		}
	]
}
