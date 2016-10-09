import React from 'react';

class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = ['Alice', 'Emily', 'Kate'];
    }
    render() {
        return <div>{ 
        	this.displayName.map(function(name){
        		return <div>hello, {name}!</div>
        	})
         }</div>;
    }
}

export default Hello;
