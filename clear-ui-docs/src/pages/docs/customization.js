import React from 'react'

import DocPage from '../../docPage'
import Example from '../../example'

import composeStyles from 'clear-ui-base/lib/utils/stylesMixin/composeStyles'
import composeChildComponents from
	'clear-ui-base/lib/utils/childComponentsMixin/composeChildComponents'

import RaisedButton from 'clear-ui-web/lib/button/raisedButton'
import Select from 'clear-ui-web/lib/select'
import MenuItem from 'clear-ui-web/lib/menu/item'

class CrazyButton extends RaisedButton {
	static styles = composeStyles(
		RaisedButton.styles,
		(props, state) => {
			let root = {background: 'blue'}
			let label = {color: 'aqua', fontFamily: 'cursive'}
			let rightIcon = {color: 'aqua', fill: 'aqua'}
			let leftIcon = {color: 'aqua', fill: 'aqua'}
			if (state.tapState === 'hovered' || state.tapState === 'active') {
				root.background = 'indigo'
			}
			return {root, label, leftIcon, rightIcon}
		}
	)
}

class CrazySelect extends Select {
	static childComponents = composeChildComponents(
		Select.childComponents,
		{
			button: <CrazyButton/>
		}
	)
}

class ColorSelect extends Select {
	static childComponents = composeChildComponents(
		Select.childComponents,
		{
			button: (props, state, defaultButton) => {
				return React.cloneElement(defaultButton, {color: props.color})
			}
		}
	)
}

export default class CustomizationDocs extends React.Component {
	render() {
		return <DocPage>
			<h1>Customization</h1>

			{`
			Customization is the key feature of the Clear UI.
			`}

			<h2>Styles</h2>

			{`
			Components use inline styles.
			To allow you to modify styles, components use special \`StylesMixin\`.
			It takes styles definitions from the static property \`styles\`
			of the component’s class, or from React element’s prop \`styles\`.
			It is an object containing styles for inner elements of the component.
			Names of styleable elements of every component are listed in their docs pages.

			For example, \`RaiseButton\` has root and label elements:
			`}

			<Example>
				<Example.Code>{`
					import RaisedButton from ‘clear-ui-web/lib/button/raisedButton’

					<RaisedButton styles={{
						root: {background: 'purple'},
						label: {color: 'aqua', fontFamily: 'cursive'}
					}}>
						Crazy button
					</RaisedButton>
				`}</Example.Code>
				<Example.Demo>
					<RaisedButton styles={{
						root: {background: 'blue'},
						label: {color: 'aqua', fontFamily: 'cursive'}
					}}>
						Crazy button
					</RaisedButton>
				</Example.Demo>
			</Example>

			{`
			Also, value of \`styles\` prop can be a function,
			that takes current props and state of the component and returns an object with styles.
			This function will be called on every render.

			It allows to set different styles depending on the state of the component,
			providing possibility similar to nesting in CSS
			(\`.component_someState .component__element { ... }\`).
			`}

			<Example>
				<Example.Code>{`
					<RaisedButton styles={(props, state) => {
						let root = {background: 'blue'}
						let label = {color: 'aqua', fontFamily: 'cursive'}
						if (state.tapState === 'hovered' || state.tapState === 'active') {
							root.background = 'indigo'
						}
						return {root, label}
					}}>
						Crazy button
					</RaisedButton>
				`}</Example.Code>
				<Example.Demo>
					<RaisedButton styles={(props, state) => {
						let root = {background: 'blue'}
						let label = {color: 'aqua', fontFamily: 'cursive'}
						if (state.tapState === 'hovered' || state.tapState === 'active') {
							root.background = 'indigo'
						}
						return {root, label}
					}}>
						Crazy button
					</RaisedButton>
				</Example.Demo>
			</Example>

			{`
			In order to make reusable components with modified styles, you can
			use inheritance.
			To compose original styles definition with additional styles you can
			use function \`composeStyles\`.
			`}

			<Example.Code>{`
				import composeStyles from
					'clear-ui-base/lib/utils/stylesMixin/composeStyles'

				class CrazyButton extends RaisedButton {
					static styles = composeStyles(
						RaisedButton.styles, // original styles
						(props, state) => {
							// additional styles
						}
					)
				}

				<CrazyButton>Reusable crazy button</CrazyButton>
			`}</Example.Code>

			<h2>Child Components</h2>

			{`
			One more way to modify components is to modify their child components.

			For this components use \`ChildComponentsMixin\`.
			It allows to change any props of child components and
			even change one implementation with another with compatible API.

			It takes components from the static property \`childComponents\`.
			It is an object with components
			or functions that take arguments \`prop\` and \`state\` and return component.

			Function \`composeChildComponents\` composes multiple definitions of child components.
			Also, it adds third argument \`defaultComponent\`,
			that allows to extend child components in the chain.
			`}

			<Example>
				<Example.Code>{`
					class CrazySelect extends Select {
						static childComponents = composeChildComponents(Select.childComponents, {
							button: <CrazyButton/>
						})
					}

					class ColorSelect extends Select {
						static childComponents = composeChildComponents(Select.childComponents, {
							button: (props, state, defaultButton) {
								return React.cloneElement(defaultButton, {color: props.color})
							}
						})
					}

					<CrazySelect>
						<MenuItem>First item</MenuItem>
						<MenuItem>Second item</MenuItem>
					</CrazySelect>

					<ColorSelect color='green'>
						<MenuItem>First item</MenuItem>
						<MenuItem>Second item</MenuItem>
					</ColorSelect>
				`}</Example.Code>
				<Example.Demo>
					<CrazySelect>
						<MenuItem>First item</MenuItem>
						<MenuItem>Second item</MenuItem>
					</CrazySelect>

					{' '}

					<ColorSelect color='green'>
						<MenuItem>First item</MenuItem>
						<MenuItem>Second item</MenuItem>
					</ColorSelect>
				</Example.Demo>
			</Example>

			{`
			Also, you can use \`ChildComponentsMixin\` in combination with the \`StylesMixin\`,
			to modify styles of child components depending on the state of the parent component.
			It is similar to using context in CSS:
			`}

			<Example.Code lang='css'>{`
				.component_someState {
					.childComponent { ...  }
					.childComponents__someState { ...  }
				}
			`}</Example.Code>
		</DocPage>
	}
}





