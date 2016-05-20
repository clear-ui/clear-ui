import ReactDOM from 'react-dom'
import $ from 'jquery'

import Menu from './menu.js'

export default class ScrollMenu extends Menu {
	componentDidMount() {
		super.componentDidMount()

		setTimeout(() => { // TODO why timeout
			if (this.hoveredItem) {
				let item = $(ReactDOM.findDOMNode(this.hoveredItem))
				let container = item.parent()
				let itemPos = item.offset().top - container.offset().top + container.scrollTop()
				container.scrollTop(itemPos)
			}
		})
	}

	moveHover(direction) {
		super.moveHover(direction)

		if (this.hoveredItem) {
			let item = $(ReactDOM.findDOMNode(this.hoveredItem))
			this.scrollToItem(item)
		}
	}

	scrollToItem(item) {
		let container = item.parent()
		let itemHeight = item.height()
		let containerHeight = container.height()
		let scrollTop = container.scrollTop()
		let itemPos = item.offset().top - container.offset().top + scrollTop

		if (itemPos < scrollTop) {
			container.scrollTop(itemPos)
		} else if (itemPos > scrollTop + containerHeight - itemHeight) {
			container.scrollTop(itemPos + itemHeight - containerHeight)
		}
	}
}
