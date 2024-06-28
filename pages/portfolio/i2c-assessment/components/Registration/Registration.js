

// import './Registration.css';
import Card from '../Card/Card';
import Button from '../Button/Button';
import { useState } from 'react';

function isValidEmail(email) {
  var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

function Regsitration() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: ""
  });
  const [nameErr, setNameErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [invalidErr, setInvalidErr] = useState(false);
  const [err, setErr] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setRegistered(false);

    if (!formData.name) {
      setNameErr(true);
      return;
    }
    if (!formData.email) {
      setEmailErr(true);
      return;
    }
    if (!isValidEmail(formData.email)) {
      setInvalidErr(true);
      return
    }

    setNameErr(false);
    setEmailErr(false);
    setInvalidErr(false);

    const emails = JSON.parse(localStorage.getItem("emails") || "[]");
    console.log(emails)
    if (emails.find(a => a === formData.email)) {
      setErr(true);
      return;
    }

    setErr(false);
    localStorage.setItem("emails", JSON.stringify([...emails, formData.email]));
    setRegistered(true);
  }

  return (
    <Card className="registration">
      <div>
        <h1>Registration</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae, in tristique senectus dui pharetra sit.</p>
      </div>

      <form onSubmit={handleSubmit} className='form'>
        <div className='control'>
          <label htmlFor="name">Name <span>*</span></label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder='Enter your name'/>
          {nameErr && <p className='error'>Name is required</p>}
        </div>
        <div className='control'>
          <label htmlFor="comapny">Company</label>
          <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} placeholder='Enter your company name'/>
        </div>
        <div className='control'>
          <label htmlFor="email">Email <span>*</span></label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter your email address'/>
          {emailErr && <p className='error'>Email is required</p>}
          {invalidErr && <p className='error'>Email is invalid</p>}
        </div>
        {err && <p className='error'>Already registered!</p>}
        {registered && <p className='success'>Registered!</p>}
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  )
}

export default Regsitration;