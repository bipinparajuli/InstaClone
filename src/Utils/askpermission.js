import {PermissionsAndroid,ToastAndroid} from 'react-native'

export const requestPermission = async() =>{
try{
    const granted = await PermissionsAndroid.requestMultiple(
        [
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
        if(
            granted["PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE"] === 'denied' ||
            granted["PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE"] === 'denied'
            )
            {
ToastAndroid.show("You don't have permission to proceed further",ToastAndroid.LONG)
requestPermission()

            }
}catch(e){
console.log(e)
}
}