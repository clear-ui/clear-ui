import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'

export default class InputDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base > Input</h1>

			<h2>Props</h2>

			<ApiDoc>
				<ApiDoc.Row
					name='value'
					type='string'
				>{`
					Value of the input.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='onChange'
					type='function(value: string)'
				>{`
					Handler of value changes.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='onFocus'
					type='function'
				>{`
					Handler of input's focus event.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='onBlur'
					type='function'
				>{`
					Handler of input's blur event.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='disabled'
					type='boolean'
				>{`
					Disabled state of the input.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='multiline'
					type='boolean'
				>{`
					If \`true\`, input will be rendered using \`textarea\` tag.
					Also, it will automatically grow according to
					the provided number of rows.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='rows'
					type='number'
					defaultValue='1'
				>{`
					Number of rows of multiline input.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='maxRows'
					type='number'
				>{`
					Maximum number of rows of multiline input.
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}

