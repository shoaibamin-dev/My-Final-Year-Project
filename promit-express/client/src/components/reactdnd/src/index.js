
	import React from 'react'
	import ReactDOM from 'react-dom'
	import Example from './example.js'
	import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'
	import axios from 'axios';
	
	
	
	const Swal = require('sweetalert2')

	

	export default function App(props) {

		console.log("inside REACTDND", props)

		//Picture ID, PromoterID, ProductID
		const [states, setStates] = React.useState({});

		const getPicture = (pic) => {
			
			console.log("GET PIC CALLED")
			
			// let sfile = pic.toDataURL(); 

			// var fd = new FormData()
			// fd.append('files', sfile)

			// axios.post('/api/promotion/upload_promotion_picture', fd)
			// .then((res) => {
			// 	console.log(res.data)
			// })

			let dataURL = pic.toDataURL()
			// console.log(dataURL)
			var blobBin = atob(dataURL.split(',')[1]);
			var array = [];
			for(var i = 0; i < blobBin.length; i++) {
				array.push(blobBin.charCodeAt(i));
			}
			var file=new Blob([new Uint8Array(array)], {type: 'image/png'});
			
			var statebody = {product_id:props.product._id, seller_id: props.product.owner_id, promoter_id: props.current_seller_data.current_seller_data._id }


			var formdata = new FormData();	
			formdata.append('files', file);
			formdata.append('state', JSON.stringify(statebody))


			
			axios.post('/api/promotion/upload_promotion_picture', formdata)
			.then((res) => {	

				console.log(res.data, "RESPONSE ")



				axios.post('/api/promotion/', res.data).then((ress) => {
					console.log(ress,"PROMOTION SAVED")
				




				const newPromoter = {...props.current_seller_data.current_seller_data};
				// console.log(newPromoter, "newPromoter")
				newPromoter.promoting_products.push(ress.data.result._id)

				console.log(newPromoter)

				axios.put(`/api/promoter/${newPromoter._id}`, newPromoter).then((resss) => {
				
					Swal.fire(
						'Funnel Created!',
						'You can go to promotions section to view.',
						'success'
					  );
					
				});

			})
			})

			// console.log(pic.toBlob(),"pic")
		}


		return (
			<div className="App">
				<DndProvider backend={HTML5Backend}>
					<Example getPicture={getPicture} />
				</DndProvider>
			</div>
		)
	}


