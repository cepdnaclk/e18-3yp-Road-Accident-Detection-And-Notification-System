import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState } from "react";

import { BASE_URL } from "../../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
            console.log(userInfo);
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
        .post(`${BASE_URL}/drivers/login`,body)
        .then(res =>{
            let userInfo = res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
        })
        .catch(e =>{
            console.log(`Login error ${e}`);
            setIsLoading(false);
        });
    };

    return (
        <AuthContext.Provider 
            value={{
                isLoading,
                userInfo,
                DriverRegister,
                UserLogin
        }}>
            {children}
        </AuthContext.Provider>
    );
}