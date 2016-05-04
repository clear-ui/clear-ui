import React from 'react'

import {List, ListItem, ListSubheader, ListDivider} from 'clear-ui-material/lib/list'
import Paper from 'clear-ui-material/lib/paper'
import Icon from 'clear-ui-base/lib/icon'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import ApiDoc from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import materialDocs from '../../../../../docgen/material.json'
let itemPropsDoc = materialDocs['list/item.js'].props

export default class ListDoc extends React.Component {
	render() {
		let starIcon = <Icon icon={Icon.ICONS.star}/>

		let avatar = <div style={{
			width: 38,
			height: 38,
			background: '#673AB7',
			borderRadius: '50%',
			color: 'white',
			textAlign: 'center',
			lineHeight: '38px',
			fontWeight: 500
		}}>
			A
		</div>

		return <DocPage>
			<h1>Material<DocPage.ArrowIcon/>List</h1>

			{`
			Lists present multiple line items in a vertical arrangement
			as a single continuous element.
			`}

			<a
				href='https://www.google.com/design/spec/components/lists.html'
				target='blank'
			>
				Lists specification
			</a>

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<div style={{width: 300}}>
						<Paper>
							<List>
								<ListSubheader>Subheader</ListSubheader>
								<ListItem>Item</ListItem>
								<ListItem selected={true}>Selected Item</ListItem>
								<ListDivider/>
								<ListItem disabled={true}>Disabled item</ListItem>
							</List>
						</Paper>
					</div>
				</Example.Demo>
				<Example.Code lang='js'>{`
					import {List, ListItem, ListSubheader, ListDivider}
						from 'clear-ui-material/lib/list'

					<List>
						<ListSubheader>Subheader</ListSubheader>
						<ListItem>Item</ListItem>
						<ListItem selected={true}>Selected Item</ListItem>
						<ListDivider/>
						<ListItem disabled={true}>Disabled item</ListItem>
					</List>
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Icons and avatars</h3>

			Items can have icons or avatars on the right or left sides.

			<Example>
				<Example.Demo>
					<List style={{width: 300}}>
						<ListItem leftIcon={starIcon}>Item with left icon</ListItem>
						<ListItem leftAvatar={avatar}>Item with left avatar</ListItem>
						<ListItem indent={true}>Indented item</ListItem>
						<ListDivider/>
						<ListItem rightIcon={starIcon}>Item with right icon</ListItem>
						<ListItem rightAvatar={avatar}>Item with right avatar</ListItem>
					</List>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<ListItem leftIcon={starIcon}>Item with left icon</ListItem>
					<ListItem leftAvatar={avatar}>Item with left avatar</ListItem>
					<ListItem indent={true}>Indented item</ListItem>
					<ListDivider/>
					<ListItem rightIcon={starIcon}>Item with right icon</ListItem>
					<ListItem rightAvatar={avatar}>Item with right avatar</ListItem>
				`}</Example.Code>
			</Example>

			Right icon can be clickable.

			<Example>
				<Example.Demo>
					<div style={{width: 300}}>
						<ListItem
							rightIcon={starIcon}
							onRightIconTap={() => { console.log('click') }}
						>
							Item with clickable right icon
						</ListItem>
					</div>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<ListItem
						rightIcon={starIcon}
						onRightIconClick={() => { console.log('click') }}
					>
						Item with clickable right icon
					</ListItem>
				`}</Example.Code>
			</Example>

			<h3>Secondary text</h3>

			Items can have one or two additional lines of text.

			<Example>
				<Example.Demo>
					<div style={{width: 300}}>
						<ListItem
							secondaryText='Secondary text'
							leftAvatar={avatar}
							rightIcon={starIcon}
						>
							One additional line
						</ListItem>
						<ListItem
							secondaryText={
								<div>
									Secondary text<br/>
									More secondary text
								</div>
							}
							secondaryTextLines={2}
							leftAvatar={avatar}
							rightIcon={starIcon}
						>
							Two additional lines
						</ListItem>
					</div>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<ListItem
						secondaryText='Secondary text'
						leftAvatar={avatar}
						rightIcon={starIcon}
					>
						One additional line
					</ListItem>
					<ListItem
						secondaryText={
							<div>
								Secondary text<br/>
								More secondary text
							</div>
						}
						secondaryTextLines={2}
						leftAvatar={avatar}
						rightIcon={starIcon}
					>
						Two additional lines
					</ListItem>
				`}</Example.Code>
			</Example>

			<h2>Nested items</h2>

			<Example>
				<Example.Demo>
					<List style={{width: 300}}>
						<ListItem value='1'
							nestedItems={[
								<ListItem value='1.1'>Item 1.1</ListItem>,
								<ListItem value='1.2'>Item 1.2</ListItem>
							]}
						>
							Item 1
						</ListItem>
						<ListItem value='2' disabled={true}
							nestedItems={[
								<ListItem value='2.1'>Item 2.1</ListItem>,
								<ListItem value='2.2'>Item 2.2</ListItem>
							]}
						>
							Item 2
						</ListItem>
						<ListItem value='3'>Item 3</ListItem>
					</List>

					<hr/>

					<List style={{width: 300}}>
						<ListItem value='1'
							tapTogglesNestedItems={true}
							nestedItems={[
								<ListItem value='1.1'>Item 1.1</ListItem>,
								<ListItem value='1.2'>Item 1.2</ListItem>
							]}
						>
							Item 1
						</ListItem>
						<ListItem value='2' disabled={true}
							tapTogglesNestedItems={true}
							nestedItems={[
								<ListItem value='2.1'>Item 2.1</ListItem>,
								<ListItem value='2.2'>Item 2.2</ListItem>
							]}
						>
							Item 2
						</ListItem>
						<ListItem value='3'>Item 3</ListItem>
					</List>
				</Example.Demo>
			</Example>


			<h2>Props</h2>

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/docs/base/menu'>Base > Menu props</a>
				</ApiDoc.Row>
			</ApiDoc>

			<h2>ListItem props</h2>

			<PropsDoc
				doc={itemPropsDoc}
				base={{name: 'Base > Menu > MenuItem props', url: '#/docs/base/menu'}}
			/>
		</DocPage>
	}
}

