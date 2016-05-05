import React from 'react'

import Icon from 'clear-ui-base/lib/icon'
import Input from 'clear-ui-web/lib/input'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import webDocs from '../../../../../docgen/web.json'
let inputPropsDoc = webDocs['input/index.js'].props

import InputExample from './example.js'
import inputExampleCode from '!raw!./example.js'

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
			<h1>Web<DocPage.ArrowIcon/>Input</h1>

			{`Text input component.`}

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<InputExample/>
				</Example.Demo>
				<Example.Code>
					{inputExampleCode}
				</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Height</h3>

			<Example>
				<Example.Demo>
					<InputDemo height='small' value='small'/>
					{' '}
					<InputDemo value='default'/>
					{' '}
					<InputDemo height='big' value='big'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Input height='small' value='small'/>
					<Input value='default'/>
					<Input height='big' value='big'/>
				`}</Example.Code>
			</Example>

			<h3>Full width</h3>

			{`Full width input takes 100% width of the container.`}

			<Example>
				<Example.Demo>
					<InputDemo fullWidth/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<InputDemo fullWidth/>
				`}</Example.Code>
			</Example>

			<h3>Icon</h3>

			{`
			**TODO**
			Click on icon should focus input
			`}

			<Example>
				<Example.Demo>
					<Input height='small' leftIcon={searchIcon} value='small'/>
					{' '}
					<Input value='default' leftIcon={searchIcon} rightIcon={closeIcon}/>
					{' '}
					<Input value='default' leftIcon={searchIcon} rightIcon={closeIcon}
						onRightIconClick={()=>{}}/>
					{' '}
					<Input height='big' value='big'
						leftIcon={searchIcon} rightIcon={closeIcon}/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
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
