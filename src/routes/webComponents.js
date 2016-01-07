import Button from '../pages/components/web/button'
import Dropdown from '../pages/components/web/dropdown'
import Checkbox from '../pages/components/web/checkbox'
import Input from '../pages/components/web/input'
import Menu from '../pages/components/web/menu'
import Modal from '../pages/components/web/modal'
import RadioButtons from '../pages/components/web/radioButtons'
import Tooltip from '../pages/components/web/tooltip'
import TreeMenu from '../pages/components/web/treeMenu'

export default [
	{path: 'button', component: Button},
	{path: 'dropdown', component: Dropdown},
	{path: 'menu', component: Menu},
	{path: 'tree-menu', component: TreeMenu},
	{path: 'checkbox', component: Checkbox},
	{path: 'input', component: Input},
	{path: 'tooltip', component: Tooltip},
	{path: 'radio-buttons', component: RadioButtons},
	{path: 'modal', component: Modal}
]
