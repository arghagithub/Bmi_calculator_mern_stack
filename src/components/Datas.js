import React, { useContext, useEffect, useRef, useState } from 'react'
import DataContext from '../context/data/dataContext';
import DataItem from './DataItem';
import Adddata from './Adddata';
import { useNavigate } from 'react-router-dom';

const Datas = (props) => {
    const { showalert } = props;
    const context = useContext(DataContext);
    const { data, fetchdata, updateData } = context;
    const ref = useRef(null);
    const closeref = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('userlogintoken')) {
            fetchdata();
        }
        else {
            navigate('/login');
        }
    })
    const [edata, setEdata] = useState({
        eid: "",
        ename: "",
        eage: "",
        egender: "",
        efeet: "",
        einch: "",
        ekg: ""
    })
    const handleChange = (e) => {
        setEdata({ ...edata, [e.target.id]: e.target.value });
    }
    const editdata = (currentdata) => {
        ref.current.click();
        setEdata({ eid: currentdata._id, ename: currentdata.name, eage: currentdata.age, egender: currentdata.gender, efeet: currentdata.feet, einch: currentdata.inch, ekg: currentdata.kg });
    }
    const closeModal = () => {
        closeref.current.click();
        updateData(edata.eid, edata.ename, edata.eage, edata.egender, edata.efeet, edata.einch, edata.ekg);
        showalert("data is updated successfully", "success");
    }
    return (
        <>

            <Adddata showalert={showalert} />

            <div>
                <button type="button" ref={ref} style={{ display: 'none' }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>
                <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input value={edata.ename} onChange={handleChange} type="text" className="form-control" id="ename" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="age" className="form-label">Age</label>
                                        <input value={edata.eage} onChange={handleChange} type="number" className="form-control" id="eage" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="gender" className="form-label">Gender</label>
                                        <select className="form-select" aria-label="Disabled select example" id="egender" onChange={handleChange} value={edata.egender}>
                                            <option selected>Choose from below</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                            <option value="O">Others</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="feet" className="form-label">Feet</label>
                                        <input value={edata.efeet} onChange={handleChange} type="number" className="form-control" id="efeet" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inch" className="form-label">inch</label>
                                        <input value={edata.einch} onChange={handleChange} type="number" className="form-control" id="einch" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="kg" className="form-label">Kg</label>
                                        <input value={edata.ekg} onChange={handleChange} type="number" className="form-control" id="ekg" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={closeref} style={{ display: 'none' }} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" onClick={closeModal} className="btn btn-primary">Updata data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h3 className='text-center'>Your data</h3>
            <div className='d-flex justify-content-center flex-wrap my-3 '>

                {
                    data.map((element, index) => {
                        return <DataItem showalert={showalert} key={index} element={element} editdata={editdata} />
                    })
                }
            </div>


        </>
    )
}

export default Datas
