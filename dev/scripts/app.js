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
        }

        this.handleServiceInit = this.handleServiceInit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.setStateMessages = this.setStateMessages.bind(this);

        this.handleLogging = this.handleLogging.bind(this);
    }

    componentDidMount() {
        service.init({cb: this.handleServiceInit});
    }

    async handleServiceInit() {
        service.getMessages().then(this.setStateMessages);
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
                    this.setState({ user: null });
                    this.handleFilter({});
                });
        }
    }

    handleSubmit(txt) {

        const msg = service.newMessage(txt);
        console.log(msg);
        service.addMessage(msg)
            .then(() => service.getMessages.call(null,this.state.filter))
            .then( data => {
                console.log(data);
                this.setStateMessages(data);
            });
    }

    handleFilter(filter) {
        console.log("Filter is: ", filter);
        this.setState({ filter });

        service.getMessages(filter)
        .then(this.setStateMessages);
    }

    setStateMessages(messages) {
        let averageSentiment = 0;
        messages.forEach( msg => averageSentiment += msg.sentiment);
        averageSentiment /= messages.length;

        this.setState({ messages, averageSentiment });
    }

    render() {
        const { messages, averageSentiment, user } = this.state;
        console.log("From render:", messages);

        let sentimentLightnessOne = 0.7 - (averageSentiment + 1) / 2 * 0.7;
        let sentimentLightnessTwo = 0.1 - (averageSentiment + 1) / 2 * 0.1;

        console.log('sentimentligt', sentimentLightnessOne, sentimentLightnessTwo);

        


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
                <FilterMenu handleSubmit={this.handleFilter} />
                <MessageFloatsContainer messages={messages} />
                <MessageForm handleSubmit={this.handleSubmit} />
                <LoginIndicator user={user} handleLogging={this.handleLogging} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));