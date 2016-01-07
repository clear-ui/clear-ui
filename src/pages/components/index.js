import React from 'react'
import {Link} from 'react-router'

import ZContext from 'clear-ui-base/lib/zContext'
import mixinDecorator from 'clear-ui-base/lib/utils/mixin/decorator'
import StylesMixin from 'clear-ui-base/lib/utils/stylesMixin'
import COLORS from 'clear-ui-simple/lib/styles/colors'

@mixinDecorator(StylesMixin)
class ComponentsPage extends React.Component {
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
			flex: '0 0 15rem',
			paddingLeft: '1rem'
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
					<b>MATERIAL</b>
					<br/>
					<Link to='components/material/themes'>Themes</Link>
					<br/>
					<Link to='components/material/dropdown'>Dropdown</Link>
					<br/>
					<Link to='components/material/button'>Button</Link>
					<br/>
					<Link to='components/material/checkbox'>Checkbox</Link>
					<br/>
					<Link to='components/material/menu'>Menu</Link>
					<br/>
					<Link to='components/material/list'>List</Link>
					<br/>
					<Link to='components/material/tooltip'>Tooltip</Link>
					<br/>
					<Link to='components/material/input'>Input</Link>
					<br/>
					<span style={{color: 'grey'}}>Dropdown</span>
					<br/>
					<span style={{color: 'grey'}}>Select</span>
					<br/>
					<Link to='components/material/dialog'>Dialog</Link>
					<br/>
					<span style={{color: 'grey'}}>Notification</span>
					<br/>
					<span style={{color: 'grey'}}>Slider</span>
					<br/>
					<br/>
					<b>WEB</b>
					<br/>
					<Link to='components/web/button'>Button</Link>
					<br/>
					<Link to='components/web/dropdown'>Dropdown</Link>
					<br/>
					<Link to='components/web/menu'>Menu</Link>
					<br/>
					<Link to='components/web/tree-menu'>Tree Menu</Link>
					<br/>
					<Link to='components/web/tooltip'>Tooltip</Link>
					<br/>
					<Link to='components/web/input'>Input</Link>
					<br/>
					<Link to='components/web/checkbox'>Checkbox</Link>
					<br/>
					<Link to='components/web/radio-buttons'>Radio Buttons</Link>
					<br/>
					<span style={{color: 'grey'}}>Dropdown</span>
					<br/>
					<span style={{color: 'grey'}}>Select</span>
					<br/>
					<Link to='components/web/modal'>Modal</Link>
					<br/>
					<span style={{color: 'grey'}}>Notification</span>
					<br/>
					<span style={{color: 'grey'}}>Slider</span>
					<br/>
					<br/>

					<b>BASE</b>
					<br/>
					<Link to='components/base/input'>Input</Link>
					<br/>
					<Link to='components/base/button'>Button</Link>
					<br/>
					<Link to='components/base/menu'>Menu</Link>
					<br/>
					<Link to='components/base/zcontext'>ZContext</Link>
					<br/>
					<span style={{color: 'grey'}}>Popup</span>
					<br/>
					<span style={{color: 'grey'}}>Attachment</span>
					<br/>
					<span style={{color: 'grey'}}>StylesMixin</span>
					<br/>
					<span style={{color: 'grey'}}>ChildComponentsMixin</span>
					<br/>
					<span style={{color: 'grey'}}>ManagedStateMixin</span>
					<br/>
					<Link to='components/base/sticky'>Sticky</Link>
					<br/>
					<Link to='components/base/scrollspy'>Scrollspy</Link>
				</div>
				<div style={this.styles.content}>
					{this.props.children}
				</div>
			</div>
		)
	}
}

export default ComponentsPage
