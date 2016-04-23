import React from 'react'

import Checkbox from 'clear-ui-web/lib/checkbox'

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
			<h1>Web<DocPage.ArrowIcon/>Checkbox</h1>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<CheckboxDemo>Checkbox</CheckboxDemo>
					<CheckboxDemo value={true}>Checked checkbox</CheckboxDemo>
					<CheckboxDemo disabled={true}>Disabled checkbox</CheckboxDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Checkbox>Checkbox</Checkbox>
					<Checkbox value={true}>Checked checkbox</Checkbox>
					<Checkbox disabled={true}>Disabled checkbox</Checkbox>
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Height</h3>

			<Example>
				<Example.Demo>
					<CheckboxDemo height='small'>Small</CheckboxDemo>
					<CheckboxDemo>Default</CheckboxDemo>
					<CheckboxDemo height='big'>Big</CheckboxDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<CheckboxDemo height='small'>Small</CheckboxDemo>
					<CheckboxDemo>Default</CheckboxDemo>
					<CheckboxDemo height='big'>Big</CheckboxDemo>
				`}</Example.Code>
			</Example>
		</DocPage>
	}
}
