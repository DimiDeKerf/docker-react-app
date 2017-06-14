import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: 'ordina',
            showModel: false,
            sender: '',
            title: '',
            content: ''
        };
        this.openChatModal = this.openChatModal.bind(this);
        this.closeChatModal = this.closeChatModal.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleSenderChange = this.handleSenderChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    componentDidMount() {
        window.addEventListener('selectTheme', (event) => {
            this.setTheme((event.detail && event.detail.theme.toLowerCase()) || 'ordina');
        }, false);
    }

    setTheme(theme) {
        this.setState(prevState => ({
            theme: theme
        }));
    }

    render() {
        return (
            <div>
                <div id="chat">
                    <a id="chat-button" className={this.state.theme} onClick={this.openChatModal}></a>
                </div>
                <div className={"modal " + (this.state.showModel ? 'show' : 'hidden')}>
                    <div className="modal-content">
                        <form onSubmit={this.sendMessage}>
                            <div className={"modal-header " + this.state.theme}>
                                Send a message!
                            </div>
                            <div className="modal-body">
                                <div className="group">
                                    <input value={this.state.sender} onChange={this.handleSenderChange} type="text" required/>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Name</label>
                                </div>
                                <div className="group">
                                    <input value={this.state.title} onChange={this.handleTitleChange} type="text" required/>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>                                    
                                    <label>Title</label>
                                </div>
                                <div className="group">
                                    <input value={this.state.content} onChange={this.handleContentChange} type="text" required/>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>                                                                       
                                    <label>Message</label> 
                                </div>
                            </div>
                            <div className={"modal-footer " + this.state.theme}>
                                <input id="send-button" type="submit" value="Send" />
                                <button id="cancel-button" onClick={this.closeChatModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    openChatModal(event) {
        event.preventDefault();
        this.setState(prevState => ({
            showModel: true
        }));
    }

    closeChatModal(event) {
        event.preventDefault();
        this.setState(prevState => ({
            showModel: false
        }));
    }

    onModalClick(event) {
        console.log(event);
        event.preventDefault();
        event.stopPropagation();
    }

    sendMessage(event) {
        event.preventDefault();
        const message = {
            sender: this.state.sender,
            title: this.state.title,
            content: this.state.content
        };
        const messageEvent = new CustomEvent('message', message);
        window.dispatchEvent(messageEvent);
        this.closeChatModal(event);
        this.setState({
            sender: '',
            title: '',
            content: ''
        });
    }

    handleSenderChange(event) {
        this.setState({sender: event.target.value});
    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleContentChange(event) {
        this.setState({content: event.target.value});
    }

}

export default App;