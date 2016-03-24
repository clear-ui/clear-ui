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
				<Example.Code lang='xml'>{`
					<NotificationsContainer isDefault={true}/>

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
			Для того чтобы показать уведомление, сперва нужно создать контейнер для
			уведомлений.
			Одновременно может существовать несколько контейнеров.
			Они могут различаться поведением, расположением и анимацией уведомлений.

			There are three possible ways how you can specify in which container
			notification should be placed:

			1. Default container

			Можно создать дефолтный контейнер, и тогда все уведомления без
			указания контейнера будут отображаться в нём.
			`}

			<Example.Code>{`
				<NotificationsContainer isDefault={true}/>
				<Notification/>
			`}</Example.Code>

			{`
			2. Context container

			Уведомления помещённые внутрь контейнера автоматически используют его.
			`}

			<Example.Code>{`
				<NotificationsContainer>
					<Notification/>
				</NotificationsContainer>
			`}</Example.Code>

			{`
			3. Deferred ref to the container

			Можно передать отложенный ref на контейнер.
			`}

			<Example.Code>{`
				let deferred = $.Deferred()

				<NotificationsContainer ref={(ref) => { deferred.resolve(ref) }}>
				<Notification container={deferred}/>
			`}</Example.Code>

			<h3>Types of containers</h3>

			{`
			There are two types of containers: \`StackingNotificationsContainer\` and
			\`SingleNotificationsContainer\`.

			\`StackingNotificationsContainer\` может отображать несколько уведомлений
			одно под другим.

			\`SingleNotificationsContainer\` может отображать только одно уведомление
			в один момент времени.
			Если новое уведомление появится когда контейнер уже содержит уведомление,
			старое уведомление закроется и после этого отобразится новое.
			`}

			<Example>
				<Example.Demo>
					<NotificationsDemo container={singleContainer} buttonText='First'/>
					{' '}
					<NotificationsDemo container={singleContainer} buttonText='Second'/>
					{' '}
					<NotificationsDemo container={singleContainer} buttonText='Third'/>
				</Example.Demo>
				<Example.Code lang='xml'>{`
					let singleContainer = $.Deferred()

					<SingleNotificationsContainer ref={(ref) => { singleContainer.resolve(ref) }}/>
					<Notification container={singleContainer}>...</Notification>
					<Notification container={singleContainer}>...</Notification>
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
				<ApiDoc.Row name='isDefault' type='boolean'>{`
					Makes container default.
					Notifications without specified container will be placed inside
					default container.
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
				<ApiDoc.Row name='autoHideTimeout' type='number'>{`
				`}</ApiDoc.Row>

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
