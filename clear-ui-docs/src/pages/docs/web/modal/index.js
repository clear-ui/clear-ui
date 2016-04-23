import React from 'react'

import Modal from 'clear-ui-web/lib/modal'
import Button from 'clear-ui-web/lib/button/raisedButton'
import Input from 'clear-ui-web/lib/input'

import DocPage from '../../../../docPage'
import Example from '../../../../example'

class ModalDemo extends React.Component {
	static defaultProps = {
		buttonText: 'Open modal'
	}

	constructor(props) {
		super(props)
		this.state = {}
	}

	render() {
		return <span>
			<Button onTap={() => { this.setState({open: true}) }}>
				{this.props.buttonText}
			</Button>
			<Modal
				{...this.props}
				open={this.state.open}
				onClose={(value) => { this.setState({open: false}) }}
			>
				{this.props.children}
			</Modal>
		</span>
	}
}

export default class ModalDoc extends React.Component {
	render() {
		let content = <div>
			<h3>Modal</h3>
			Content of the modal
			<br/>
			<br/>
			1 <Input/>
			<br/>
			<br/>
			2 <Input/>
		</div>

		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Modal</h1>

			{`
			Modal displays content in the window above the page.
			`}

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<ModalDemo>{content}</ModalDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Button onClick={() => { this.setState({modalIsOpen: true}) }}>
						Open modal
					</Button>

					<Modal open={this.state.modalIsOpen}
						onClose={() => { this.setState({modalIsOpen: value}) }}}>
						{/* content */}
					</Modal>
				`}</Example.Code>
			</Example>

			{`
			## Long content

			When modal is bigger than screen's height,
			scroll appears on the right side of the screen.
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

			<h2>Animations</h2>

			<Example>
				<Example.Demo>
					<ModalDemo buttonText={'Fade (default)'} animation='fade'>{content}</ModalDemo>
					{' '}
					<ModalDemo buttonText='Scale' animation='scale'>{content}</ModalDemo>
					{' '}
					<ModalDemo buttonText='SlideDown' animation='slideDown'>{content}</ModalDemo>
					{' '}
					<ModalDemo buttonText='No animation' animation={false}>{content}</ModalDemo>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Modal animation='fade'>...<Modal>
					<Modal animation='scale'>...<Modal>
					<Modal animation='slideDown'>...<Modal>
					<Modal animation={false}>...<Modal>
				`}</Example.Code>
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
