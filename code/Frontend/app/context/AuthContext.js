import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

import { BASE_URL } from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [accidentState, setAccidentState] = useState('Not Active');

    useEffect(() => {
        loadUserInfo()
    }, [])

    useEffect(()=>{
        // console.log("updated List: ",userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
    },[userInfo])

    useEffect(() => {
        setInterval(() => {
            if (userInfo.userState === 0) {
                // updateAmbLocation(12,15)
                // GetAccidentLocation(154879)
                // console.log(accidentState);
            }
        }, 1000);
    }, []);

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

    function toCamelCase(str){
        let res = ''
        const WordArray =  str.split(' ')
            .map(element => element.trim())
            .filter(element => element !== '');
        WordArray.map(s => {
            for (let i = 0; i < s.length; i++) {
                res += s.charAt(i).toUpperCase()
            }
            res += ' '
        })
        return res.trim()
    };

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
            // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
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
            // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
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
            // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
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
            // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
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

    }

    const AddEmergencyContact = async (fname,lname,telNo) =>{
        setIsLoading(true)

        let body ={
            emergency: {
                name: toCamelCase(fname) + ' ' + toCamelCase(lname),
                phoneNum: telNo
            }
        }
        const header ={
            headers: {'Authorization': `Bearer ${userInfo.token}`},
        }

        await axios
        .put(`${BASE_URL}/drivers/addemergency`,body,header)
        .then(res =>{
            let Info = res.data;
            const newEmergency = [...Info.emergency]
            setUserInfo({
            ...userInfo, 
            emergency: newEmergency
            });
            setIsLoading(false);
        })
        .catch(e =>{
            console.log(`Add contact error ${e}`);
            setIsLoading(false);
        });
    };

    const GetAccidentLocation = async (lisencePlateNum) =>{

        let body = { 
            lisencePlateNum,
        }
        await axios
        .post(`${BASE_URL}/ambulances/findaccident`,body)
        .then(res =>{
            let { state } = res.data;
            setAccidentState(state);
            // setUserInfo(userInfo);
            // AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            // console.log(state);
        })
        .catch(e =>{
            console.log(`get accident error ${e}`);
        });
    };

    const updateAmbLocation = async (latitude, longitude) => {

        let body ={
            location: {
                type: 'Point',
                coordinates: [latitude, longitude],
            }
        }
        const header ={
            headers: {'Authorization': `Bearer ${userInfo.token}`},
        }

        await axios
        .put(`${BASE_URL}/ambulances/me`,body,header)
        .then(res =>{
            let Info = res.data;
            // const newEmergency = [...Info.emergency]
            // setUserInfo({
            // ...userInfo, 
            // emergency: newEmergency
            // });
            // setIsLoading(false);
        })
        .catch(e =>{
            console.log(`update Ambulance Location error ${e}`);
            // setIsLoading(false);
        });
    }

    return (
        <AuthContext.Provider 
            value={{
                isLoading,
                userInfo,
                accidentState,
                DriverRegister,
                AmbulanceRegister,
                EmergencyRegister,
                UserLogin,
                Logout,
                toTitleCase,
                toCamelCase,
                AddEmergencyContact,
                GetAccidentLocation,
                updateAmbLocation,
        }}>
            {children}
        </AuthContext.Provider>
    );
}