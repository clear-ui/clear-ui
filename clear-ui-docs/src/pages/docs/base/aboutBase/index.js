import React from 'react'

import DocPage from '../../../../docPage'

export default class AboutBase extends React.Component {
	render() {
		return <DocPage>
			<h1>Clear UI Base</h1>

			{`
			\`clear-ui-base\` is a library with base abstractions of UI components behavour.

			It contains base abstractions for user interfaces to simplify common tasks,
			such as Tappable, ZContext, Attachment, Sticky.

			Also it contains base components with implementation of their behaviour
			but without any design. They are not usable out of the box,
			they can be used as basis for other components with various custom designs.
			`}
		</DocPage>
	}
}





