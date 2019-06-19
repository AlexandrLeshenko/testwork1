import React from 'react';
import "./Main.module.css";

class TitleElement extends React.Component {

    sortFieldColum = ()=>{

            if(this.props.isActive && this.props.sort ==='asc') {
                this.props.sortColum(this.props.pageNumber ,this.props.title, 'desc');
            }
            else {
                this.props.sortColum(this.props.pageNumber ,this.props.title, 'asc');
            }
    }


    render() {
        return(

            <div className={this.props.isActive ? 'active' : ''} onClick={()=>{this.sortFieldColum()}}>
                {this.props.title}
                {this.props.isActive ?`  (${this.props.sort})` : ''}
            </div>)

    }
}

export default TitleElement;