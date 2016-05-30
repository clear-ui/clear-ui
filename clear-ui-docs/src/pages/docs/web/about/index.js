import React from 'react'

import DocPage from '../../../../docPage'

export default class AboutWeb extends React.Component {
	render() {
		return <DocPage>
			<h1>Clear UI Web</h1>

			{`
			Clear UI Web is a set of components for web interfaces.

			It contains most oftenly used components and features.
			It has neutral design style that can be used in various apps
			with minimal modifications.
			`}

			<h2>Responsiveness</h2>

			{`
			Clear UI Web uses \`rem\` units, so you can scale all sizes of components
			by changing \`font-size\` on the \`<html>\` element.
			`}

		</DocPage>
	}
}





