import React from 'react'

import DocPage from '../docPage'
import Example from '../example'

let logoStyle = {fontSize: 16*4}
let captionStyle = {fontSize: 16*1.5, fontWeight: 300}

export default class CustomizationDocs extends React.Component {
	render() {
		return <div>
			<div style={{
				background: 'rgba(242, 242, 242, 1)',
				padding: '3rem 0',
				textAlign: 'center'
			}}>
				<div style={logoStyle}>Clear UI</div>
				<div style={captionStyle}>UI components library for React.</div>
			</div>

			<DocPage>
				<h2>Features</h2>

				{`
				- Clear UI includes several sets of components with different designs:

					- \`clear-ui-material\` - Components following Google Material Desigh guidelines.
					- \`clear-ui-ios\` - Apple iOS
					- \`clear-ui-web\` - Generic components for web design with most common features.

				- Extensibility

					You can completely change visual appearance
					and a lot of parameters of components.
					Read more on the [Customization](#customization) page.

				- Cross-platform and cross-browser support

					Supports last versions of all popular browser and IE 9+,
					and also mobile browsers on Android and mobile Safari.

				- Modular

					Clear UI can be used with different module loaders such as webpack or browserify,
					so only used components will be included in the bundle.
					Also, precompiled versions are available.

				`}
			</DocPage>
		</div>
	}
}





