import React from 'react'
import SideNav from 'clear-ui-base/lib/sideNav'
import RaisedButton from 'clear-ui-web/lib/button/raisedButton'

export default class SideNavExample extends React.Component {
	state = {}

	render() {
		return <span>
			<RaisedButton onTap={() => { this.setState({open: true}) }}>
				Open SideNav
			</RaisedButton>
			<SideNav
				open={this.state.open}
				onClose={(value) => { this.setState({open: false}) }}
				styles={{
					sideNav: { background: 'white' },
					root: { background: 'rgba(0,0,0,0.25)' }
				}}
				animation='slide'
			>
				<h3>SideNav</h3>
				Content of the SideNav
				<br/>
				<br/>
				1
				<br/>
				<br/>
				2
			</SideNav>
		</span>
	}
}
