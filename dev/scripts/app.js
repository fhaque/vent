import React from 'react';
import ReactDOM from 'react-dom';

import FilterMenu from './components/FilterMenu';
import MessageForm from './components/MessageForm';
import MessageFloat from './components/MessageFloat';

import service from './service';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            messages: [],
        }

        this.handleServiceInit = this.handleServiceInit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        service.init({cb: this.handleServiceInit});
    }

    async handleServiceInit() {
        service.getMessages().then( data => {
            this.setState({ messages: data });
        });
    }

    handleSubmit(txt) {
        const msg = service.newMessage(txt);
        service.addMessage(msg)
            .then(service.getMessages)
            .then( data => {
                console.log(data);
                this.setState({ messages: data });
            });
    }

    render() {
        const { messages } = this.state;
        console.log("From render:", messages);

        return (
            <div>
                <FilterMenu />
                <ul>
                    {messages.map( (msg) => {
                        return(
                            <li key={msg.msgid}> 
                                <MessageFloat>
                                    <p>{msg.msg}</p>
                                </MessageFloat>
                            </li>
                        )
                    })}
                </ul>
                <MessageForm handleSubmit={this.handleSubmit} />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));