import { useRef } from "react";
import { useForm } from "react-hook-form";
import { SignInFormValues } from "./model";
import { validationSchema } from "./validation";
import { VERIFY_PHONE_SCREEN } from "../../../constants/screen_key";
import { TextInput } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import NavigationActionService from "../../../navigation/navigation";


const useSignIn = ()=>{
    const phoneRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const initValue = {phone:'',password:''};
    const {control, handleSubmit, formState:{errors}} = useForm<SignInFormValues>({
        defaultValues: initValue,
        resolver: yupResolver(validationSchema)
    });
    
    const onFocusPhone = ()=>{
        phoneRef.current?.focus();
    }

    const onFocusPassword = ()=>{
        passwordRef.current?.focus();
    }

    const onLoginSuccess = (phone:string,password:string)=>{
        
    }

    const onLoginFailure = ()=>{

    }
    const onLogin = (values:SignInFormValues)=>{
        NavigationActionService.navigate(VERIFY_PHONE_SCREEN);
    }
    return{
        phoneRef,
        control,
        onLogin,
        errors,
        passwordRef,
        onFocusPhone,
        onFocusPassword,
        handleSubmit,
    }
}

export default useSignIn;