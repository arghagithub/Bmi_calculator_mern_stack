import React, { useContext, useEffect, useRef, useState } from 'react'
import DataContext from '../context/data/dataContext';
import { useNavigate } from 'react-router-dom';
const BMI = require('./BMI.png');
const Showuser = (props) => {
  const {showalert}=props;
  const modal = useRef(null);
  const closemodal = useRef(null);
  const navigate = useNavigate();
  const context = useContext(DataContext);
  const { user, getUser, deleteuser, updateuser } = context;
  const [credentials, setCredentials] = useState({
    eid: "", ename: "", eemail: "", epassword: "", econfirmpassword: ""
  })
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  }
  useEffect(() => {
    if (localStorage.getItem('userlogintoken')) {
      getUser();
    }
    else {
      navigate('/login');
    }
  })
  const usemodal = (currentuser) => {
    modal.current.click();
    setCredentials({ eid: currentuser._id, ename: currentuser.name, eemail: currentuser.email });
  }
  const handleupdate = () => {
    closemodal.current.click();
    updateuser(credentials.eid, credentials.ename, credentials.eemail, credentials.epassword);
    showalert("user's data is updated successfully","success");
  }
  return (
    <>
      <div>
        <button type="button" ref={modal} style={{display:'none'}} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit your profile</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="ename" className="form-label">Name</label>
                    <input type="text" className="form-control" id="ename" onChange={handleChange} name='ename' value={credentials.ename ||""} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="eemail" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="eemail" onChange={handleChange} name='eemail' value={credentials.eemail ||""} aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="epassword" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={handleChange} id="epassword" value={credentials.epassword ||""} name='epassword' placeholder='please enter the old/new password' />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ecpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={handleChange} id="ecpassword" value={credentials.ecpassword ||""} name='ecpassword' />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" style={{display:'none'}} ref={closemodal} data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" disabled={credentials.ename === '' || credentials.eemail === '' || credentials.epassword !== credentials.ecpassword || credentials.epassword === ''} onClick={handleupdate}>Update data</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex flex-column align-items-center' style={{ height: '700px' }}>
        <h4 className='mt-3'>BMI Calculator for you and your family</h4>
        <img className='my-5' src={BMI} style={{ height: '150px', weight: '150px', borderRadius: '20px' }} alt="" />
        <div className="card mx-auto">
          <div className="card-body text-center">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">id: <strong>{user._id}</strong></p>
            <p className="card-text">email: <strong>{user.email}</strong></p>
            <p className="card-text">created at: <strong>{new Date(user.createdAt).toGMTString()}</strong></p>
            <p className='card-text'>updated at: <strong>{new Date(user.updatedAt).toGMTString()}</strong></p>
            <div className='d-flex justify-content-center'>
              <button type="button" className="btn btn-danger" onClick={() => { deleteuser();showalert("user's account is deleted succesfully","success");setTimeout(() => {
                navigate('/signup');
              }, 1500); localStorage.removeItem('userlogintoken'); }}>Delete Account</button>
                
              <button type="button" className="btn btn-warning mx-2" onClick={() => { usemodal(user) }}>Update profile</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Showuser
