import React from 'react'

import {RadioGroup, RadioButton} from 'clear-ui-material/lib/radioButtons'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

class RadioButtonsDemo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: this.props.value}
	}

	render() {
		return (
			<RadioGroup
				{...this.props}
				value={this.state.value}
				onChange={(value) => { this.setState({value}) }}
			>
				<RadioButton value='1'>First option</RadioButton>
				<RadioButton value='2'>Second option</RadioButton>
				<RadioButton disabled={true} value='3'>Disabled option</RadioButton>
			</RadioGroup>
		)
	}
}

export default class RadioButtonsDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Radio Buttons</h1>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<RadioButtonsDemo value='1'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
				`}</Example.Code>
			</Example>

		</DocPage>
	}
}
