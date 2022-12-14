import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

import { BASE_URL } from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadUserInfo()
    }, [])

    const loadUserInfo = async () => {
        try {
          const value = await AsyncStorage.getItem('userInfo');
          if (value !== null) { 
            setUserInfo(JSON.parse(value))
            console.log(userInfo.token);
          }
        } catch (error) {
            console.log('no previous data');
        }
    };

    const DriverRegister = async (fname,lname,nic,email,telNum,vehicleType,lisencePlateNum,deviceNum,password) =>{
        setIsLoading(true);

        let body = {
            fname, 
            lname, 
            nic, 
            email, 
            telNum, 
            vehicleType, 
            lisencePlateNum, 
            deviceNum, 
            password,
        }
        await axios
        .post(`${BASE_URL}/drivers`,body)
        .then(res =>{
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            // console.log(userInfo);
        })
        .catch(e =>{
            console.log(`register error ${e}`);
            setIsLoading(false);
        });
    };

    const AmbulanceRegister = async (fname,lname,nic,email,telNum,hospital,lisencePlateNum,deviceNum,password) =>{
        setIsLoading(true);

        let body = {
            fname, 
            lname, 
            nic, 
            email, 
            telNum, 
            hospital, 
            lisencePlateNum, 
            deviceNum, 
            password,
        }
        await axios
        .post(`${BASE_URL}/ambulances`,body)
        .then(res =>{
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            // console.log(JSON.stringify(userInfo));
        })
        .catch(e =>{
            console.log(`register error ${e}`);
            setIsLoading(false);
        });
    };

    const EmergencyRegister = async (fname,lname,nic,email,telNum,password) =>{
        setIsLoading(true);

        let body = {
            fname, 
            lname, 
            nic, 
            email, 
            telNum,
            password,
        }
        await axios
        .post(`${BASE_URL}/emergencycontacts`,body)
        .then(res =>{
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            // console.log(JSON.stringify(userInfo));
        })
        .catch(e =>{
            console.log(`register error ${e}`);
            setIsLoading(false);
        });
    };

    const UserLogin = async (email,password) =>{
        setIsLoading(true);
 
        let body ={
            email,
            password,
        }
        console.log(body);

        await axios
        .post(`${BASE_URL}/login`,body)
        .then(res =>{
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            // console.log(JSON.stringify(userInfo)) ;
        })
        .catch(e =>{
            console.log(`Login error ${e}`);
            setIsLoading(false);
        });
    };

    const AddEmergencyContact = async (fname,lname,telNo) =>{

        let body ={
            emergency: {
                name: fname + ' ' + lname,
                phoneNum: telNo
            }
        }
        console.log(userInfo.token);
        console.log(body);
        // const header ={
        //     headers: {Authorization: `Bearer ${userInfo.token}`},
        // }
        // console.log(body);

        // await axios
        // .put(`${BASE_URL}/drivers/addemergency`,body,header)
        // .then(res =>{
        //     let userInfo = res.data;
        //     console.log(userInfo);
        //     setUserInfo(userInfo);
        //     AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        // })
        // .catch(e =>{
        //     console.log(`Login error ${e}`);
        // });
    };

    const GetAccidentLocation = async (lisencePlateNum) =>{

        let body = { 
            lisencePlateNum,
        }
        await axios
        .post(`${BASE_URL}/ambulances/findaccident`,body)
        .then(res =>{
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            console.log(userInfo);
        })
        .catch(e =>{
            console.log(`register error ${e}`);
        });
    };

    return (
        <AuthContext.Provider 
            value={{
                isLoading,
                userInfo,
                DriverRegister,
                AmbulanceRegister,
                EmergencyRegister,
                UserLogin,
                AddEmergencyContact,
                GetAccidentLocation,
        }}>
            {children}
        </AuthContext.Provider>
    );
}