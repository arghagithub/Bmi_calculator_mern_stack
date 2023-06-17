import React, { useState } from 'react'
import DataContext from "./dataContext";

const DataState = (props) => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState({});
    const [alluser, setAllUser] = useState([]);


    //data specific

    const fetchdata = async () => {
        try {
            try {
                const response = await fetch("http://localhost/api/data/fetchdata", {
                    method: "GET", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('userlogintoken')
                    },
                });

                const result = await response.json();
                if (result.success) {
                    setData(result.data);
                }
            } catch (error) {
                console.error("Error:", error);
                console.log("Data is not fetched");
            }
        } catch (error) {

        }
    }

    const adddata = async (name, age, gender, feet, inch, kg) => {
        try {
            const response = await fetch("http://localhost/api/data/adddata", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('userlogintoken')
                },
                body: JSON.stringify({ name, age, gender, feet, inch, kg }),
            });

            const result = await response.json();
            if (result.success) {
                setData(data.concat(result.data));
            }
            else {
                console.log("Data is not added");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const updateData = async (id, name, age, gender, feet, inch, kg) => {
        try {
            const response = await fetch(`http://localhost/api/data/updatedata/${id}`, {
                method: "PUT", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('userlogintoken')
                },
                body: JSON.stringify({ name, age, gender, feet, inch, kg }),
            });

            const result = await response.json();
            if (result.success) {
                for (let index = 0; index < data.length; index++) {
                    let element = data[index];
                    if (element._id === id) {
                        element.name = name;
                        element.age = age;
                        element.gender = gender;
                        element.feet = feet;
                        element.inch = inch;
                        element.kg = kg;
                        break;
                    }
                }
                setData(data);
            }
            else {
                console.log("Data is not updated properly");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const deleteData = async (id) => {
        try {
            const response = await fetch(`http://localhost/api/data/deletedata/${id}`, {
                method: "DELETE", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('userlogintoken')
                },
            });

            const result = await response.json();
            if (result.success) {
                let newdata = data.filter((d) => {
                    return d._id !== id
                })
                setData(newdata);
            }
            else {
                console.log('Data is not deleted successfully');
            }

        } catch (error) {
            console.error("Error:", error);
        }
    }




    //user specific


    const getUser = async () => {
        try {
            const response = await fetch("http://localhost/api/auth/getuserdetail", {
                method: "GET", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('userlogintoken'),
                }
            });

            const result = await response.json();
            if (result.success) {
                setUser(result.user);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }



    const fetchalluser = async () => {
        try {
            const response = await fetch("http://localhost/api/auth/fetchalluser", {
                method: "GET", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                    "auth-admintoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY0ODk0MWI4NTMxYTNjOWYxNDEyMjU3ZSJ9LCJpYXQiOjE2ODY3MTg1NjB9.Nf3zzCpm3tKC1QvXsPYZyWZsDKHTK6Ku5F6TIMmUCCk"
                }
            });

            const result = await response.json();
            if (result.success) {
                setAllUser(result.user);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const updateuser = async (id,name,email,password) => {
        try {
            const response = await fetch("http://localhost/api/auth/updateuser", {
                method: "PUT", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                    "auth-admintoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY0ODk0MWI4NTMxYTNjOWYxNDEyMjU3ZSJ9LCJpYXQiOjE2ODY3MTg1NjB9.Nf3zzCpm3tKC1QvXsPYZyWZsDKHTK6Ku5F6TIMmUCCk",
                    "auth-token": localStorage.getItem('userlogintoken'),
                },
                body: JSON.stringify({name,email,password}),
            });

            const result = await response.json();
            if(result.success){
                for (let index = 0; index < alluser.length; index++) {
                    let element = alluser[index];
                    if (element._id===id){
                        element.name=name;
                        element.email=email;
                        element.password=password;
                        break;
                    }
                }
                setAllUser(alluser);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const deleteuser = async () => {
        try {
            const response = await fetch("http://localhost/api/auth/deleteuser", {
                method: "DELETE", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                    "auth-admintoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY0ODk0MWI4NTMxYTNjOWYxNDEyMjU3ZSJ9LCJpYXQiOjE2ODY3MTg1NjB9.Nf3zzCpm3tKC1QvXsPYZyWZsDKHTK6Ku5F6TIMmUCCk",
                    "auth-token": localStorage.getItem('userlogintoken'),
                }
            });

            const result = await response.json();
            if (result.success) {
                console.log(result.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <DataContext.Provider value={{ data, setData, fetchdata, adddata, deleteData, updateData, user, alluser, getUser, fetchalluser, deleteuser,updateuser }} >
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState
