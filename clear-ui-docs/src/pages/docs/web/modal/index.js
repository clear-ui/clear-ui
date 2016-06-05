import React from 'react'

import Input from 'clear-ui-web/lib/input'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'

import ModalExample from './example.js'
import modalExampleCode from '!raw!./example.js'
import ReusableModalExample from './reusableExample.js'

export default class ModalDoc extends React.Component {
	render() {
		let content = 'Content'

		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Modal</h1>

			{`
			Modal displays content in the window above the page.
			`}

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<ModalExample/>
				</Example.Demo>
				<Example.Code>
					{modalExampleCode}
				</Example.Code>
			</Example>

			{`
			## Long content

			When modal is bigger than screen's height,
			scroll appears on the right side of the screen.
			`}

			<Example>
				<Example.Demo>
					<ReusableModalExample>
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
					</ReusableModalExample>
				</Example.Demo>
			</Example>

			<h2>Animations</h2>

			<Example>
				<Example.Demo>
					<ReusableModalExample buttonText={'Fade (default)'} animation='fade'>
						Fade
					</ReusableModalExample>
					{' '}
					<ReusableModalExample buttonText='Scale' animation='scale'>
						Scale
					</ReusableModalExample>
					{' '}
					<ReusableModalExample buttonText='SlideDown' animation='slideDown'>
						Slide down
					</ReusableModalExample>
					{' '}
					<ReusableModalExample buttonText='No animation' animation={false}>
						No animation
					</ReusableModalExample>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Modal animation='fade'>...<Modal>
					<Modal animation='scale'>...<Modal>
					<Modal animation='slideDown'>...<Modal>
					<Modal animation={false}>...<Modal>
				`}</Example.Code>
			</Example>

			<h2>API</h2>

			{`
			Extends <a href='#/docs/base/modal'>Base > Modal</a>
			`}

		</DocPage>
	}
}
