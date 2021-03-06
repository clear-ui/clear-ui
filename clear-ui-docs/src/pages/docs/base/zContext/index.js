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
			ZContext is a component for managing vertical ordering of layers.
			Layers create own vertical contexts.
			Contexts created with \`z-index\` or with other css properties
			do not affect ordering of layers.

			Order of layers in the same context is defined by their types.
			Layers with higher priority will have higher \`z-index\`.

			Possible layer types in order of their priority:

			- initial
			- popup
			- fixed
			- modal
			- global
			`}

			<DocPage.Note>
				Page can have only one instance of <code>ZContext</code>.
				It must be placed at the top left corner of the page.
			</DocPage.Note>

			<h2>Example</h2>

			<Example>
				<Example.Code lang='xml'>{`
					<ZContext>initial</ZContext>
					<ZContextLayer type='modal'>modal</ZContextLayer>
					<ZContextLayer type='popup'>popup</ZContextLayer>
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
						<ZContextLayer type='popup'>popup</ZContextLayer>
						<ZContextLayer type='modal'>
							modal
							<ZContextLayer type='popup'>popup in the modal</ZContextLayer>
						</ZContextLayer>
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
