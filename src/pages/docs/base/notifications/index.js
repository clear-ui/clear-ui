import React from 'react'
import $ from 'jquery'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

export default class NotificationsDoc extends React.Component {
	render() {
		return <DocPage>
			<h1>Base<DocPage.ArrowIcon/>Notifications</h1>

			{`
			Notifications display small messages on the screen for the short time.
			`}

			<h2>Containers</h2>

			{`
			To show notification, first you need to create notifications container.
			There may be several containers on the page at the same time.
			They can have different behaviour, position and animation settings.

			There are three possible ways how you can specify in which container
			notification should be placed:

			1. Default container

				You can create default container and then all notifications without
				specified container will use it.
			`}

			<Example.Code>{`
				<NotificationsContainer isDefault={true}/>
				<Notification/>
			`}</Example.Code>

			{`
			2. Context container
			`}

			<Example.Code>{`
				<NotificationsContainer>
					<Notification/>
				</NotificationsContainer>
			`}</Example.Code>

			{`
			3. Deferred ref to the container
			`}

			<Example.Code>{`
				let deferred = $.Deferred()

				<NotificationsContainer ref={(ref) => { deferred.resolve(ref) }}>
				<Notification container={deferred}/>
			`}</Example.Code>

			<h3>Stacking and single containers</h3>

			{`
			There are two types of containers: \`StackingNotificationsContainer\` and
			\`SingleNotificationsContainer\`.

			\`StackingNotificationsContainer\` can display several notifications,
			one below the other.

			\`SingleNotificationsContainer\` can display only one notification
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

					<StackingNotificationsContainer horizPos='left' vertPos='bottom'
						ref={(ref) => { bottomLeftContainer.resolve(ref) }}/>
					<StackingNotificationsContainer horizPos='center' vertPos='top'
						ref={(ref) => { topCenterContainer.resolve(ref) }}/>
					<Notification container={bottomLeftContainer}/>
					<Notification container={topCenterContainer}/>
				`}</Example.Code>
			</Example>

			<h2>Container Props</h2>

			<ApiDoc>
				<ApiDoc.Row name='isDefault' type='boolean'>{`
					Makes container default.
					Notifications without specified container will be placed inside
					the default container.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='horizPos' type='string' defaultValue={`'top'`}>{`
					Horizontal position of the container.
					Possible values are \`'top'\` and \`'bottom'\`.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='vertPos' type='string' defaultValue={`'left'`}>{`
					Vertical position of the container.
					Possible values are \`'left'\`, \`'right'\` and \`'center'\`.
				`}</ApiDoc.Row>
			</ApiDoc>

			<h2>Notification Props</h2>

			<ApiDoc>
				<ApiDoc.Row name='open' type='bool' required={true}>{`
				Controls whether the notification is open or not.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='onClose' type='function' required={true}>{`
				Function that is called when notification requests to be closed.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='container' type='Deferred'>{`
				Deferred ref to the notification container where notification should be rendered.
				<br/>
				Other options how to specify in which container notification should be placed are
				to place notification inside the container, or to make container default
				by setting prop \`isDefault={true}\`, and then all notifications without
				specified container will use it.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='autoHideTimeout' type='number|false' defaultValue={3000}>{`
				Time in milliseconds before notification will automatically request closing.<br/>
				When it is \`false\`, notification will not close automatically.
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
