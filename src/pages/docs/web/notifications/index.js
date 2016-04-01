import React from 'react'
import $ from 'jquery'

import {Notification, SingleNotificationsContainer, StackingNotificationsContainer}
	from 'clear-ui-simple/lib/notifications'
import Button from 'clear-ui-simple/lib/button/raisedButton'

import DocPage from '../../../../docPage'
import ApiDoc from '../../../../apiDoc'
import Example from '../../../../example'

class NotificationsDemo extends React.Component {
	static defaultProps = {
		buttonText: 'Show notification'
	}

	constructor() {
		super()
		this.state = {}
	}

	render() {
		return <span>
			<Button onTap={() => { this.setState({open: true}) }}>
				{this.props.buttonText} {this.state.open && '(open)'}
			</Button>
			<Notification
				open={this.state.open}
				onClose={() => { this.setState({open: false}) }}
				autoHideTimeout={3000}
				showCloseButton={true}
				{...this.props}
			>
				Notification text
			</Notification>
		</span>
	}
}

export default class NotificationsDoc extends React.Component {
	render() {
		let singleContainer = $.Deferred()
		let bottomLeftContainer = $.Deferred()
		let topCenterContainer = $.Deferred()

		return <DocPage>
			<h1>Web<DocPage.ArrowIcon/>Notifications</h1>

			<StackingNotificationsContainer isDefault={true}/>
			<SingleNotificationsContainer ref={(ref) => { singleContainer.resolve(ref) }}/>
			<StackingNotificationsContainer horizPos='left' vertPos='bottom'
				ref={(ref) => { bottomLeftContainer.resolve(ref) }}/>
			<StackingNotificationsContainer horizPos='center' vertPos='top'
				ref={(ref) => { topCenterContainer.resolve(ref) }}/>

			{`
			Notifications display small messages on the screen for the short time.
			`}

			<h2>Example</h2>

			<Example>
				<Example.Demo>
					<NotificationsDemo/>
				</Example.Demo>
				<Example.Code lang='js'>{`
					import {Notification, StackingNotificationsContainer}
						from 'clear-ui-web/lib/notifications'

					<StackingNotificationsContainer isDefault={true}/>

					<Button onTap={() => { this.setState({open: true}) }}>
						Show notification
					</Button>

					<Notification
						open={this.state.open}
						onClose={() => { this.setState({open: false}) }}
						autoHideTimeout={3000}
						showCloseButton={true}
					>
						Notification text
					</Notification>
				`}</Example.Code>
			</Example>

			<h2>Containers</h2>

			{`
			To create notification, first you need to create container.
			You can read more about containers on the page
			[Base > Notifications](#/docs/base/notifications).

			Here are some variations of notifications containers.
			`}

			<h3>Stacking and single containers</h3>

			{`
			\`StackingNotificationsContainer\` can display several notifications,
			one below the other.
			\`SingleNotificationsContainer\` can display only one notification
			in one moment of time.
			`}

			<Example>
				<Example.Demo>
					Stacking container: 
					{' '}
					<NotificationsDemo buttonText='First'/>
					{' '}
					<NotificationsDemo buttonText='Second'/>
					<br/>
					<br/>
					Single container:
					{' '}
					<NotificationsDemo container={singleContainer} buttonText='First'/>
					{' '}
					<NotificationsDemo container={singleContainer} buttonText='Second'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					let stackingContainer = $.Deferred()
					<StackingNotificationsContainer ref={(ref) => { stackingContainer.resolve(ref) }}/>

					<Notification container={stackingContainer}>...</Notification>

					let singleContainer = $.Deferred()
					<SingleNotificationsContainer ref={(ref) => { singleContainer.resolve(ref) }}/>

					<Notification container={singleContainer}>...</Notification>
				`}</Example.Code>
			</Example>

			<h3>Containers position</h3>

			<Example>
				<Example.Demo>
					<NotificationsDemo container={bottomLeftContainer} buttonText='Bottom left'/>
					{' '}
					<NotificationsDemo container={topCenterContainer} buttonText='Top center'/>
				</Example.Demo>
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

			<h2>Variations</h2>

			<h3>Sizes</h3>

			<Example>
				<Example.Demo>
					<NotificationsDemo size='small' buttonText='Small' key='1'/>
					{' '}
					<NotificationsDemo size='default' buttonText='Default' key='2'/>
					{' '}
					<NotificationsDemo size='big' buttonText='Big' key='3'/>
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
					<NotificationsDemo dark={true}/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					<Notification dark={true}>Dark notification</Notification>
				`}</Example.Code>
			</Example>

			<h3>Animation</h3>

			TODO

			<h2>Container Props</h2>

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/docs/base/notifications'>Base > Notifications > Container props</a>
				</ApiDoc.Row>
			</ApiDoc>

			<h2>Notification Props</h2>

			<ApiDoc>
				<ApiDoc.Row>
					<a href='#/docs/base/notifications'>
						Base > Notifications > Notification props
					</a>
				</ApiDoc.Row>

				<ApiDoc.Row name='actions' type='node'>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row name='showCloseButton' type='boolean'>{`
				`}</ApiDoc.Row>

				<ApiDoc.Row name='size' type='string' defaultValue={`'default'`}>{`
					Size of the notification.
					Possible values are \`'small'\`, \`'default'\` and \`'big'\`.
				`}</ApiDoc.Row>

				<ApiDoc.Row name='dark' type='boolean'>{`
					Dark style of the notification.
				`}</ApiDoc.Row>
			</ApiDoc>
		</DocPage>
	}
}
