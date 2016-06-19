import React from 'react'

import Tooltip from 'clear-ui-web/lib/tooltip'
import RaisedButton from 'clear-ui-web/lib/button/raisedButton'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import TooltipExample from './example.js'
import tooltipExampleCode from '!raw!./example.js'

import webDocs from '../../../../../docgen/web.json'
let tooltipPropsDoc = webDocs['tooltip/index.js'].props

export default class TooltipDoc extends React.Component {
	render() {
		let style = {
			display: 'inline-block',
			padding: '0.5rem 1rem',
			background: '#eee',
			cursor: 'default',
			userSelect: 'none',
			webkitTapHighlightColor: 'rgba(0,0,0,0)'
		}

		let tooltip = 'Content of the tooltip!'

		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Tooltip</h1>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<TooltipExample/>
				</Example.Demo>
				<Example.Code>
					{tooltipExampleCode}
				</Example.Code>
			</Example>

			{`Tooltip can be shown on hover, tap, focus or combination of these events:`}

			<Example>
				<Example.Demo>
					<Tooltip tooltip={tooltip}>
						<RaisedButton>Show on hover</RaisedButton>
					</Tooltip>
					{' '}
					<Tooltip showOnTap={true} tooltip={tooltip}>
						<RaisedButton>Show on tap</RaisedButton>
					</Tooltip>
					{' '}
					<Tooltip showOnFocus={true} tooltip={tooltip}>
						<RaisedButton>Show on hover and focus</RaisedButton>
					</Tooltip>
					{' '}
					<Tooltip showOnHover={false} showOnFocus={true} tooltip={tooltip}>
						<RaisedButton>Show on focus</RaisedButton>
					</Tooltip>
				</Example.Demo>
				<Example.Code>{`
					<Tooltip tooltip={tooltip}>
						<RaisedButton>Show on hover</RaisedButton>
					</Tooltip>
					<Tooltip showOnTap={true} tooltip={tooltip}>
						<RaisedButton>Show on tap</RaisedButton>
					</Tooltip>
					<Tooltip showOnFocus={true} tooltip={tooltip}>
						<RaisedButton>Show on hover and focus</RaisedButton>
					</Tooltip>
					<Tooltip showOnHover={false} showOnFocus={true} tooltip={tooltip}>
						<RaisedButton>Show on focus</RaisedButton>
					</Tooltip>
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Sides</h3>

			{`
			By default, tooltip automatically chooses side based on free space.
			You can specify custom list of sides in order of their priority.

			For example, this tooltip first tries to show itself at the bottom,
			and if there is not enough space it shows at the left side.
			`}

			<Example>
				<Example.Demo>
					<Tooltip sides={['bottom', 'left']} tooltip={tooltip}>
						<div style={style}>Show tooltip</div>
					</Tooltip>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Tooltip sides={['bottom', 'left']} tooltip={tooltip}>...</Tooltip>
				`}</Example.Code>
			</Example>

			<h3>Align</h3>

			{`
			Tooltip can be aligned to the beginning, end or center of the element's side.
			`}

			<Example>
				<Example.Demo>
					<Tooltip align='begin' tooltip={tooltip}>
						<div style={style}>Begin</div>
					</Tooltip>
					{' '}
					<Tooltip align='center' tooltip={tooltip}>
						<div style={style}>Center</div>
					</Tooltip>
					{' '}
					<Tooltip align='end' tooltip={tooltip}>
						<div style={style}>End</div>
					</Tooltip>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Tooltip align='begin' tooltip={tooltip}>...</Tooltip>
					<Tooltip align='center' tooltip={tooltip}>...</Tooltip>
					<Tooltip align='end' tooltip={tooltip}>...</Tooltip>
				`}</Example.Code>
			</Example>

			<h3>Size</h3>

			<Example>
				<Example.Demo>
					<Tooltip size='small' tooltip={tooltip}>
						<div style={style}>Small tooltip</div>
					</Tooltip>
					{' '}
					<Tooltip tooltip={tooltip}>
						<div style={style}>Default tooltip</div>
					</Tooltip>
					{' '}
					<Tooltip size='big' tooltip={tooltip}>
						<div style={style}>Big tooltip</div>
					</Tooltip>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Tooltip size='small' tooltip={tooltip}>...</Tooltip>
					<Tooltip tooltip={tooltip}>...</Tooltip>
					<Tooltip size='big' tooltip={tooltip}>...</Tooltip>
				`}</Example.Code>
			</Example>

			<h3>Dark style</h3>

			<Example>
				<Example.Demo>
					<Tooltip dark={true} tooltip={tooltip}>
						<div style={style}>Show tooltip</div>
					</Tooltip>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Tooltip dark={true} tooltip={tooltip}>...</Tooltip>
				`}</Example.Code>
			</Example>

			<h3>Close timeout</h3>

			{`
			Tooltip can start closing not immediately after the element loses hover,
			but after some timeout, and when hovering the tooltip, closing timer is
			disabled.
			It can be useful in situations when interaction with the tooltip is needed,
			for example to copy the text or click the link inside.
			`}

			<Example>
				<Example.Demo>
					<Tooltip
						closeTimeout={500}
						tooltip={<span>
							Tooltip text.
							{' '}
							<a href='http://google.com' target='blank'>Some link</a>
						</span>}
					>
						<div style={style}>Show tooltip</div>
					</Tooltip>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Tooltip closeTimeout={500} tooltip={tooltip}>...</Tooltip>
				`}</Example.Code>
			</Example>

			<h3>Animations</h3>

			<Example>
				<Example.Demo>
					<Tooltip tooltip={tooltip} animation={false}>
						<div style={style}>No animation</div>
					</Tooltip>
					{' '}
					<Tooltip tooltip={tooltip} animation='slide'>
						<div style={style}>Slide</div>
					</Tooltip>
					{' '}
					<Tooltip tooltip={tooltip} animation='fade'>
						<div style={style}>Fade (default)</div>
					</Tooltip>
					{' '}
					<Tooltip tooltip={tooltip} animation='scale'>
						<div style={style}>Scale</div>
					</Tooltip>
				</Example.Demo>
				<Example.Code>{`
					<Tooltip tooltip={...} animation={false}>...</Tooltip>
					<Tooltip tooltip={...} animation='slide'>...</Tooltip>
					<Tooltip tooltip={...} animation='fade'>...</Tooltip>
					<Tooltip tooltip={...} animation='scale'>...</Tooltip>
				`}</Example.Code>
			</Example>

			<h2>API</h2>

			{`
			Extends <a href='#/docs/base/tooltip'>Base > Tooltip</a>
			`}

			<h3>Props</h3>
			<PropsDoc doc={tooltipPropsDoc}/>
		</DocPage>
	}
}

