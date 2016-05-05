import React from 'react'

import Checkbox from 'clear-ui-web/lib/checkbox'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

import CheckboxExample from './example.js'
import checkboxExampleCode from '!raw!./example.js'

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
					<CheckboxExample/>
				</Example.Demo>
				<Example.Code>
					{checkboxExampleCode}
				</Example.Code>
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
