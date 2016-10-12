import React from 'react';
import {render, findDOMNode, ReactDOM, unmountComponentAtNode} from 'react-dom';

// var React = require("react");
// var ReactDOM = require("react-dom");

var helloReact = React.createClass({
	getInitialState() {
	    return {
	        firstName: '',
	        lastName: ''  
	    };
	},
	getDefaultProps() {
	    return {
	        defaultProps: "default props"  
	    };
	},
	componentWillReceiveProps(nextProps) {
	    this._logPropsAndState('component will receive props');
	    console.log('nextProps.likes: ' + nextProps.defaultProps);
	    this.setState({
	    	firstName: nextProps.defaultProps > this.props.defaultProps 
	    });  
	},
	shouldComponentUpdate(nextProps, nextState) {
	    this._logPropsAndState('should component update');
	    console.log(
	    	'nextProps.defaultProps',
	    	nextProps.defaultProps,
	    	'nextState.firstName: ',
	    	nextState.firstName
	    );
	    // this.state.firstName = nextState.firstName;
	    // return nextProps.defaultProps > 1;  
	    return true;
	},
	componentDidMount() {
	    console.log('hello react component did mount');  
	},
	componentDidUpdate(prevProps, prevState) {
	    this._logPropsAndState('componentDidUpdate');
	    console.log(
	    	'prevProps.defaultProps',
	    	prevProps.defaultProps,
	    	'prevState.firstName',
	    	prevState.firstName
	    );
	    console.log('componentDidUpdate() give an opportunity to execute code after react is finished updating the DOM.');  
	},
	_logPropsAndState(callingFunction){
		console.log('=> ' + callingFunction);
		console.log('this.props.defaultProps: ' + this.props.defaultProps);
		console.log('this.state.firstName: ' + this.state.firstName );
	},
	update: function(){
		this.setState({
			firstName: this.refs.firstName.refs.messageTextBox.value,
			lastName: this.refs.lastName.refs.messageTextBox.value
		});
	},
	componentDidMount() {
	    console.log("hello react component did mount");  
	},
	reload: function(){
		// ReactDOM.unmountComponentAtNode(document.getElementById('app'));
		try{
			unmountComponentAtNode(document.getElementById('app'));
			// React.unmountAndReleaseReactRootNode(document.getElementById('app'));
		}catch(e){	
			// console.log("React: " + unmountComponentAtNode());
			console.error(e);
		}
		setTimeout(()=> {
			render(React.createElement(helloReact), document.getElementById('app'));
		},3000);
		
	},
	render: function(){
		this._logPropsAndState("render()");
		return (
				<div>
					<p>{this.props.defaultProps}</p>
					<HelloMessage
						message={'Hello ' + this.state.firstName + ' ' + this.state.lastName }>
					</HelloMessage>	
					<TextBox label="First Name" ref='firstName' update={this.update}>
					</TextBox>
					<TextBox label="Last Name" ref='lastName' update={this.update}>
					</TextBox>
					<button onClick={this.reload}>Reload</button>
					<UserList/>
					<ExampleForm/>
				</div>
			);
	}
});

var ReactMixin1 = {
	log: function(message){
		console.log(message);
	},
	componentWillMount() {
	    this.log('component will mount from ReactMixin1');  
	}
};

var ReactMixin2 = {
	componentWillMount() {
	    console.log("component will mount from ReactMixin2");  
	}
};

var HelloMessage = React.createClass({
	mixins: [ReactMixin1, ReactMixin2],
	componentWillMount() {
	    console.log('component will mount from HelloMessage');  
	},
	componentDidMount() {
	    console.log('hello message component did mount');  
	},
	componentWillUnmount() {
	    console.log('component will unmount');  
	},
	render: function(){
		return <h2>{this.props.message}</h2>;
	}
});

var Button = React.createClass({
	mixins: [ReactMixin1, ReactMixin2],
	clicked: function(){
		this.log(this.props.text + 'clicked');
	},
	componentWillMount() {
	    this.log("component will mount from Button");  
	},
	render: function(){
		return (
			<button onClick={this.props.onClick} >
			{this.props.children}
			</button>
		);
	}
});

var GlyphIcon = React.createClass({
	render: function(){
		return (
			<span className={'glyphicon glyphicon-' + this.props.icon }>
			</span>
		);
	}
});

var TextBox = React.createClass({
	getInitialState() {
	    return {
	        isEditing: false,
	        text: this.props.label  
	    };
	},
	componentDidMount() {
	    this.setState({
	    	text: this.refs.messageTextBox.value
	    });
	},
	update: function(){	
		this.setState({
			text: this.refs.messageTextBox.value,
			isEditing: false
		});
		this.props.update();
	},
	edit: function(){
		this.setState({	
			isEditing: true
		});
	},
	render: function(){
		return(
			<div>
				{this.props.label}<br/>
				<input type="text" ref="messageTextBox" disabled={!this.state.isEditing}/>
				{
					this.state.isEditing?
						<button onClick={this.update}><GlyphIcon icon='ok'/>Update</button>
						:
						<button onClick={this.edit}><GlyphIcon icon='pencil'/>Edit</button>
				}
			</div>
		);
	}
});

var UserRow = React.createClass({
	render: function(){
		return (
			<tr>
				<td>{ this.props.user.userName }</td>
				<td>
					<a href={'mailto: ' + this.props.user.email}> { this.props.user.email } </a>
				</td>
			</tr>
		);
	}
});

var UserList = React.createClass({
	getInitialState() {
	    return {
	        users: [
	        	{
	        		id: 1,
	        		userName: 'lzm',
	        		email: 'lzm420241@gmail.com'
	        	},
	        	{
	        		id: 2,
	        		userName: 'AdamHorton',
	        		email: 'digitalicarus@gmail.com'
	        	}
	        ]  
	    };
	},
	render: function(){
		var users = this.state.users.map(
				function(user){
					//key prevents react warning
					return (
						<UserRow user={user} key={user.id}/>
					);
				}
			);
		return (
			<table>
			  <tbody>
				<tr>
					<th>User Name</th>
					<th>Email Address</th>
				</tr>
				{users}
			  </tbody>	
			</table>
		);
	}
});

var ExampleForm = React.createClass({
	getInitialState() {
	    return {
	        message: 'Read and Write'  
	    };
	},
	getDefaultProps() {
	    return {
	        message: 'Read Only'  
	    };
	},
	onChange: function(event){
		this.setState({message: event.target.value});
	},
	render: function(){
		return (
		  <div>	
			<input id='readOnly' className="form-control" type="text" value={this.props.message} />
			<input id="readAndWrite" className="form-control" value={this.state.message} onChange={this.onChange} />
		  </div>	
		);
	}
});

render(React.createElement(helloReact), document.getElementById('app'));
// render(React.createElement(helloReact, { name: 'hello,world' }), document.getElementById('app'));
// render(new helloReact({ name: 'this is a props name' }), document.getElementById('app'));