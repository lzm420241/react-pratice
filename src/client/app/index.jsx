import React from 'react';
import {render, findDOMNode, ReactDOM} from 'react-dom';

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
	    return nextProps.defaultProps > 1;  
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
			React.unmountComponentAtNode(document.getElementById('app'));
		}catch(e){	
			console.error(e);
		}
		render(React.createElement(helloReact), document.getElementById('app'));
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
				</div>
			);
	}
});

var HelloMessage = React.createClass({
	componentWillMount() {
	    console.log('component will mount');  
	},
	componentDidMount() {
	    console.log('component did mount');  
	},
	componentWillUnmount() {
	    console.log('component will unmount');  
	},
	render: function(){
		return <h2>{this.props.message}</h2>;
	}
});

var Button = React.createClass({
	render: function(){
		return (
			<button onClick={this.props.onClick}>
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
	// componentDidMount() {
	//     this.setState({
	//     	text: this.refs.messageTextBox.findDOMNode().value
	//     });
	// },
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

render(React.createElement(helloReact), document.getElementById('app'));
// render(React.createElement(helloReact, { name: 'hello,world' }), document.getElementById('app'));
// render(new helloReact({ name: 'this is a props name' }), document.getElementById('app'));