import React, { useContext, useEffect } from 'react'
import DataContext from '../context/data/dataContext'
import TableUser from './TableUser';
const Alluser = () => {
    const context = useContext(DataContext);
    const { alluser, fetchalluser } = context;
    useEffect(() => {
        fetchalluser();
    })
    return (
        <>
        <h3 className='my-3 text-center' style={{color:'blue'}}>Details of all the users</h3>
            <table className="table text-center table-light mx-auto" style={{width:'80%',border:'3px'}}>
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Created on</th>
                        <th scope="col">Updated on</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        alluser.map((user, index) => {
                            return <TableUser key={index} user={user} />
                        })

                    }
                </tbody>
            </table>
        </>
    )
}

export default Alluser
