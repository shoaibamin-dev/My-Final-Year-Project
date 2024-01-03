import React from 'react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import RotateRightIcon from '@material-ui/icons/RotateRight';


let rotationCounter = 0
const styles = {
    padding: '0.5rem 1rem',
    cursor: 'move',
    width: '500px',
    height: '100%'
}
export const Image = ({ yellow, index, imgFile }) => {

    console.log("GOT FILE", imgFile)

   
    const backgroundColor = yellow ? '#e3f2fc' : 'white'
    return <div id={`container-${index}`} style={{ transform: `rotate(${rotationCounter}deg)` }}>
        <ButtonGroup className="removable-elem">
            <IconButton size="small" variant="contained" color="primary" onClick={() => {
                document.querySelector(`#img-${index}`).style.width = parseFloat(document.querySelector(`#img-${index}`).style.width) - 3 + 'px';

        }}><RemoveCircleOutlineIcon /></IconButton>

            <IconButton size="small" variant="contained" color="primary" onClick={() => {
                
                
                document.querySelector(`#img-${index}`).style.width = parseFloat(document.querySelector(`#img-${index}`).style.width) +3 + 'px'
        
        
        }}><AddCircleOutlineIcon /></IconButton>

            <IconButton size="small" variant="contained" color="primary" onClick={() => document.querySelector(`#container-${index}`).style.transform = `rotate(${++rotationCounter}deg)`}><RotateRightIcon /></IconButton>

            <IconButton size="small" variant="contained" color="primary" onClick={() => document.querySelector(`#container-${index}`).style.transform = `rotate(${--rotationCounter}deg)`}><RotateLeftIcon /></IconButton>

            <IconButton onClick={() => document.querySelector(`#container-${index}`).style.display = 'none'} style={{ float: 'right' }} size="small" variant="contained" color="primary"><DeleteIcon /></IconButton>
        </ButtonGroup>

        <div key={imgFile.name}>
            <div>
                <img id={`img-${index}`} src={imgFile.preview} style={styles} alt="preview" />
            </div>
        </div>


    </div>

}
