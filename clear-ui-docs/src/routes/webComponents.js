import About from '../pages/docs/web/about'
import Button from '../pages/docs/web/button'
import DropdownMenu from '../pages/docs/web/dropdownMenu'
import Checkbox from '../pages/docs/web/checkbox'
import Input from '../pages/docs/web/input'
import Menu from '../pages/docs/web/menu'
import Modal from '../pages/docs/web/modal'
import Notification from '../pages/docs/web/notification'
import RadioButtons from '../pages/docs/web/radioButtons'
import Select from '../pages/docs/web/select'
import Tooltip from '../pages/docs/web/tooltip'

export default [
	{path: 'about', component: About},
	{path: 'button', component: Button},
	{path: 'dropdown-menu', component: DropdownMenu},
	{path: 'menu', component: Menu},
	{path: 'checkbox', component: Checkbox},
	{path: 'input', component: Input},
	{path: 'select', component: Select},
	{path: 'tooltip', component: Tooltip},
	{path: 'radio-buttons', component: RadioButtons},
	{path: 'modal', component: Modal},
	{path: 'notification', component: Notification}
]
