import React from 'react'
import $ from 'jquery'

import {Notification, SingleNotificationContainer, StackingNotificationContainer}
	from 'clear-ui-web/lib/notification'
import Button from 'clear-ui-web/lib/button/raisedButton'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import PropsDoc from '../../../../propsDoc'

import NotificationExample from './example.js'
import notificationExampleCode from '!raw!./example.js'
import ReusableNotificationExample from './reusableExample.js'

import webDocs from '../../../../../docgen/web.json'
let notificationPropsDoc = webDocs['notification/notification.js'].props

export default class NotificationDoc extends React.Component {
	render() {
		let singleContainer = $.Deferred()
		let bottomLeftContainer = $.Deferred()
		let topCenterContainer = $.Deferred()

		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Notifications</h1>

			<StackingNotificationContainer isDefault={true}/>
			<SingleNotificationContainer ref={(ref) => { singleContainer.resolve(ref) }}/>
			<StackingNotificationContainer horizPos='left' vertPos='bottom'
				ref={(ref) => { bottomLeftContainer.resolve(ref) }}/>
			<StackingNotificationContainer horizPos='center' vertPos='top'
				ref={(ref) => { topCenterContainer.resolve(ref) }}/>

			{`
			Notifications display small messages on the screen for the short time.
			`}

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<NotificationExample/>
				</Example.Demo>
				<Example.Code lang='js'>
					{notificationExampleCode}
				</Example.Code>
			</Example>

			<h2>Containers</h2>

			{`
			To create notification, first you need to create container.
			You can read more about containers on the page
			[Base > Notification](#/docs/base/notification).

			Here are some variations of notification containers.
			`}

			<h3>Stacking and single containers</h3>

			{`
			\`StackingNotificationContainer\` can display several notifications,
			one below the other.
			\`SingleNotificationContainer\` can display only one notification
			in one moment of time.
			`}

			<Example>
				<Example.Demo>
					Stacking container:
					{' '}
					<ReusableNotificationExample buttonText='First'>
						Notification 1
					</ReusableNotificationExample>
					{' '}
					<ReusableNotificationExample buttonText='Second'>
						Notification 2
					</ReusableNotificationExample>
					<br/>
					<br/>
					Single container:
					{' '}
					<ReusableNotificationExample container={singleContainer} buttonText='First'>
						Notification 1
					</ReusableNotificationExample>
					{' '}
					<ReusableNotificationExample container={singleContainer} buttonText='Second'>
						Notification 2
					</ReusableNotificationExample>
				</Example.Demo>
				<Example.Code lang='xml'>{`
				let stackingContainer = $.Deferred()
				<StackingNotificationContainer ref={(ref) => { stackingContainer.resolve(ref) }}/>
				<Notification container={stackingContainer}>...</Notification>

				let singleContainer = $.Deferred()
				<SingleNotificationContainer ref={(ref) => { singleContainer.resolve(ref) }}/>
				<Notification container={singleContainer}>...</Notification>
				`}</Example.Code>
			</Example>

			<h3>Containers position</h3>

			<Example>
				<Example.Demo>
					<ReusableNotificationExample container={bottomLeftContainer}
						buttonText='Bottom left'/>
					{' '}
					<ReusableNotificationExample container={topCenterContainer}
						buttonText='Top center'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					let bottomLeftContainer = $.Deferred()
					let topCenterContainer = $.Deferred()

					<StackingNotificationContainer horizPos='left' vertPos='bottom'
						ref={(ref) => { bottomLeftContainer.resolve(ref) }}/>
					<StackingNotificationContainer horizPos='center' vertPos='top'
						ref={(ref) => { topCenterContainer.resolve(ref) }}/>
					<Notification container={bottomLeftContainer}/>
					<Notification container={topCenterContainer}/>
				`}</Example.Code>
			</Example>

			<h2>Variations</h2>

			<h3>Sizes</h3>

			<Example>
				<Example.Demo>
					<ReusableNotificationExample size='small' buttonText='Small' key='1'/>
					{' '}
					<ReusableNotificationExample size='default' buttonText='Default' key='2'/>
					{' '}
					<ReusableNotificationExample size='big' buttonText='Big' key='3'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Notifications size='small'>...</Notification>
					<Notifications size='default'>...</Notification>
					<Notifications size='big'>...</Notification>
				`}</Example.Code>
			</Example>

			<h3>Dark</h3>

			<Example>
				<Example.Demo>
					<ReusableNotificationExample dark={true}/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Notification dark={true}>Dark notification</Notification>
				`}</Example.Code>
			</Example>

			<h3>Animation</h3>

			TODO

			<h2>Containers API</h2>

			{`
			Extends <a href='#/docs/base/notification'>Base > Notification > Containers</a>
			`}

			<h2>Notification API</h2>

			{`
			Extends <a href='#/docs/base/notification'>Base > Notification > Notification</a>
			`}

			<h3>Props</h3>
			<PropsDoc doc={notificationPropsDoc}/>
		</DocPage>
	}
}
