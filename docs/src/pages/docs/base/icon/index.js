import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let iconPropsDoc = baseDocs['icon/index.js'].props

import Icon from 'clear-ui-base/lib/icon'
import RaisedButton from 'clear-ui-simple/lib/button/raisedButton.js'

export default class IconDoc extends React.Component {
	render() {
		let circlePath = <path id="path2988" d="m7 0c-3.866 7.7716e-16 -7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z"/>

		let svgSprite = (
			<svg style={{position: 'absolute', width: 0, height: 0, visibility: 'hidden'}}>
				<symbol id="circle" viewBox="0 0 14 14">
					{circlePath}
				</symbol>
			</svg>
		)

		let star = Icon.ICONS.star

		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Icon</h1>

			{`
			SVG-icon can take name of SVG symbol or SVG path:
			`}

			<Example>
				<Example.Demo>
					{svgSprite}

					<div style={{width: 24, height: 24}}>
						<Icon icon='#circle'/>
					</div>

					<div style={{width: 24, height: 24}}>
						<Icon icon={Icon.ICONS.circle}/>
					</div>
				</Example.Demo>
			</Example>

			{`
			By default icons are stretched to all available space.
			They are used when component provide container for icon with unknown size,
			for example in buttons or inputs.
			`}

			<Example>
				<Example.Demo>
					<RaisedButton leftIcon={<Icon icon={star}/>}>Button with icon</RaisedButton>
				</Example.Demo>
				<Example.Code>{`
					<RaisedButton leftIcon={<Icon icon={star}/>}>Button with icon</RaisedButton>
				`}</Example.Code>
			</Example>

			<h2>Inline</h2>

			{`
			Inline icon sets specified sizes and aligns itself with the text.
			`}

			<Example>
				<Example.Demo>
					<div>
						<Icon icon={star} inline={true}/>
						{' '}
						Some text
					</div>

					<div style={{lineHeight: '4rem', fontSize: '2rem', border: '1px solid #ccc'}}>
						<Icon icon={Icon.ICONS.star} inline={true} size='3rem'/>
						{' '}
						Different size of the icon and text.
					</div>
				</Example.Demo>
			</Example>

			<h2>Icon Props</h2>

			<PropsDoc doc={iconPropsDoc}/>
		</DocPage>
	}
}
