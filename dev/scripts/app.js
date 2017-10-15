import React from 'react';
import ReactDOM from 'react-dom';

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
    render() {
        return (
            <div>
                <Title name="Bob" />
                <Paragraph content="Welcome back, Bob. Nice to see you" />
                <SearchBar />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));