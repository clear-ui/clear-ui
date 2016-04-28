import React from 'react'

import RadioGroup from 'clear-ui-web/lib/radioButtons/radioGroup'
import RadioButton from 'clear-ui-web/lib/radioButtons/radioButton'

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

import {SegmentedControl, SegmentedControlSegment} from 'clear-ui-ios/lib/segmentedControl'

class SegmentedControlExample extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: this.props.value}
	}

	render() {
		return (
			<SegmentedControl
				{...this.props}
				value={this.state.value}
				onChange={(value) => { this.setState({value}) }}
			>
				<SegmentedControlSegment value='1'>First option</SegmentedControlSegment>
				<SegmentedControlSegment value='2'>Second option</SegmentedControlSegment>
				<SegmentedControlSegment disabled={true} value='3'>
					Disabled option
				</SegmentedControlSegment>
			</SegmentedControl>
		)
	}
}

export default class RadioButtonsDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Radio Buttons</h1>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<SegmentedControlExample value='1'/>
					<RadioButtonsDemo value='1'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
				`}</Example.Code>
			</Example>

		</DocPage>
	}
}
