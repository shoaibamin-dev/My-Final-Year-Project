import React from 'react'
import axios from 'axios'

const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/send_email',{h:1}).then(res=>console.log(res));
}


export const Mailer = () => {

    console.log("MAILER")

return( <div class="container">
<h1 class="brand"><span>Acme</span> Web Design</h1>
<div >
  <div >
    <h3>Acme Web Design</h3>
    <ul>
      <li><i ></i> 44 Something st</li>
      <li><i ></i> (555) 555-5555</li>
      <li><i ></i> test@acme.test</li>
    </ul>
  </div>
  <div class="contact">
    <h3>Email Us</h3>
   
    <form onSubmit={(e)=>handleSubmit(e)}>
      <p>
        <label>Name</label>
        <input type="text" name="name"/>
      </p>
      <p>
        <label>Company</label>
        <input type="text" name="company"/>
      </p>
      <p>
        <label>Email Address</label>
        <input type="email" name="email"/>
      </p>
      <p>
        <label>Phone Number</label>
        <input type="text" name="phone"/>
      </p>
      <p class="full">
        <label>Message</label>
        <textarea name="message" rows="5"></textarea>
      </p>
      <p class="full">
        <button type="submit">Submit</button>
      </p>
    </form>
  </div>
  </div>

</div>)


}