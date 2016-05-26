import React from 'react'

import Tooltip from 'clear-ui-material/lib/tooltip'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import TooltipExample from './example.js'
import tooltipExampleCode from '!raw!./example.js'

import materialDocs from '../../../../../docgen/material.json'
let tooltipPropsDoc = materialDocs['tooltip/index.js'].props

export default class TooltipDoc extends React.Component {
	render() {
		let style = {
			display: 'inline-block',
			padding: '0.5rem 1rem',
			background: '#eee',
			cursor: 'default',
			userSelect: 'none',
			WebkitUserSelect: 'none',
			WebkitTapHighlightColor: 'rgba(0,0,0,0)'
		}

		let tooltip = 'Content of the tooltip!'

		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>Tooltip</h1>

			{`
			Tooltips are text labels that appear when the user hovers over,
			focuses on, or touches an element.
			`}

			<a href='https://www.google.com/design/spec/components/tooltips.html' target='_blank'>
				Tooltip specification
			</a>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<TooltipExample/>
				</Example.Demo>
				<Example.Code>
					{tooltipExampleCode}
				</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Desktop</h3>

			Tooltips for desktop are smaller.

			<Example>
				<Example.Demo>
					<Tooltip desktop={true} tooltip={tooltip}>
						<div style={style}>Tooltip</div>
					</Tooltip>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Tooltip desktop={true} tooltip={tooltip}>...</Tooltip>
				`}</Example.Code>
			</Example>

			<h3>Sides</h3>

			{`
			By default, tooltip automatically chooses side based on free space around,
			starting from top.
			You can specify custom list of sides in order of their priority.

			For example, this tooltip first tries to show itself at the bottom,
			and if there is not enough space it shows at the left side.
			`}

			<Example>
				<Example.Demo>
					<Tooltip sides={['bottom', 'left']} tooltip={tooltip}>
						<div style={style}>Tooltip</div>
					</Tooltip>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Tooltip sides={['bottom', 'left']} tooltip={tooltip}>...</Tooltip>
				`}</Example.Code>
			</Example>

			<h2>Animations</h2>

			<Example>
				<Example.Demo>
					<Tooltip tooltip={tooltip} animation={false}>
						<div style={style}>No animation</div>
					</Tooltip>
					{' '}
					<Tooltip tooltip={tooltip} animation='slide'>
						<div style={style}>Slide (default)</div>
					</Tooltip>
					{' '}
					<Tooltip tooltip={tooltip} animation='fade'>
						<div style={style}>Fade</div>
					</Tooltip>
					{' '}
					<Tooltip tooltip={tooltip} animation='scale'>
						<div style={style}>Scale</div>
					</Tooltip>
				</Example.Demo>
			</Example>

			<h2>API</h2>

			{`
			Extends <a href='#/docs/material/tooltip'>Base > Tooltip</a>
			`}

			<h3>Props</h3>
			<PropsDoc doc={tooltipPropsDoc}/>
		</DocPage>
	}
}

