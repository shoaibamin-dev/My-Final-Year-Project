import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import ImageIcon from '@material-ui/icons/Image';
import IconButton from '@material-ui/core/IconButton';

 function DropImage(props) {
    console.log("RECV PROPS", props)
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          {Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        
          props.incrementImages(file);
        
        }
        )
      )
    },
  })

//   const images = files.map((file) => (
//     <div key={file.name}>
//       <div>
//         <img src={file.preview} style={{ width: "200px" }} alt="preview" />
//       </div>
//     </div>
//   ))

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
            <ImageIcon style={{ height: '50px', width: '50px' }} />
          
      </div>
    </div>
  )
}

export default DropImage