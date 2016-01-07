import React from 'react'

import Dialog from 'clear-ui-material/lib/dialog'
import FlatButton from 'clear-ui-material/lib/button/flatButton'
import RaisedButton from 'clear-ui-material/lib/button/raisedButton'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'

class DialogDemo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return <div>
			<RaisedButton onTap={() => { this.setState({open: true}) }}>Open dialog</RaisedButton>
			<Dialog
				{...this.props}
				open={this.state.open}
				onClose={(value) => { this.setState({open: false}) }}
			>
				{this.props.children}
			</Dialog>
		</div>
	}
}

export default class ModalDoc extends React.Component {
	render() {

		return <DocPage>
			<h1>Material/Dialog</h1>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<DialogDemo
						animation='scale'
						header='Dialog header'
						actions={[
							<FlatButton primary={true}>Cancel</FlatButton>,
							<FlatButton accent={true}>Submit</FlatButton>
						]}
					>
						Dialog content
					</DialogDemo>

					<DialogDemo
						animation='fade'
						header='Dialog header'
						actions={
							'actions'
						}
					>
						Dialog content
					</DialogDemo>

					<DialogDemo
						animation='slideDown'
						header='Dialog header'
						actions={
							'actions'
						}
					>
						Dialog content
					</DialogDemo>

				</Example.Demo>
				<Example.Code lang='xml'>{`
				`}</Example.Code>
			</Example>

			<h2>Focus management/handling</h2>

			<h2>Animations</h2>

			<h2>Width?</h2>

			<h2>API</h2>

			<h3>Props</h3>

			<ApiDoc>
				<ApiDoc.Row label='width'>{`
					Type: \`number|string\`

					Width of the modal (value of the CSS width property).
				`}</ApiDoc.Row>

				<ApiDoc.Row label='closeOnClickOutside'>{`
					Type: \`boolean\`
					<br/>
					Default: \`true\`

					Close on click outside of the dialog window.
				`}</ApiDoc.Row>

				<ApiDoc.Row label='closeOnClick'>{`
					Type: \`boolean\`
					<br/>
					Default: \`false\`

					Close on click in the dialog window.
				`}</ApiDoc.Row>

				<ApiDoc.Row label='closeOnEsc'>{`
					Type: \`boolean\`
					<br/>
					Default: \`true\`

					Close on pressing \`Esc\` key.
				`}</ApiDoc.Row>
			</ApiDoc>

			<h3>Styleable elements</h3>

			root, ?, header, content, actions
		</DocPage>
	}
}
