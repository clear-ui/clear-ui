import React from 'react'

import Checkbox from 'clear-ui-material/lib/checkbox'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

class CheckboxDemo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: this.props.value}
	}

	render() {
		return (
			<Checkbox
				{...this.props}
				value={this.state.value}
				onChange={(value) => { this.setState({value}) }}
			>
				{this.props.children}
			</Checkbox>
		)
	}
}

export default class CheckboxDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Material > Checkbox</h1>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<CheckboxDemo>Checkbox</CheckboxDemo>
					<CheckboxDemo value={true}>Checked checkbox</CheckboxDemo>
					<CheckboxDemo disabled={true}>Disabled checkbox</CheckboxDemo>
					<CheckboxDemo value={true} disabled={true}>
						Checked disabled checkbox
					</CheckboxDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Checkbox>Checkbox</Checkbox>
					<Checkbox value={true}>Checked checkbox</Checkbox>
					<Checkbox disabled={true}>Disabled checkbox</Checkbox>
				`}</Example.Code>
			</Example>

		</DocPage>
	}
}
