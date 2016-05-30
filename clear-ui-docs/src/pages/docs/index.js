import React from 'react'
import {Link} from 'react-router'
import bowser from 'bowser'

import ZContext from 'clear-ui-base/lib/zContext'
import mixin from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import COLORS from 'clear-ui-web/lib/styles/colors'

import NavMenu, {NavMenuItem, NavMenuHeader} from '../../navMenu'

@mixin(StylesMixin)
export default class DocsPage extends React.Component {
	static displayName = 'DocsPage'

	static styles = {
		root: {
			display: 'flex',
			minHeight: '100%',
			width: '100%',
			// hack to stretch height of the child of flex container to 100% of parent
			position: 'absolute'
		},
		nav: {
			paddingTop: '2rem',
			paddingBottom: '2rem',
			background: COLORS.black5,
			width: '15rem',
			flex: '0 0 15rem'
		},
		content: {
			background: 'white',
			position: 'relative',
			flex: '1 0 auto',
			width: 0,
			maxWidth: '50rem',
			padding: '0 5rem'
		}
	}

	render() {
		return (
			<div style={{...this.styles.root}}>
				<div style={this.styles.nav}>
					<NavMenu prefix='docs/'>
						<NavMenuHeader nestedItems={[
							<NavMenuItem value='get-started'>- Get Started</NavMenuItem>,
							<NavMenuItem value='customization'>Customization</NavMenuItem>,
							<NavMenuItem value='server-rendering' disabled={true}>
								Server Rendering
							</NavMenuItem>
						]}>
							Guides
						</NavMenuHeader>
					</NavMenu>

					<NavMenu prefix='docs/base/'>
						<NavMenuHeader nestedItems={[
							<NavMenuItem value='about'>About</NavMenuItem>,
							<NavMenuItem value='attachment'>Attachment</NavMenuItem>,
							<NavMenuItem value='button'>Button</NavMenuItem>,
							<NavMenuItem value='checkbox'>Checkbox</NavMenuItem>,
							<NavMenuItem value='dropdown-menu'>Dropdown Menu</NavMenuItem>,
							<NavMenuItem value='icon'>Icon</NavMenuItem>,
							<NavMenuItem value='input'>Input</NavMenuItem>,
							<NavMenuItem value='menu'>Menu</NavMenuItem>,
							<NavMenuItem value='modal'>Modal</NavMenuItem>,
							<NavMenuItem value='notification'>Notification</NavMenuItem>,
							<NavMenuItem value='radio-buttons'>Radio Buttons</NavMenuItem>,
							<NavMenuItem value='scrollspy'>Scrollspy</NavMenuItem>,
							<NavMenuItem value='select'>Select</NavMenuItem>,
							<NavMenuItem value='sticky'>Sticky</NavMenuItem>,
							<NavMenuItem value='switch'>Switch</NavMenuItem>,
							<NavMenuItem value='tappable'>Tappable</NavMenuItem>,
							<NavMenuItem value='tooltip'>Tooltip</NavMenuItem>,
							<NavMenuItem value='zcontext'>ZContext</NavMenuItem>,
							<NavMenuItem disabled={true}>StylesMixin</NavMenuItem>,
							<NavMenuItem disabled={true}>ChildComponentsMixin</NavMenuItem>,
							<NavMenuItem disabled={true}>ManagedStateMixin</NavMenuItem>
						]}>
							Base
						</NavMenuHeader>
					</NavMenu>

					<NavMenu prefix='docs/material/'>
						<NavMenuHeader nestedItems={[
							<NavMenuItem value='about'>About</NavMenuItem>,
							<NavMenuItem value='themes'>Themes</NavMenuItem>,
							<NavMenuItem value='button'>Button</NavMenuItem>,
							<NavMenuItem value='checkbox'>Checkbox</NavMenuItem>,
							<NavMenuItem value='dropdown'>Dropdown Menu</NavMenuItem>,
							<NavMenuItem value='dialog'>Dialog</NavMenuItem>,
							<NavMenuItem value='input'>Input</NavMenuItem>,
							<NavMenuItem value='list'>List</NavMenuItem>,
							<NavMenuItem value='menu'>Menu</NavMenuItem>,
							<NavMenuItem value='radio-buttons'>Radio Buttons</NavMenuItem>,
							<NavMenuItem value='select'>Select</NavMenuItem>,
							<NavMenuItem value='snackbar'>Snackbar & Toast</NavMenuItem>,
							<NavMenuItem value='tooltip'>Tooltip</NavMenuItem>
						]}>
							Material
						</NavMenuHeader>
					</NavMenu>

					<NavMenu prefix='docs/web/'>
						<NavMenuHeader nestedItems={[
							<NavMenuItem value='about'>About</NavMenuItem>,
							<NavMenuItem value='button'>Button</NavMenuItem>,
							<NavMenuItem value='checkbox'>Checkbox</NavMenuItem>,
							<NavMenuItem value='dropdown-menu'>Dropdown Menu</NavMenuItem>,
							<NavMenuItem value='input'>Input</NavMenuItem>,
							<NavMenuItem value='menu'>Menu</NavMenuItem>,
							<NavMenuItem value='modal'>Modal</NavMenuItem>,
							<NavMenuItem value='notification'>Notification</NavMenuItem>,
							<NavMenuItem value='radio-buttons'>Radio Buttons</NavMenuItem>,
							<NavMenuItem value='select'>Select</NavMenuItem>,
							<NavMenuItem value='tooltip'>Tooltip</NavMenuItem>
						]}>Web</NavMenuHeader>
					</NavMenu>

				</div>
				<div style={this.styles.content}>
					{this.props.children}
				</div>
			</div>
		)
	}
}
