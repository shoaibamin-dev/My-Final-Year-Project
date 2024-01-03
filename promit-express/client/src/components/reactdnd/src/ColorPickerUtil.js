import React from 'react';
import { ChromePicker } from 'react-color';
import $ from "jquery";
 



export default class ColorPicker extends React.Component {

    constructor(props) {
        super(props)


        this.state = {
            background: '#fff',
        };

    }
    

    componentDidMount(){
        document.getElementsByClassName('flexbox-fix')[1].style.display='none'

    }

    handleChangeComplete = (color) => {
        $('.full-container').css({
            backgroundColor:color.hex
        })
        this.setState({ background: color.hex });
    };

    render() {
        return (
           
            <ChromePicker
              
                color={this.state.background}
                onChangeComplete={this.handleChangeComplete}
            />
            
        );
    }
}