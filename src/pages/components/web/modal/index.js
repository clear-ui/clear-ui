import React from 'react'

import Modal from 'clear-ui-simple/lib/modal'
import Button from 'clear-ui-simple/lib/button/raisedButton'
/*import Input from 'clear-ui/lib/input'*/

import DocPage from '../../../../docPage'
import Example from '../../../../example'

class ModalDemo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return <div>
			<Button onTap={() => { this.setState({open: true}) }}>Open modal</Button>
			<Modal
				{...this.props}
				open={this.state.open}
				onClose={(value) => { this.setState({open: false}) }}
			>
				{this.props.children}
			</Modal>
		</div>
	}
}

export default class ModalDoc extends React.Component {
	render() {

		return <DocPage>
			<h1>Web/Modal</h1>

			{`
			Modal displays content in the window above the page.

			On open modal sets focus on the first focusable element inside.
			Also it restricts moving focus outside of the modal, e.g. with \`tab\` key.
			On close it returns focus to the element that was focused before.
			`}

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<ModalDemo>
						<h3>Modal</h3>
						<p>
							First input: {/*<Input/>*/}
						</p>
						<p>
							Second input: {/*<Input/>*/}
						</p>
					</ModalDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Button onClick={() => { this.setState({modalIsOpen: true}) }}>
						Open modal
					</Button>

					<Modal mods={{open: this.state.modalIsOpen}}
						onSetMod={{open: (value) => { this.setState({modalIsOpen: value}) }}}>
						{/* content */}
					</Modal>
				`}</Example.Code>
			</Example>

			{`
			## ....
			`}

			<Example>
				<Example.Demo>
					<ModalDemo>
						modal
					</ModalDemo>
				</Example.Demo>
			</Example>


			{`
			## Long content
			`}

			<Example>
				<Example.Demo>
					<ModalDemo>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
						<p>content</p>
					</ModalDemo>
				</Example.Demo>
			</Example>

			<h2>API</h2>

			<h3>Mods</h3>

			{`
			### width

			**TODO**

			### alignTop

			**TODO**
			`}

			<h3>Props</h3>

			{`
			### showCloseButton

			Type: \`boolean\`<br/>
			Default: \`true\`

			**TODO**

			### showOverlay

			Type: \`boolean\`<br/>
			Default: \`true\`

			### closeOnOverlayClick

			Type: \`boolean\`<br/>
			Default: \`true\`

			### closeOnEsc

			Type: \`boolean\`<br/>
			Default: \`true\`

			### closeOnClick

			Type: \`boolean\`<br/>
			Default: \`false\`
			`}
		</DocPage>
	}
}
