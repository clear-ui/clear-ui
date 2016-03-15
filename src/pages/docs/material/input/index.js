import React from 'react'

import Icon from 'clear-ui-base/lib/icon'
import Input from 'clear-ui-material/lib/input'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'

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

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/components/base/input' style={{
						textDecoration: 'none',
						color: 'rgb(57, 123, 230)',
						fontWeight: 500
					}}>Base > Input props</a>
				</ApiDoc.Row>

				<ApiDoc.Row
					name='dense'
					type='boolean'
				>{`
					Smaller size of the input.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='label'
					type='node'
				>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='labelType'
					type={`'floating' | 'inline' | 'auto'`}
					defaultValue='auto'
				>{`
					Type of the label.

					\`floating\` – Label floats above the input.<br/>
					\`inline\` – Label is displayed in place of the value.<br/>
					\`auto\` – Type of the label is chosen automatically –
					when input is focused or has value, label becomes floating.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='icon'
					type='node'
				>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='error'
					type='node'
				>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='underlineAnimation'
					type='boolean'
					defaultValue='true'
				>{`
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}

