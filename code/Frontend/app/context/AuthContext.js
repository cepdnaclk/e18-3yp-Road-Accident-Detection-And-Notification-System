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
        // const arr = [1, 2, 3, 4, 9, 8];
        // arr.map(e => console.log(e));
        // console.log(JSON.stringify(userInfo))
        // if (Object.keys(userInfo).length) {
        //     console.log(userInfo.emergency);
        //     userInfo.emergency.map(e => console.log(e))
        // }
    }, [userInfo])

    const loadUserInfo = async () => {
        try {
          const value = await AsyncStorage.getItem('userInfo');
          if (value !== null) { 
            setUserInfo(JSON.parse(value))
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

    const Logout = async () => {
        setIsLoading(true)

        // await axios
        // .post(`${BASE_URL}/logout`,
        // {},
        // {
        //     headers: {Authorization: `Bearer ${userInfo.token}`}
        // })
        // .then(res =>{
        //     console.log(res.data)
        //     AsyncStorage.removeItem('userInfo');
        //     setUserInfo({});
        //     setIsLoading(false);
        // })
        // .catch(e =>{
        //     console.log(`Logout error ${e}`);
        //     setIsLoading(false);
        // });
        await AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
        console.log('End');

    }

    function toTitleCase(str){
        let res = ''
        const WordArray =  str.split(' ')
            .map(element => element.trim())
            .filter(element => element !== '');
        WordArray.map(s => {
            for (let i = 0; i < s.length; i++) {
                if (i === 0) {
                    res += s.charAt(0).toUpperCase()
                } else {
                    res += s.charAt(i).toLowerCase()
                }
            }
            res += ' '
        })
        return res.trim()
    };

    const AddEmergencyContact = async (fname,lname,telNo) =>{

        let body ={
            emergency: {
                name: toTitleCase(fname) + ' ' + toTitleCase(lname),
                phoneNum: telNo
            }
        }
        const token = userInfo.token;
        console.log(token)
        // console.log(userInfo.token);
        // console.log(JSON.stringify(body));
        const header ={
            headers: {Authorization: `Bearer ${userInfo.token}`},
        }

        await axios
        .put(`${BASE_URL}/drivers/addemergency`,JSON.stringify(body),JSON.stringify(header))
        .then(res =>{
            let userInfo = JSON.stringify(res.data);
            console.log(userInfo);
            userInfo["token"] = token;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        })
        .catch(e =>{
            console.log(`Login error ${e}`);
        });
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
                Logout,
                toTitleCase,
                AddEmergencyContact,
                GetAccidentLocation,
        }}>
            {children}
        </AuthContext.Provider>
    );
}