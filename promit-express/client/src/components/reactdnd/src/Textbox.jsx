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
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';

const fonts = [
    '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
    'Arial, Helvetica, sans-serif',
    'Helvetica Narrow, sans-serif',
    '"Arial Black", Gadget, sans-serif',
    'Bookman, serif',
    'New Century Schoolbook, serif',
    'Andale Mono, monospace',
    'Courier New, monospace',
    'Lucidatypewriter, monospace',
    'Fixed, monospace',
    'Comic Sans, Comic Sans MS, cursive',
    'Zapf Chancery, cursive',
    'Coronetscript, cursive',
    'Florence, cursive',
    'Parkavenue, cursive',
    '"Comic Sans MS", cursive, sans-serif',
    'Impact, Charcoal, sans-serif',
    'Tahoma, Geneva, sans-serif',
    '"Trebuchet MS", Helvetica, sans-serif',
    'Verdana, Geneva, sans-serif',
    'Georgia, serif',
    '"Palatino Linotype", "Book Antiqua", Palatino, serif',
    '"Times New Roman", Times, serif',
    '"Courier New", Courier, monospace',
    '"Lucida Console", Monaco, monospace',
    'Impact, fantasy',
    'Arnoldboecklin, fantasy',
    'Oldtown, fantasy',
    'Blippo, fantasy',
    'Brushstroke, fantasy'
]

let fontCounter = 0;
let rotationCounter=0
const styles = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
    width: '100%',
    fontSize: 16,
    fontStyle:'normal',
    fontWeight:'normal',
    textDecoration:'none',
    fontFamily:fonts[fontCounter++],
    display: 'block',
    zIndex:1,
    resize: 'both'

    
 
}
export const Textbox = ({ title, yellow,index }) => {
    console.log(title,"TITLE")
    const backgroundColor = yellow ? '#e3f2fc' : 'transparent';
    return <div id={`container-${index}`} style={{ transform : `rotate(${rotationCounter}deg)`,zIndex:1}}>
        <ButtonGroup className="removable-elem">
            <IconButton  size="small" variant="contained" color="primary" onClick={()=>document.querySelector(`#input-${index}`).style.fontSize=parseFloat(document.querySelector(`#input-${index}`).style.fontSize)-1+'px'}><RemoveCircleOutlineIcon /></IconButton>

            <IconButton  size="small" variant="contained" color="primary" onClick={()=>document.querySelector(`#input-${index}`).style.fontSize=parseFloat(document.querySelector(`#input-${index}`).style.fontSize)+1+'px'}><AddCircleOutlineIcon /></IconButton>

            <IconButton  size="small" variant="contained" color="primary" onClick={()=>document.querySelector(`#input-${index}`).style.fontFamily=fonts[(fontCounter-- + fonts.length)%fonts.length]}><ArrowBackIcon /></IconButton>

            <IconButton  size="small" variant="contained" color="primary" onClick={()=>document.querySelector(`#input-${index}`).style.fontFamily=fonts[(fontCounter++ + fonts.length)%fonts.length]}><ArrowForwardIcon /></IconButton>

            <IconButton  size="small" variant="contained" color="primary" onClick={()=>document.querySelector(`#input-${index}`).style.fontWeight=(document.querySelector(`#input-${index}`).style.fontWeight=='normal')?('bold'):('normal') }><FormatBoldIcon /></IconButton>

            <IconButton  size="small" variant="contained" color="primary" onClick={()=>document.querySelector(`#input-${index}`).style.fontStyle=(document.querySelector(`#input-${index}`).style.fontStyle=='normal')?('italic'):('normal') }><FormatItalicIcon /></IconButton>
            
            <IconButton  size="small" variant="contained" color="primary" onClick={()=>document.querySelector(`#input-${index}`).style.textDecoration=(document.querySelector(`#input-${index}`).style.textDecoration=='none')?('underline'):('none') }><FormatUnderlinedIcon /></IconButton>
            
            <IconButton  size="small" variant="contained" color="primary" onClick={()=>document.querySelector(`#container-${index}`).style.transform = `rotate(${++rotationCounter}deg)` }><RotateRightIcon /></IconButton>
            
            <IconButton  size="small" variant="contained" color="primary" onClick={()=>document.querySelector(`#container-${index}`).style.transform = `rotate(${--rotationCounter}deg)` }><RotateLeftIcon /></IconButton>

            <IconButton onClick={()=>document.querySelector(`#container-${index}`).style.display='none'} style={{ float: 'right' }} size="small" variant="contained" color="primary"><DeleteIcon /></IconButton>
        
        </ButtonGroup>
        <input  id={`input-${index}`} size={3} onChange={(ev) => {ev.target.size = ev.target.value.length + 2; title=ev.target.value}} style={{ ...styles, backgroundColor}} className="remove-border-textbox"  placeholder={title}/>

{/* <textarea  id={`input-${index}`} size={3} onChange={(ev) => {ev.target.size = ev.target.value.length + 2; title=ev.target.value}} style={{ ...styles, backgroundColor}} className="remove-border-textbox"  placeholder={title} name="textarea" ></textarea> */}
    </div>

}
