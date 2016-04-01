import React from 'react'
import {Link} from 'react-router'

import ZContext from 'clear-ui-base/lib/zContext'
import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import COLORS from 'clear-ui-simple/lib/styles/colors'

import LinkMenu, {LinkMenuItem, LinkMenuLabel} from '../../linkMenu'

@mixinDecorator(StylesMixin)
class DocsPage extends React.Component {
	static styles = {
		root: {
			display: 'flex',
			minHeight: '100%'
		},
		nav: {
			paddingTop: '1rem',
			paddingBottom: '1rem',
			background: COLORS.black5,
			width: '15rem',
			flex: '0 0 15rem'
		},
		content: {
			background: 'white',
			position: 'relative',
			flex: '1 0 auto',
			maxWidth: '90rem'
		}
	}

	render() {
		return (
			<div style={this.styles.root}>
				<div style={this.styles.nav}>
					<LinkMenu prefix='docs/'>
						<LinkMenuLabel>Guides</LinkMenuLabel>
						<LinkMenuItem value='get-started'>- Get Started</LinkMenuItem>
						<LinkMenuItem value='customization'>+/- Customization</LinkMenuItem>
						<LinkMenuItem value='server-rendering' disabled={true}>Server Rendering</LinkMenuItem>
					</LinkMenu>

					<LinkMenu prefix='docs/material/'>
						<LinkMenuLabel>Material</LinkMenuLabel>
						<LinkMenuItem value='about-material'>- About</LinkMenuItem>
						<LinkMenuItem value='themes'>+/- Themes</LinkMenuItem>

						<LinkMenuItem value='dropdown'>-- Dropdown</LinkMenuItem>

						<LinkMenuItem value='button'>Button</LinkMenuItem>

						<LinkMenuItem value='menu'>Menu</LinkMenuItem>
						<LinkMenuItem value='list'>List</LinkMenuItem>

						<LinkMenuItem value='dialog'>Dialog</LinkMenuItem>
						<LinkMenuItem value='tooltip'>Tooltip</LinkMenuItem>
						<LinkMenuItem value='snackbar'>Snackbar & Toast</LinkMenuItem>

						<LinkMenuItem value='input'>Input</LinkMenuItem>
						<LinkMenuItem value='checkbox'>Checkbox</LinkMenuItem>
						<LinkMenuItem value='radio-buttons'>Radio Buttons</LinkMenuItem>
						<LinkMenuItem value='select'>Select</LinkMenuItem>
						<LinkMenuItem disabled={true}>Slider</LinkMenuItem>
					</LinkMenu>

					<LinkMenu prefix='docs/web/'>
						<LinkMenuLabel>Web</LinkMenuLabel>
						<LinkMenuItem value='button'>Button</LinkMenuItem>

						<LinkMenuItem value='menu'>Menu</LinkMenuItem>
						<LinkMenuItem value='tree-menu'>Tree Menu</LinkMenuItem>
						<LinkMenuItem value='dropdown-menu'>Dropdown Menu</LinkMenuItem>

						<LinkMenuItem value='modal'>Modal</LinkMenuItem>
						<LinkMenuItem value='tooltip'>Tooltip</LinkMenuItem>
						<LinkMenuItem value='notifications'>Notifications</LinkMenuItem>

						<LinkMenuItem value='input'>Input</LinkMenuItem>
						<LinkMenuItem value='checkbox'>Checkbox</LinkMenuItem>
						<LinkMenuItem value='radio-buttons'>Radio Buttons</LinkMenuItem>
						<LinkMenuItem value='select'>Select</LinkMenuItem>
						<LinkMenuItem disabled={true}>Slider</LinkMenuItem>
					</LinkMenu>

					<LinkMenu prefix='docs/base/'>
						<LinkMenuLabel>Base</LinkMenuLabel>

						<LinkMenuItem value='zcontext'>ZContext</LinkMenuItem>
						<LinkMenuItem disabled={true}>Popup</LinkMenuItem>
						<LinkMenuItem disabled={true}>Attachment</LinkMenuItem>
						<LinkMenuItem disabled={true}>StylesMixin</LinkMenuItem>
						<LinkMenuItem disabled={true}>ChildComponentsMixin</LinkMenuItem>
						<LinkMenuItem disabled={true}>ManagedStateMixin</LinkMenuItem>

						<LinkMenuItem value='button'>Button</LinkMenuItem>

						<LinkMenuItem value='sticky'>Sticky</LinkMenuItem>
						<LinkMenuItem value='scrollspy'>Scrollspy</LinkMenuItem>

						<LinkMenuItem value='menu'>Menu</LinkMenuItem>
						<LinkMenuItem value='dropdown-menu'>Dropdown Menu</LinkMenuItem>
						
						<LinkMenuItem value='modal'>Modal</LinkMenuItem>
						<LinkMenuItem value='tooltip'>Tooltip</LinkMenuItem>
						<LinkMenuItem value='notifications'>Notifications</LinkMenuItem>

						<LinkMenuItem value='input'>Input</LinkMenuItem>
					</LinkMenu>
				</div>
				<div style={this.styles.content}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default DocsPage
