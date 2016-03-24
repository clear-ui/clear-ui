import React from 'react'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'

export default class BaseModalDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Modal</h1>

			{`
			Modal displays content in the window above the page.
			`}

			<h2>Focus management</h2>

			{`
			On open modal sets focus on the first focusable element inside.
			Also it restricts moving focus outside of the modal, e.g. with \`Tab\` key.
			On close it returns focus to previously focused element.
			`}

			<h2>Props</h2>

			<ApiDoc>
				<ApiDoc.Row
					name='open'
					type='boolean'
				>{`
					Controls whether modal is opened or not.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='onClose'
					type='function'
				>{`
					Function that is called when modal requests close after
					clicking outside or pressing \`Esc\` key.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='width'
					type='string | number'
				>{`
					Width of the modal (value of the CSS-property width).
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='closeOnClickOutside'
					type='boolean'
					defaultValue='true'
				>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='closeOnEsc'
					type='boolean'
					defaultValue='true'
				>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='animation'
					type='string'
					defaultValue={`'fade'`}
				>{`
					Type of opening and closing animation.
					<br/>
					Possible values: \`'fade', 'scale', 'slideDown'\`,
					or \`false\` for no animation.
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
