import React from 'react'
import $ from 'jquery'

import DocPage from '../../../../docPage'
import Example from '../../../../example'
import {ApiDoc, ApiDocRow} from '../../../../apiDoc'
import PropsDoc from '../../../../propsDoc'

import baseDocs from '../../../../../docgen/base.json'
let notificationPropsDoc = baseDocs['notification/notification.js'].props
let notificationContainerPropsDoc = baseDocs['notification/abstractNotificationContainer.js'].props

export default class NotificationsDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Notification</h1>

			{`
			Notifications display small messages on the screen for the short time.
			`}

			<DocPage.Note>
				This component requires instance of{' '}
				<a href='#/docs/base/zcontext'>ZContext</a>
				{' '}to be rendered on the page.
			</DocPage.Note>

			<h2>Containers</h2>

			{`
			To show notification, first you need to create notification container.
			There may be several containers on the page at the same time.
			They can have different behaviour, position and animation settings.

			There are three possible ways how you can specify in which container
			notification should be placed:

			1. Default container

				You can create default container and then all notifications without
				specified container will use it.
			`}

			<Example.Code>{`
				<NotificationContainer isDefault={true}/>
				<Notification/>
			`}</Example.Code>

			{`
			2. Context container
			`}

			<Example.Code>{`
				<NotificationContainer>
					<Notification/>
				</NotificationContainer>
			`}</Example.Code>

			{`
			3. Deferred ref to the container
			`}

			<Example.Code>{`
				let deferred = $.Deferred()

				<NotificationContainer ref={(ref) => { deferred.resolve(ref) }}>
				<Notification container={deferred}/>
			`}</Example.Code>

			<h3>Stacking and single containers</h3>

			{`
			There are two types of containers: \`StackingNotificationContainer\` and
			\`SingleNotificationContainer\`.

			\`StackingNotificationContainer\` can display several notifications,
			one below the other.

			\`SingleNotificationContainer\` can display only one notification
			in one moment of time.
			If new notification is added when there already notification on the page,
			old one will be closed and new one will be displayed after it.
			`}

			<h3>Containers position</h3>

			{`
			Container can be positioned at the top or bottom side of the screen vertically,
			and at the right, left or center horizontally.
			`}

			<Example>
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

			<h2>Containers API</h2>

			<h3>Props</h3>

			<PropsDoc doc={notificationContainerPropsDoc}/>

			<h2>Notification API</h2>

			<h3>Props</h3>

			<PropsDoc doc={notificationPropsDoc}/>

			<h3>Styleable Elements</h3>

			<ApiDoc>
				<ApiDocRow name='root'>{`
					Root element.
				`}</ApiDocRow>

				<ApiDocRow name='content'>{`
					Content of the notification.
				`}</ApiDocRow>

				<ApiDocRow name='actions'>{`
					Container of the actions in the notification.
				`}</ApiDocRow>
			</ApiDoc>
		</DocPage>
	}
}
