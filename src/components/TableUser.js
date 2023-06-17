import React from 'react'

const TableUser = (props) => {
    const { user } = props;
    return (
        <tr>
            <th  scope="row">{user._id}</th>
            <td >{user.name}</td>
            <td >{user.email}</td>
            <td >{new Date(user.createdAt).toUTCString()}</td>
            <td >{new Date(user.updatedAt).toUTCString()}</td>
        </tr>
    )
}

export default TableUser
