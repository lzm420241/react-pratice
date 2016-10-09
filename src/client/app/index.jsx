import React from 'react';
import {render} from 'react-dom';

var helloReact = React.createClass({
	getInitialState() {
	    return {
	        messageA: 'I am from default state'  
	    };
	},
	updateMessage: function(e){
		this.setState({messageA: e.target.value});
	},
	getDefaultProps() {
	    return {
	        message: 'I am from default',
	        number: 24  
	    };
	},
	propTypes: {
	    message: React.PropTypes.string,
	    number: React.PropTypes.number
	},
	render: function(){
		return (
				<div>
					<input type='text' onChange={this.updateMessage}/>
					<h1>{ this.state.messageA }</h1>
					<h1>Hello, React!</h1>
					<h2>{ this.props.message }</h2>
					<h3 className="lzm">{ this.props.number }</h3>
					<h3>{ this.props.name }</h3>
				</div>
			);
	}
});

render(React.createElement(helloReact, { name: 'hello,world' }), document.getElementById('app'));
// render(new helloReact({ name: 'this is a props name' }), document.getElementById('app'));