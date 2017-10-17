import React from 'react';
import ReactDOM from 'react-dom';

import MessageForm from './components/MessageForm';
import MessageFloat from './components/MessageFloat';

import service from './service';

class Title extends React.Component {
    render() {
        return (
            <h1>Hello, {this.props.name}!</h1>
        )
    }
}

class Paragraph extends React.Component {
    render() {
        return (
            <p>Hello, {this.props.content}!</p>
        )
    }
}

class SearchBar extends React.Component {
    render() {
        return (
            <input type="text" placeholder="Enter your search term" name="" />
        )
    }
}

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
        // const res = await service.getSentiment("I love you.");
        // const res2 = await service.getSentiment("I hate you.");
        // console.log(res);
        // console.log(res2);

        // const msg = service.newMessage("What's up?");
        // await service.addMessage(msg);
        // console.log(await service.getMessages() );

        service.getMessages().then( data => {
            this.setState({ messages: data });
        });
    }

    async service() {
        // const res = await service.getSentiment("I love you.");
        // console.log(res);
        // console.log(res.json());
    }

    handleSubmit(txt) {
        const msg = service.newMessage(txt);
        service.addMessage(msg)
        .then( () => {
            service.getMessages().then( data => {
                this.setState({ messages: data });
                // console.log(data);
            });
        });

        
    }

    render() {
        // this.service();
        const { messages } = this.state;
        console.log("From render:", messages);

        return (
            <div>
                <Title name="Bob" />
                <Paragraph content="Welcome back, Bob. Nice to see you" />
                <SearchBar />
                HELLLOOOO!!!
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