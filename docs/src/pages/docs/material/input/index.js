import React from 'react'

import Icon from 'clear-ui-base/lib/icon'
import Input from 'clear-ui-material/lib/input'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import materialDocs from '../../../../../docgen/material.json'
let inputPropsDoc = materialDocs['input/index.js'].props

class InputDemo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {value: this.props.value}
	}

	render() {
		return <Input {...this.props} value={this.state.value}
			onChange={(value) => { this.setState({value}) }}/>
	}
}

export default class InputDoc extends React.Component {
	render() {
		let searchIcon = <Icon icon={Icon.ICONS.search}/>
		let closeIcon = <Icon icon={Icon.ICONS.close}/>

		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Input</h1>

			<a
				href='https://www.google.com/design/spec/components/text-fields.html'
				target='blank'
			>
				Text fields specification
			</a>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<InputDemo value='value'/>
					<InputDemo disabled={true} value='disabled'/>
					<InputDemo label='label'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Input value='value'/>
					<Input disabled={true} value='disabled'/>
					<Input label='label'/>
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Dense</h3>

			Smaller size of the input.

			<Example>
				<Example.Demo>
					<InputDemo dense={true} value='value' label='floating label'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Input dense={true} value='value' label='floating label'/>
				`}</Example.Code>
			</Example>

			<h3>Icon</h3>

			<Example>
				<Example.Demo>
					<InputDemo value='input' label='floating label' icon={searchIcon}/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Input value='input' label='floating label' icon={searchIcon}/>
				`}</Example.Code>
			</Example>

			<h3>Label type</h3>

			{`
			By default input automatically chooses type of the label –
			when input is focused or has value, label floats above the input.
			Also, you can use always floating or always inline label.
			`}

			<Example>
				<Example.Demo>
					<InputDemo value='input' label='auto label'/>
					<InputDemo label='floating label' labelType='floating'/>
					<InputDemo label='inline label' labelType='inline'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Input value='input' label='auto label'/>
					<Input label='floating label' labelType='floating'/>
					<Input label='inline label' labelType='inline'/>
				`}</Example.Code>
			</Example>


			<h3>Multiline</h3>

			{`
			Multiline inputs grow automatically when you enter more text.
			You can set number of lines and maximum number of lines.
			Also, labels in multiline inputs can be longer than one line.
			`}

			<Example>
				<Example.Demo>
					<InputDemo multiline={true}
						value='value' label='multiline input'/>
					<InputDemo multiline={true}
						rows={2}
						maxRows={4}
						labelType='inline'
						label={
							<span>
								rows = 2, maxRows = 4<br/>
								second line of the label
							</span>
						}
					/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Input multiline={true}
						value='value' label='multiline with two rows'/>
					<Input multiline={true}
						rows={2}
						maxRows={4}
						labelType='inline'
						label={
							<span>
								rows = 2, maxRows = 4<br/>
								second line of the label
							</span>
						}
					/>
				`}</Example.Code>
			</Example>

			<h2>Props</h2>

			<PropsDoc
				doc={inputPropsDoc}
				base={{name: 'Base > Input', url: '#/docs/base/input'}}
			/>
		</DocPage>
	}
}

