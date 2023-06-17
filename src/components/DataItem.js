import React, { useContext } from 'react'
import DataContext from '../context/data/dataContext';
const DataItem = (props) => {
    const {showalert}=props;
    const context = useContext(DataContext);
    const { deleteData } = context;
    const { element, editdata } = props;
    return (
        <div className='my-2'>
            <div className="card mx-3" style={{ width: '18rem' }}>
                <div className="card-body text-center">
                    <h5 className="card-title" style={{ color: 'blue' }}>{element.name}</h5>
                    <p className="card-text"><strong>age:</strong> {element.age}</p>
                    <p className="card-text"><strong>gender:</strong> {element.gender}</p>
                    <p className="card-text"><strong>feet:</strong> {element.feet}</p>
                    <p className="card-text"><strong>inch:</strong> {element.inch}</p>
                    <p className="card-text"><strong>kg:</strong> {element.kg}</p>
                    <p className="card-text"><strong>BMI:</strong> {element.bmi} kg/m<sup>2</sup></p>
                    <p className="card-text">health_condition: <strong style={{ color: (element.condition === 'underwait') ? 'purple' : (element.condition === 'normal wait') ? 'green' : (element.condition === 'pre-obesity') ? 'orange' : 'red' }}>{element.condition}</strong> </p>
                    <div className='d-flex justify-content-center'>
                        <i className="fa-solid fa-trash fa-lg" onClick={() => { deleteData(element._id);showalert("data is deleted successfully","success") }} style={{ color: '#ff0000' }}></i>
                        <i className="fa-solid fa-pen-to-square fa-lg mx-3" onClick={() => { editdata(element) }} style={{ color: '#1e00ff' }}></i>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default DataItem
