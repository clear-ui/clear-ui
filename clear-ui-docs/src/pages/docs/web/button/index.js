import React from 'react'

import RaisedButton from 'clear-ui-web/lib/button/raisedButton'
import FlatButton from 'clear-ui-web/lib/button/flatButton'
import OutlinedButton from 'clear-ui-web/lib/button/outlinedButton'

import Icon from 'clear-ui-base/lib/icon'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import webDocs from '../../../../../docgen/web.json'
let buttonPropsDoc = webDocs['button/webButton.js'].props

import ButtonExample from './example.js'
import buttonExampleCode from '!raw!./example.js'

export default class ButtonDoc extends React.Component {
	render() {
		let starIcon = <Icon icon={Icon.ICONS.star}/>
		let searchIcon = <Icon icon={Icon.ICONS.search}/>
		let triangleIcon = <Icon icon={Icon.ICONS.triangleDown}/>

		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Button</h1>

			<h2>Example</h2>

			There are three types of buttons: raised, flat and outlined.

			<Example>
				<Example.Demo>
					<ButtonExample/>
				</Example.Demo>
				<Example.Code>
					{buttonExampleCode}
				</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Disabled</h3>

			<Example>
				<Example.Demo>
					<RaisedButton disabled={true}>Raised button</RaisedButton>
					{' '}
					<FlatButton disabled={true}>Flat button</FlatButton>
					{' '}
					<OutlinedButton disabled={true}>Outlined button</OutlinedButton>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<RaisedButton disabled={true}>Raised button</Button>
					<FlatButton disabled={true}>Flat button<FlatButton>
					<OutlinedButton disabled={true}>Outlined button</OutlinedButton>
				`}</Example.Code>
			</Example>

			<h3>Invalid</h3>

			<Example>
				<Example.Demo>
					<RaisedButton invalid={true}>Raised button</RaisedButton>
					{' '}
					<FlatButton invalid={true}>Flat button</FlatButton>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<RaisedButton invalid={true}>Raised button</Button>
					<FlatButton invalid={true}>Flat button<FlatButton>
				`}</Example.Code>
			</Example>

			*`OutlinedButton` does not support `invalid`.*

			<h3>Icons</h3>

			Buttons can have icons on the left and right sides.

			<Example>
				<Example.Demo>
					<RaisedButton leftIcon={searchIcon}>Left icon</RaisedButton>
					{' '}
					<OutlinedButton leftIcon={starIcon}>Left icon</OutlinedButton>
					{' '}
					<RaisedButton height='big' rightIcon={triangleIcon}>
						Right icon
					</RaisedButton>
					{' '}
					<RaisedButton disabled={true} height='small'
						leftIcon={searchIcon} rightIcon={triangleIcon}>
						Two icons
					</RaisedButton>
					{' '}
					<RaisedButton leftIcon={searchIcon}/>
				</Example.Demo>
				<Example.Code lang='js'>{`
					<RaisedButton leftIcon={searchIcon}>Left icon</RaisedButton>
					<OutlinedButton leftIcon={starIcon}>Left icon</OutlinedButton>
					<RaisedButton height='big' rightIcon={triangleIcon}>
						Right icon
					</RaisedButton>
					<RaisedButton disabled={true} height='small'
						leftIcon={searchIcon} rightIcon={triangleIcon}>
						Two icons
					</RaisedButton>
					<RaisedButton leftIcon={searchIcon}/>
				`}</Example.Code>
			</Example>

			<h3>Height</h3>

			Button's height can be set to one of predefined values.

			<Example>
				<Example.Demo>
					<RaisedButton height='small'>Small</RaisedButton>
					{' '}
					<RaisedButton>Default</RaisedButton>
					{' '}
					<RaisedButton height='big'>Big</RaisedButton>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<RaisedButton height='small'>Small</RaisedButton>
					<RaisedButton>Default</RaisedButton>
					<RaisedButton height='big'>Big</RaisedButton>
				`}</Example.Code>
			</Example>

			<h3>Color</h3>

			Buttons can have different colors.

			<Example>
				<Example.Demo>
					<RaisedButton color='blue'>Blue</RaisedButton>
					{' '}
					<RaisedButton color='green'>Green</RaisedButton>
					{' '}
					<RaisedButton color='red'>Red</RaisedButton>

					<br/><br/>

					<FlatButton color='blue'>Blue</FlatButton>
					{' '}
					<FlatButton color='green'>Green</FlatButton>
					{' '}
					<FlatButton color='red'>Red</FlatButton>

					<br/><br/>

					<OutlinedButton color='blue'>Blue</OutlinedButton>
					{' '}
					<OutlinedButton color='green'>Green</OutlinedButton>
					{' '}
					<OutlinedButton color='red'>Red</OutlinedButton>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<RaisedButton color='blue'>Blue</RaisedButton>
					<RaisedButton color='green'>Green</RaisedButton>
					<RaisedButton color='red'>Red</RaisedButton>
				`}</Example.Code>
			</Example>

			<h2>API</h2>

			{`
				Extends <a href='#/docs/base/button'>Base > Button > IconButton</a>
			`}

			<h3>Props</h3>

			<PropsDoc doc={buttonPropsDoc}/>
		</DocPage>
	}
}

