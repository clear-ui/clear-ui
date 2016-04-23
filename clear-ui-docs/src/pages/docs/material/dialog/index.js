import React from 'react'
import {Link} from 'react-router'

import Dialog from 'clear-ui-material/lib/dialog'
import FlatButton from 'clear-ui-material/lib/button/flatButton'
import RaisedButton from 'clear-ui-material/lib/button/raisedButton'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'

import DialogExample from './example.js'
import dialogExampleCode from '!raw!./example.js'

class DialogDemo extends React.Component {
	static defaultProps = {
		buttonText: 'Open dialog'
	}

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		let header = 'Dialog header'
		let content = 'Dialog content'
		let actions = [
			<FlatButton primary={true} onTap={() => { this.setState({dialogOpen: false}) }}>
				Cancel
			</FlatButton>,
			<FlatButton accent={true} onTap={() => { this.setState({dialogOpen: false}) }}>
				OK
			</FlatButton>
		]

		return <span>
			<FlatButton onTap={() => { this.setState({dialogOpen: true}) }}>
				{this.props.buttonText}
			</FlatButton>
			<Dialog
				{...this.props}
				header={header}
				actions={actions}
				open={this.state.dialogOpen}
				onClose={(value) => { this.setState({dialogOpen: false}) }}
			>
				{content}
			</Dialog>
		</span>
	}
}

export default class DialogDoc extends React.Component {
	render() {

		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Dialog</h1>

			{`
			Dialogs contain text and UI controls focused on a specific task.
			They inform users about critical information, require users to make decisions,
			or involve multiple tasks.
			`}

			<a
				href='https://www.google.com/design/spec/components/dialogs.html'
				target='blank'
			>
				Dialog specification
			</a>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<DialogExample/>
				</Example.Demo>
				<Example.Code>
					{dialogExampleCode}
				</Example.Code>
			</Example>

			<h2>Animations</h2>

			<Example>
				<Example.Demo>
					<DialogDemo buttonText='Fade (default)' animation='fade'/>
					{' '}
					<DialogDemo buttonText='Scale' animation='scale'/>
					{' '}
					<DialogDemo buttonText='SlideDown' animation='slideDown'/>
					{' '}
					<DialogDemo buttonText='No animation' animation={false}/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Dialog animation='fade'>...</Dialog>
					<Dialog animation='scale'>...</Dialog>
					<Dialog animation='slideDown'>...</Dialog>
					<Dialog animation={false}>...</Dialog>
				`}</Example.Code>
			</Example>

			<h2>Width?</h2>

			<h2>API</h2>

			<h3>Props</h3>

			<ApiDoc>
				<ApiDoc.Row>
					<Link to='/docs/base/modal'>Base > Modal Props</Link>
				</ApiDoc.Row>

				<ApiDoc.Row name='header' type='node'>{`
					The title of the dialog.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='actions' type='node'>{`
					Actions to render in the dialog.
				`}</ApiDoc.Row>
			</ApiDoc>

			<h3>Styleable elements</h3>

			root, ?, header, content, actions
		</DocPage>
	}
}
