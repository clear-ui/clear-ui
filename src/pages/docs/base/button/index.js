import React from 'react'

import DocPage from '../../../../docPage'
// import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'

export default class BaseButtonDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Button</h1>

			{`
			Base button component.

			It allows to handle taps and display button states
			consistently across different input methods - touch, mouse or keyboard.
			`}

			<h2>Props</h2>

			<ApiDoc>
				<ApiDoc.Row
					name='onTap'
					type='function'
				>{`
					Handler of the tap event.
					It can be triggered with either mouse, touch,
					or with pressing \`Enter\` key on the focused button.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='tabIndex'
					type='number'
				>{`
					HTML \`tabIndex\` attribute.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='preventFocusOnTap'
					type='boolean'
					defaultValue='true'
				>{`
					If value is \`true\`, button will became focused when you
					navigate to it using \`Tab\` key, but not on click or touch.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='disabled'
					type='boolean'
				>{`
					Disabled state of the button.
				`}</ApiDoc.Row>

				<ApiDoc.Row>{`
					**initialTapState, tapState**
					<br/>
					type: \`initial | hovered | pressed\`

					**onChangeTapState**
					<br/>
					type: \`(tapState) => void\`

					Properties that allow to control button's tap state from the outside.
					If they are not present, button will manage tap state inside its
					internal state.
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
