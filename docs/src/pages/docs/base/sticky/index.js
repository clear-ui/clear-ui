import React from 'react'
import $ from 'jquery'

//import Grid from 'clear-ui/lib/grid'
//import Link from 'clear-ui/lib/link'
import Sticky from 'clear-ui-base/lib/sticky'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'
import baseDocs from '../../../../../docgen/base.json'
let stickyPropsDoc = baseDocs['sticky/index.js'].props

let containerStyle = {
	height: 200,
	border: '1px solid #ccc'
}

//let oversizedContainerStyle = {
	//height: 2000,
	//border: '1px solid #ccc'
//}

let stickyStyle = {
	width: '100%',
	height: 50,
	lineHeight: '50px',
	textAlign: 'center',
	background: '#eee'
}

//let oversizedStickyStyle = Object.assign({}, stickyStyle, {height: 1500})

class Demo extends React.Component {
	render() {
		let deferred = $.Deferred()

		return <div style={containerStyle}
			ref={(elem) => {deferred.resolve(elem)}}>
			<Sticky offset={20} container={deferred}>
				<div style={stickyStyle}>
					This will be fixed at the top with offset 20px.
				</div>
			</Sticky>
			<p>
				This is container.
			</p>
		</div>
	}
}

//class OversizedDemo extends React.Component {
	//constructor(props) {
		//super(props)
		//this.state = {}
	//}

	//render() {
		//let deferred = $.Deferred()

		//return <div>
			//<Link onClick={() => { this.setState({show: !this.state.show}) }}>
				//{this.state.show ? 'Hide' : 'Show'} example
			//</Link>
			//<div style={{
				//...oversizedContainerStyle,
				//display: this.state.show ? 'block' : 'none'
			//}} ref={(elem) => {deferred.resolve(elem)}}>
				//<Grid mods={{size: 12}}>
					//<Grid.Block mods={{pos: 1, width: 8}}>
						//<p>
							//This is container.
						//</p>
					//</Grid.Block>
					//<Grid.Block mods={{pos: 9, width: 4}}>
						//<Sticky container={deferred}>
							//<div style={oversizedStickyStyle}>
								//this is sticky
							//</div>
						//</Sticky>
					//</Grid.Block>
				//</Grid>
			//</div>
		//</div>
	//}
//}

export default class StickyDoc extends React.Component {
	render() {

		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Sticky</h1>

			{`
			Sticky is a component that fixes content when it leaves viewport while scrolling.

			When content becomes fixed, component inserts placeholder
			with height equal to the height of the content.
			`}

			<h2>Example</h2>

			{`
			This example uses container.
			Sticky element is pushed to top by the lower edge of the container.

			Since you can't provide <code>ref</code> to the container element
			when it is rendered in the same <code>render()</code> function,
			you should use deferreds.
			`}

			<Example>
				<Example.Demo>
					<Demo/>
				</Example.Demo>
				<Example.Code lang='js'>{`
					let deferred = $.Deferred()

					<div style={containerStyle} ref={(elem) => {deferred.resolve(elem)}}>
						<Sticky offset={20} container={deferred}>
							<div style={stickyStyle}>
								This will be fixed at the top with offset 20px.
							</div>
						</Sticky>
						{/* ... */}
					</div>
				`}</Example.Code>
			</Example>

			{/*
			<h2>Oversized content</h2>

			{` **TODO** `}

			<Example>
				<Example.Demo>
					<OversizedDemo/>
				</Example.Demo>
			</Example>
			*/}

			<h2>Props</h2>

			<PropsDoc doc={stickyPropsDoc}/>
		</DocPage>
	}
}
