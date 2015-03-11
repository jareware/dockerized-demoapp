var React = require('react');

var DemoApp = React.createClass({

    getInitialState() {
        return {
            messages: [],
            newMessage: ''
        };
    },

    componentDidMount() {
        $.get('/api/guestbook').then(data => {
            this.setState({ messages: data });
        });
    },

    updateNewMessage(event) {
        this.setState({ newMessage: event.target.value });
    },

    postMessage() {
        if (this.state.messages) {
            $.ajax({
                url: '/api/guestbook',
                type: 'POST',
                processData: false,
                data: this.state.newMessage,
                contentType: 'text/plain'
            }).fail(err => alert('Could not post message'));
            this.setState({
                newMessage: '',
                messages: [ this.state.newMessage ].concat(this.state.messages)
            });
        }
    },

    render() {
        return (
            <main className="container well">

                <h1>Guestbook</h1>

                <div className="form-group">
                    <label>Leave a message</label>
                    <input className="form-control" placeholder="New message" value={this.state.newMessage} onChange={this.updateNewMessage} />
                </div>
                <button className="btn btn-default" onClick={this.postMessage}>Submit</button>

                <h3>Messages</h3>

                <ul>
                    {this.state.messages.map((message, index) =>
                        <li key={index}>{message}</li>
                    )}
                </ul>

            </main>
        );
    }

});

React.render(<DemoApp />, document.body);