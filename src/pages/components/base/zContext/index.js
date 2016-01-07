import React from 'react'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

export default class ZContextDoc {
	render() {
		return <DocPage>
			<h1>Base > ZContext</h1>

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

			<ApiDoc>
				<ApiDoc.Row
					name='open'
				>{`
				`}
				</ApiDoc.Row>

				<ApiDoc.Row
					name='onClose'
					type='function'
				>{`
					Function that is called when layer requests close.
				`}
				</ApiDoc.Row>

				<ApiDoc.Row
					name='type'
					type='string'
					defaultValue='popup'
				>{`
					Layer type. It affects order of layers.

					Possible layer types in order of their priority:
					initial, popup, fixed, modal, notify.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='global'
					type='bolean'
				>{`
					When \`true\`, layer is rendered in the top context.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='onRender'
					type='function'
				>{`
					Function that is called when content is rendered in the layer.
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='closeOnEsc'
					type='boolean'
					default='true'
				>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='overlay'
					type='boolean'
				>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row
					name='closeOnOverlayClick'
					type='boolean'
				>{`
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
