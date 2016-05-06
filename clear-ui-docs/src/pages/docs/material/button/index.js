import React from 'react'
import {Link} from 'react-router'

import RaisedButton from 'clear-ui-material/lib/button/raisedButton'
import FlatButton from 'clear-ui-material/lib/button/flatButton'
import ActionButton from 'clear-ui-material/lib/button/actionButton'
import COLORS from 'clear-ui-material/lib/styles/colors'
import Icon from 'clear-ui-base/lib/icon'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import materialDocs from '../../../../../docgen/material.json'
let buttonPropsDoc = {
	...materialDocs['button/rippleButton.js'].props,
	...materialDocs['button/materialButton.js'].props
}

import ButtonExample from './example.js'
import buttonExampleCode from '!raw!./example.js'

export default class ButtonDoc extends React.Component {
	render() {
		let starIcon = <Icon icon={Icon.ICONS.star}/>
		let searchIcon = <Icon icon={Icon.ICONS.search}/>
		let triangleIcon = <Icon icon={Icon.ICONS.triangleDown}/>

		let border = '1px solid rgba(222, 222, 222, 1)'
		let rowStyle = {
			borderTop: border,
			borderBottom: border,
			paddingTop: '1rem',
			paddingLeft: '1rem',
			paddingRight: '1rem'
		}

		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Button</h1>

			{`
			A button clearly communicates what action will occur when the user touches it.
			It consists of text, an image, or both, designed in accordance with your app’s
			color theme.
			`}

			<a
				href='https://www.google.com/design/spec/components/buttons.html'
				target='blank'
			>
				Buttons specification
			</a>

			<h2>Example</h2>

			There are three types of buttons: raised, flat and floating action buttons.

			<Example>
				<Example.Demo>
					<ButtonExample/>
				</Example.Demo>
				<Example.Code lang='js'>
					{buttonExampleCode}
				</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Disabled</h3>

			<Example>
				<Example.Demo>
					<RaisedButton disabled={true}>Raised button</RaisedButton>
					{' '}
					<FlatButton disabled={true}>Flat button</FlatButton>
					{' '}
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<RaisedButton disabled={true}>Raised button</RaisedButton>
					<FlatButton disabled={true}>Flat button<FlatButton>
				`}</Example.Code>
			</Example>

			<h3>Dense</h3>

			Smaller size.

			<Example>
				<Example.Demo>
					<RaisedButton dense={true}>Raised button</RaisedButton>
					{' '}
					<FlatButton dense={true}>Flat button</FlatButton>
					{' '}
					<ActionButton dense={true}>A</ActionButton>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<RaisedButton dense={true}>Raised button</RaisedButton>
					<FlatButton dense={true}>Flat button</FlatButton>
					<ActionButton dense={true}>A</ActionButton>
				`}</Example.Code>
			</Example>

			<h3>Colors</h3>

			Buttons can have different colors.
			For example, you can use colors from material design palette.

			<Example>
				<Example.Demo>
					<RaisedButton color={COLORS.teal300}>Teal button</RaisedButton>
					{' '}
					<RaisedButton color={COLORS.teal800}>Teal button</RaisedButton>
					<br/>
					<FlatButton color={COLORS.teal300}>Teal button</FlatButton>
					{' '}
					<FlatButton color={COLORS.teal800}>Teal button</FlatButton>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					import COLORS from 'clear-ui-material/lib/styles/colors'

					<RaisedButton color={COLORS.teal300}>Teal button</RaisedButton>
					<RaisedButton color={COLORS.teal800}>Teal button</RaisedButton>
					<FlatButton color={COLORS.teal300}>Teal button</FlatButton>
					<FlatButton color={COLORS.teal800}>Teal button</FlatButton>
				`}</Example.Code>
			</Example>

			{`
			*Text color of raised buttons is chosen automatically,
			based on lightness of the background color.*

			Also, buttons can use primary or accent color from the current theme.
			`}

			<Example>
				<Example.Demo>
					<RaisedButton primary={true}>Primary button</RaisedButton>
					{' '}
					<RaisedButton accent={true}>Accent button</RaisedButton>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<RaisedButton primary={true}>Primary button</RaisedButton>
					<RaisedButton accent={true}>Accent button</RaisedButton>
				`}</Example.Code>
			</Example>

			<h3>Without ripples</h3>

			You can disable ripple effect that appears on buttons when pressed.

			<Example>
				<Example.Demo>
					<RaisedButton ripples={false}>Raised button</RaisedButton>
					{' '}
					<FlatButton ripples={false}>Flat button</FlatButton>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<RaisedButton ripples={false}>Raised button</RaisedButton>
					<FlatButton ripples={false}>Flat button</FlatButton>
				`}</Example.Code>
			</Example>

			<h2>Props</h2>

			<PropsDoc
				doc={buttonPropsDoc}
				base={{name: 'Base > Button > IconButton props', url: '#/docs/base/button'}}
			/>
		</DocPage>
	}
}

