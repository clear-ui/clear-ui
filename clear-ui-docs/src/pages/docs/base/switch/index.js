import React from 'react'

import DocPage from '../../../../docPage'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let switchPropsDoc = baseDocs['switch/index.js'].props

export default class BaseButtonDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Switch</h1>

			{`
			Switch is a base component for displaying and toggling boolean state.
			This component is used inside other components like RadioButton or Checkbox.
			`}

			<h2>API</h2>

			<h3>Props</h3>

			<PropsDoc doc={switchPropsDoc}/>

			<h3>Methods</h3>

			<ApiDoc>
				<ApiDocRow name='focus()'>{`
					Sets focus to the switch.
				`}</ApiDocRow>
				<ApiDocRow name='blur()'>{`
					Removes focus from the switch.
				`}</ApiDocRow>
				<ApiDocRow name='renderSwitchElement() => node'>{`
					Method that can be overriden in a subclass to render specific
					display of the switcher's state.
					For example, it can render circle and dot for radio button,
					or box and checkmark for checkbox component.
					Returned content is rendered inside the \`switchElement\` container.
				`}</ApiDocRow>
			</ApiDoc>

			<h3>Styleable Elements</h3>

			<ApiDoc>
				<ApiDocRow name='root'>{`Root element.`}</ApiDocRow>
				<ApiDocRow name='label'>{`Text label after the switch element.`}</ApiDocRow>
				<ApiDocRow name='switchElement'>{`Container for the switch element.`}</ApiDocRow>
			</ApiDoc>
		</DocPage>
	}
}
