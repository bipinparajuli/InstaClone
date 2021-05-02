import {PermissionsAndroid,ToastAndroid} from 'react-native'

export const requestPermission = async() =>{
    try{
    const granted = await PermissionsAndroid.requestMultiple(
        [
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ])
        console.log("GRANTED")

        if(
            granted["PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE"] === 'denied' ||
            granted["PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE"] === 'denied'
            )
            {
                console.log("no access")

                ToastAndroid.show("You don't have permission to proceed further",ToastAndroid.LONG)
requestPermission()

            }
}catch(e){
console.log('ERROR IN PERMISSION',e)
}
}