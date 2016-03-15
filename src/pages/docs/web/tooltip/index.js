import React from 'react'

import Tooltip from 'clear-ui-simple/lib/tooltip'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'

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
					<Tooltip tooltip={tooltip}>
						<div style={style}>Show tooltip on hover</div>
					</Tooltip>
					{' '}
					<Tooltip tooltip={tooltip} showOnClick={true}>
						<div style={style}>Show/hide tooltip on click</div>
					</Tooltip>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					let tooltip = 'Content of the tooltip!'

					<Tooltip tooltip={tooltip}>
						<div style={style}>Show tooltip on hover</div>
					</Tooltip>

					<Tooltip tooltip={tooltip} showOnClick={true}>
						<div style={style}>Show tooltip on click</div>
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

			<h3>Animations</h3>

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

			<h3>Props</h3>

			<ApiDoc>
				<ApiDoc.Row label='size'>{`
					Type: \`string\`

					Size of the tooltip.
					Possible values: \`small\`, \`default\`, \`big\`.
				`}</ApiDoc.Row>

				<ApiDoc.Row label='dark'>{`
					Type: \`boolean\`

					Dark style of the tooltip.
				`}</ApiDoc.Row>

				<ApiDoc.Row label='showOnHover'>{`
					Type: \`boolean\`
					<br/>
					Default: \`true\`
				`}</ApiDoc.Row>

				<ApiDoc.Row label='showOnClick'>{`
					Type: \`boolean\`
					<br/>
					Default: \`false\`
				`}</ApiDoc.Row>

				<ApiDoc.Row label='sides'>{`
					Type: \`array\`
					<br/>
					Default: \`['top', 'right', 'bottom', 'left']\`

					List of sides where tooltip can be shown in the order of priority.
				`}</ApiDoc.Row>

				<ApiDoc.Row label='align'>{`
					Type: \`'begin'|'center'|'end'\`
					<br/>
					Default: \`'center'\`

					Align of the tooltip on the side of the element.
				`}</ApiDoc.Row>

			</ApiDoc>

			{`
			showTimeout
			hideTimeout
			animation?
			closeButton?
			`}

		</DocPage>
	}
}

