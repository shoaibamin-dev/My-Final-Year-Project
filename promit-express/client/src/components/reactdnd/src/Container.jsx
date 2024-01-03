import React from 'react'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import DraggableBox from './DraggableBox'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import { snapToGrid } from './snapToGrid'
import update from 'immutability-helper'
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

import DropImage from './DropImageUtils';
import ImageIcon from '@material-ui/icons/Image';
import SaveIcon from '@material-ui/icons/Save';
import * as html2canvas from 'html2canvas';
import ColorPicker from './ColorPickerUtil'
import $ from "jquery";

const styles = {
  width: '100%',
  height: 1024,
  position: 'relative'
 
}



let boxCounter = 0;
class Container extends React.PureComponent {
  constructor() {
    super(...arguments)
    console.log(this.props)
    this.state = { isSaved: false, boxes: {}, images: {} }
  }

  incrementBoxes = () => {
    this.setState(prevState => ({
      boxes: {
        ...prevState.boxes,
        [(boxCounter++).toString()]: { top: 100, left: 480, title: 'WRITE HERE ANYTHING!!!', type: "CUSTOM_TEXT" }
      }
    }))



    console.log("NEW ST BOX", this.state)
  }

  incrementImages = (imgFile) => {


    this.setState(prevState => ({
      boxes: {
        ...prevState.boxes,
        [(boxCounter++).toString()]: { top: 100, left: 480, file: imgFile, type: "CUSTOM_IMAGE" }
      }
    }))



    console.log("NEW ST IMG", this.state)

  }

  handleSaveFunnel = () => {

    $('.removable-elem').css({visibility:'hidden'});
    $('.chromecolorpicker').css({visibility:'hidden'});
    $('.funnel-lines').css({visibility:'hidden'});
    $('.remove-border-textbox').css({border:'none'});
   


    html2canvas(document.body, { letterRendering: 1, allowTaint: true }).then(canvas => {
     
      
      this.props.getPicture(canvas)


      // $('#funnel-result').html(canvas)
      // console.log(canvas)
      $('.removable-elem').css({visibility:'visible'});
    $('.chromecolorpicker').css({visibility:'visible'});
    $('.funnel-lines').css({visibility:'visible'});

      $('.remove-border-textbox').css({border: '1px dashed gray'});

    });


    // html2canvas(document.body, { letterRendering: 1, allowTaint : true, onrendered : function (canvas) { document.body.appendChild(canvas) } });
  }

  render() {
    const { connectDropTarget } = this.props
    const { boxes, inputs } = this.state
    return connectDropTarget(
      <div style={{ border: '1px dashed gray'}}>


<svg className="funnel-lines" height="1024" width="100%" style={{position:'absolute', borderLeft:'1px dashed gray'}}>
</svg>

<div className="funnel-lines" style={{width:'100%', height:'512px',position:'absolute', borderBottom:'1px dashed gray'}}></div>


        <div id="funnel-container" style={styles}>

          <div className="chromecolorpicker" style={{position:'absolute', right:'0%',top: '7%'}}>
          <ColorPicker/>
          </div>
          <ButtonGroup style={{ marginLeft: '87%' }}>



            <IconButton variant="contained" color="primary">
              <DropImage incrementImages={this.incrementImages} />
            </IconButton>

            <IconButton onClick={() => this.incrementBoxes()} variant="contained" color="primary" >
              <AddCircleIcon style={{ height: '50px', width: '50px' }} />
            </IconButton>


          </ButtonGroup>


          {Object.keys(boxes).map((key) => this.renderBox(boxes[key], key))}

          <div> 
          <CircularProgress 
          style={{
            position: 'absolute',
            bottom: '2%',
            right: '20%'
          }}
            color="secondary" />
          <Button
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<SaveIcon />}
            className="removable-elem"
            style={{
              position: 'absolute',
              bottom: '2%',
              right: '2%'
            }}
            onClick={() => this.handleSaveFunnel()}
          >
            <b>SAVE THIS FUNNEL</b>
          </Button></div>

        </div>

        <div id="funnel-result">

        </div>


      </div>,
    )
  }
  moveBox(id, left, top) {
    this.setState(
      update(this.state, {
        boxes: {
          [id]: {
            $merge: { left, top },
          },
        },
      }),
    )
  }
  renderBox(item, key) {
    return <DraggableBox key={key} id={key} {...item} />
  }
}
export default DropTarget(
  ItemTypes.BOX,
  {
    drop(props, monitor, component) {
      if (!component) {
        return
      }
      const delta = monitor.getDifferenceFromInitialOffset()
      const item = monitor.getItem()
      let left = Math.round(item.left + delta.x)
      let top = Math.round(item.top + delta.y)
      if (props.snapToGrid) {
        ;[left, top] = snapToGrid(left, top)
      }
      component.moveBox(item.id, left, top)
    },
  },
  (connect) => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(Container)
