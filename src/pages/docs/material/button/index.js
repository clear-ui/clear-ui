import React from 'react'

import RaisedButton from 'clear-ui-material/lib/button/raisedButton'
import FlatButton from 'clear-ui-material/lib/button/flatButton'
import ActionButton from 'clear-ui-material/lib/button/actionButton'
import COLORS from 'clear-ui-material/lib/styles/colors'
import Icon from 'clear-ui-base/lib/icon'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'

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

			<h2>Example</h2>

			There are three types of buttons: raised, flat and floating action buttons.

			<Example>
				<Example.Demo>
					<RaisedButton>Raised button</RaisedButton>
					{' '}
					<FlatButton>Flat button</FlatButton>
					{' '}
					<ActionButton>A</ActionButton>
				</Example.Demo>
				<Example.Code lang='js'>{`
					import RaisedButton from 'clear-ui-material/lib/button/raisedButton'
					import FlatButton from 'clear-ui-material/lib/button/flatButton'
					import ActionButton from 'clear-ui-material/lib/button/actionButton'

					<RaisedButton>Raised button</Button>
					<FlatButton>Flat button<FlatButton>
					<ActionButton>Action button</ActionButton>
				`}</Example.Code>
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
					<RaisedButton disabled={true}>Raised button</Button>
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

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/docs/base/button' style={{
						textDecoration: 'none',
						color: 'rgb(57, 123, 230)',
						fontWeight: 500
					}}>BaseButton props...</a>
				</ApiDoc.Row>

				<ApiDoc.Row name='dense' type='boolean'>{`
					Smaller size of the button.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='ripples' type='boolean' defaultValue='true'>{`
					If true, ripple effect appears on press,
					else button just changes background color.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='color' type='string'>{`
					Background color of the button (CSS color property).
				`}</ApiDoc.Row>

				<ApiDoc.Row name='primary' type='boolean'>{`
					Use primary color from the current theme as background.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='accent' type='boolean'>{`
					Use accent color from the current theme as background.
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}

