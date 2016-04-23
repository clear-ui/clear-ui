import React from 'react'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let zContextLayerPropsDoc = baseDocs['zContext/layer.js'].props

export default class ZContextDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>ZContext</h1>

			{`
			ZContext is a component that manages vertical ordering of layers.
			It must be placed at the top level in the \`<body>\`.

			Layers create own vertical contexts.
			Contexts created with \`z-index\` or with other css properties
			do not affect ordering of layers.

			Order of layers in the same context is defined by layers types.
			Layers with higher priority will have higher \`z-index\`.

			Possible layer types in order of their priority:

			- initial
			- popup
			- fixed
			- modal
			- notify
			`}

			<h2>Example</h2>

			<Example>
				<Example.Code lang='xml'>{`
					<ZContext>initial</ZContext>
					<ZContext.Layer type='modal'>modal</ZContext.Layer>
					<ZContext.Layer type='popup'>popup</ZContext.Layer>
				`}</Example.Code>
			</Example>

			{`
			will be rendered as:
			`}

			<Example>
				<Example.Code lang='xml'>{`
					<div>
						<div style="z-index: 0">initial</div>
						<div style="z-index: 1">popup</div>
						<div style="z-index: 2">modal</div>
					</div>
				`}</Example.Code>
			</Example>

			<h2>Nesting</h2>

			{`
			Layers can be nested:
			`}

			<Example>
				<Example.Code lang='xml'>{`
					<ZContext>
						initial
						<ZContext.Layer type='popup'>popup</ZContext.Layer>
						<ZContext.Layer type='modal'>
							modal
							<ZContext.Layer type='popup'>popup in the modal</ZContext.Layer>
						</ZContext.Layer>
					</ZContext>
				`}</Example.Code>
			</Example>

			{`
			Result:
			`}

			<Example>
				<Example.Code lang='xml'>{`
					<div>
						<div style="z-index: 0">initial</div>
						<div style="z-index: 1">popup</div>
						<div style="z-index: 2">modal</div>
						<div style="z-index: 3">popup in the modal</div>
					</div>
				`}</Example.Code>
			</Example>

			<h2>ZContextLayer props</h2>

			<PropsDoc doc={zContextLayerPropsDoc}/>
		</DocPage>
	}
}
