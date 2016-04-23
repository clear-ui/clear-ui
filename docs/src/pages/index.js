import React from 'react'

import DocPage from '../docPage'
import Example from '../example'

let logoStyle = {
	fontSize: '4rem'
}
let captionStyle = {
	fontSize: '1.5rem',
	fontWeight: 300
}
let bannerStyle = {
	paddingTop: '2rem',
	paddingBottom: '3rem',
	background: 'rgba(242, 242, 242, 1)',
	textAlign: 'center',
	background: '#1976D2',
	background: '#1565C0',
	color: 'white'
}

export default class Index extends React.Component {
	render() {
		return <div>
			<div style={bannerStyle}>
				<div style={logoStyle}>Clear UI</div>
				<div style={captionStyle}>UI components library for React</div>
			</div>

			<div style={{width: '50rem', margin: 'auto'}}>
				<DocPage width={640}>
					<h2>About Clear UI</h2>

					{`
					Goal of Clear UI is to provide simple and powerful abstractions of
					UI components behaviour, and not to make one set of complete components.

					Different web apps on different platforms require different styles of
					appearance, and you can not have one set of components that will fit in
					all situations.
					Instead of it Clear UI allows to completely customize 
					visual appearance of all components.

					## What

					Clear UI includes several ready-to-use sets of components:

					- [Clear UI Web](a) – Generic components for web design with most common features.
					- [Clear UI Material](a) – Components following Google Material Design guidelines.
					- [Clear UI iOS](a) – Apple iOS

					Or you can make your own set of components with custom appearance
					using components from [Clear UI Base](/qwe).

					## Features

					### Cross-platform and cross-browser

					Supports last versions of all popular browser and IE 9+,
					and also mobile browsers on Android and mobile Safari.

					### Modular

					Clear UI can be used with different module loaders such as webpack or browserify,
					so only used components will be included in the bundle.
					Also, precompiled versions are available.

					`}
				</DocPage>
			</div>
		</div>
	}
}





