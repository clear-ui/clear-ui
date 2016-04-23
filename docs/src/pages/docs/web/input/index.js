import React from 'react'

import Icon from 'clear-ui-base/lib/icon'
import Input from 'clear-ui-simple/lib/input'

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
			<h1>Web<DocPage.ArrowIcon/>Input</h1>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<p>
						<InputDemo value='test'/>
					</p>
					<p>
						<InputDemo placeholder='placeholder'/>
					</p>
					<p>
						<InputDemo disabled={true} value='disabled'/>
					</p>
					<p>
						<InputDemo invalid={true} value='invalid'/>
					</p>
				</Example.Demo>
				<Example.Code lang='xml'>{`
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Height</h3>

			<Example>
				<Example.Demo>
					<Input height='small' value='small'/>
					{' '}
					<Input value='default'/>
					{' '}
					<Input height='big' value='big'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
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

			<h2>API</h2>

			<h3>Props</h3>

			<ApiDoc>
				<ApiDoc.Row label='align'>{`
					Type: \`'begin'|'center'|'end'\`
					<br/>
					Default: \`'center'\`

					Align of the tooltip on the side of the element.
				`}</ApiDoc.Row>
			</ApiDoc>

		</DocPage>
	}
}
