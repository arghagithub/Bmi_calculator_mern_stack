import React, { useContext, useState } from 'react'
import DataContext from '../context/data/dataContext';
const Adddata = (props) => {
    const {showalert}=props;
    const [data, setData] = useState({
        name: "",
        age: "",
        gender: "",
        feet: "",
        inch: "",
        kg: ""
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.id]: e.target.value });
    }
    const context = useContext(DataContext);
    const { adddata } = context;
    return (
        <>
            <div className='d-flex flex-column'>
                <h2 className='text-center my-3' style={{color:'red'}}>BMI Calculator</h2>
                <div className='d-flex justify-content-center flex-wrap my-3'>
                    <form  className='form mx-3 mb-2'  style={{ width: '47%' }}>
                        <h4 className='text-center'>Add your personal data</h4>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input value={data.name} onChange={handleChange} type="text" className="form-control" id="name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="age" className="form-label">Age</label>
                            <input value={data.age} onChange={handleChange} type="number" className="form-control" id="age" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select className="form-select" aria-label="Disabled select example" id="gender" onChange={handleChange} value={data.gender}>
                                <option value="#">Choose from below</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                                <option value="O">Others</option>
                            </select>
                        </div>

                    </form>

                    <form className='form mx-3' style={{ width: '47%' }}>
                        <h4 className='text-center'>Add your physical data</h4>
                        <div className="mb-3">
                            <label htmlFor="feet" className="form-label">Feet</label>
                            <input value={data.feet} onChange={handleChange} type="number" className="form-control" id="feet" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inch" className="form-label">inch</label>
                            <input value={data.inch} onChange={handleChange} type="number" className="form-control" id="inch" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="kg" className="form-label">Kg</label>
                            <input value={data.kg} onChange={handleChange} type="number" className="form-control" id="kg" />
                        </div>
                    </form>
                </div>
                <div className='d-flex justify-centent-center my-3'>
                    <button type="submit" onClick={() => {
                        adddata(data.name, data.age, data.gender, data.feet, data.inch, data.kg);
                        showalert("data is added successfully","info");
                        setTimeout(() => {
                            setData({
                                name: "",
                                age: "",
                                gender: "",
                                feet: "",
                                inch: "",
                                kg: ""
                            })
                        }, 1000);
                    }} className="btn btn-primary mx-auto">Submit</button>
                </div>
            </div>
        </>
    )
}

export default Adddata
