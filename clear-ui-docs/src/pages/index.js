import React from 'react'

import DocPage from '../docPage'
import Example from '../example'

import RaisedButton from 'clear-ui-web/lib/button/raisedButton'

import Icon from 'clear-ui-base/lib/icon'
import logo from '../logo.icon.svg'

let logoStyle = {
	fontSize: '4rem',
	fill: 'white'
}
let captionStyle = {
	fontSize: '1.25rem'
}
let bannerStyle = {
	paddingTop: '2rem',
	paddingBottom: '3rem',
	background: 'rgba(242, 242, 242, 1)',
	textAlign: 'center',
	background: '#AFE2FB',
	color: 'white'
}

export default class Index extends React.Component {
	render() {
		return <div>
			<div style={bannerStyle}>
				<Icon icon={logo} style={{fill: 'white'}}/>
				<div style={logoStyle}>Clear UI</div>
				<div style={captionStyle}>UI components library for React</div>
			</div>

			<div style={{width: 960, margin: 'auto'}}>
				<DocPage>

					<h2>About Clear UI</h2>

					{`
					Goal of Clear UI is to provide simple and powerful abstractions of
					UI components behaviour, and not to make one complete set of components.

					Different web apps on different platforms require different styles of
					appearance, and you can not have one set of components that will fit in
					all situations.
					Instead of it Clear UI allows to completely customize
					visual appearance of all components.

					Clear UI includes several ready-to-use sets of components:

					- [Clear UI Web](#/docs/web/about) – Generic components for web design with
					most common features.
					- [Clear UI Material](#/docs/material/about) – Components implementing
					Google Material Design guidelines.
					- Clear UI iOS – Apple iOS (in development).

					## Features
					`}

					<div style={{display: 'flex'}}>
						<div style={{flex: '1 0 0'}}>
						<b>Customizable</b>
						<br/>
						<br/>
						Clear UI allows to completely customize visual appearance of all components,
						or to implement your own custom design for components from Clear UI Base.
						</div>

						<div style={{margin: '0 2rem', flex: '1 0 0'}}>
						<b>Cross-platform and cross-browser</b>
						<br/>
						<br/>
						Supports last versions of all popular browsers and IE 9+,
						and also mobile browsers on Android and mobile Safari.
						</div>

						<div style={{flex: '1 0 0'}}>
						<b>Modular</b>
						<br/>
						<br/>
						Clear UI can be used with different module loaders such as webpack or
						browserify, so only used components will be included in the bundle.
						Also, precompiled versions are available.
						</div>
					</div>

					<div style={{textAlign: 'center', padding: '5rem 0'}}>
						<RaisedButton color='blue' height='big'>Get started</RaisedButton>
					</div>
				</DocPage>
			</div>

			<div style={{fontSize: '14px', borderTop: '1px solid #ddd', padding: '1.5rem 0'}}>
				<div style={{width: 960, margin: 'auto'}}>
					Created by <a href='#'>sunflowerdeath</a>.
					{' '}
					License:
					{' '}
					<a href='http://unlicense.org/UNLICENSE'>Public domain (Unlicence)</a>.
				</div>
			</div>
		</div>
	}
}





