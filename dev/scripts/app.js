import React from 'react';
import ReactDOM from 'react-dom';

import FilterMenu from './components/FilterMenu';
import MessageForm from './components/MessageForm';

import MessageFloatsContainer from './components/MessageFloatsContainer';

import LoginIndicator from './components/LoginIndicator.js';

import service from './service';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            messages: [],
            averageSentiment: 0,
            user: null,
            filter: {},
            filterMenuOpened: false,
        }

        this.handleServiceInit = this.handleServiceInit.bind(this);
        this.handleServiceSubscription = this.handleServiceSubscription.bind(this);

        this.setStateMessages = this.setStateMessages.bind(this);

        this.handleFilter = this.handleFilter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleFilterMenuBtnClick = this.handleFilterMenuBtnClick.bind(this);
        this.handleLogging = this.handleLogging.bind(this);
    }

    componentDidMount() {
        service.init({cb: this.handleServiceInit});
    }

    handleFilterMenuBtnClick(e) {
        e.preventDefault();
        this.setState({ filterMenuOpened: !this.state.filterMenuOpened });
    }

    handleServiceInit() {
        service.subscribeToMessages({}, this.handleServiceSubscription);
        // service.getMessages().then(this.setStateMessages);
    }

    handleServiceSubscription(messages) {
        this.setStateMessages(messages);
    }

    handleLogging() {
        if ( !this.state.user ) {
            service.auth
                .signInWithPopup(service.provider) 
                .then((result) => {
                    const user = result.user;
                    service.setCurrentUser(user.uid);
                    this.setState({ user });
                });
        } else {
            service.auth
                .signOut()
                .then(() => {
                    service.removeCurrentUser();
                    this.setState({ user: null, filter: {} });
                    this.handleFilter({});
                });
        }
    }

    handleSubmit(txt) {

        const msg = service.newMessage(txt);
        console.log(msg);
        service.addMessage(msg);

        // //unsubscribe to old service
        // service.unsubscribeToMessages();
        
        // //resubscribe with proper filter
        // service.subscribeToMessages(this.state.filter, this.handleServiceSubscription);
    }

    handleFilter(filter) {
        console.log("Filter is: ", filter);
        this.setState({ filter });

        //unsubscribe to old service
        service.unsubscribeToMessages();

        //resubscribe with proper filter
        service.subscribeToMessages(filter, this.handleServiceSubscription);
    }

    setStateMessages(messages) {
        let averageSentiment = 0;
        messages.forEach( msg => averageSentiment += msg.sentiment);
        averageSentiment /= messages.length;

        this.setState({ messages, averageSentiment });
    }

    render() {
        const { messages, averageSentiment, user, filterMenuOpened, filter } = this.state;
        console.log("From render:", messages);

        let sentimentLightnessOne = 0.7 - (averageSentiment + 1) / 2 * 0.7;
        let sentimentLightnessTwo = 0.1 - (averageSentiment + 1) / 2 * 0.1;


        const style = {
            container: {
                background: `linear-gradient(to bottom, hsla(0, 0%, 0%, ${sentimentLightnessOne.toFixed(3)}) 5%, hsla(0, 0%, 0%, ${sentimentLightnessTwo.toFixed(3)}) 100%)`,
                position: 'fixed',
                left: 0,
                bottom: 0,
                right: 0,
                top: 0,
            }
        }

        return (
            <div style={style.container}>
                <button className="FilterMenuBtn" onClick={this.handleFilterMenuBtnClick} />
                <MessageFloatsContainer messages={messages} />
                <FilterMenu open={filterMenuOpened} filter={filter} handleSubmit={this.handleFilter} />
                <MessageForm handleSubmit={this.handleSubmit} />
                <LoginIndicator user={user} handleLogging={this.handleLogging} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));