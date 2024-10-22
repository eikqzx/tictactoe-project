import axios from "axios";

export async function getUserByEmail(email) {
    let url = `https://ap-southeast-1.data.tidbcloud.com/api/v1beta/app/dataapp-XYwQOosJ/endpoint/User?USER_NAME=${encodeURIComponent(email)}`
    let option = {
        auth: {
            username: process.env.ONLINE_SERVICE_PUBLIC_KEY, // replace with your actual public key
            password: process.env.ONLINE_SERVICE_PRIVATE_KEY // replace with your actual private key
        }
    }
    try {
        let resdata = await axios.get(url,option)
        let data = resdata.data
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}

export async function insertUser(dataSend) {
    let url = `https://ap-southeast-1.data.tidbcloud.com/api/v1beta/app/dataapp-XYwQOosJ/endpoint/User`
    let option = {
        auth: {
            username: process.env.ONLINE_SERVICE_PUBLIC_KEY, // replace with your actual public key
            password: process.env.ONLINE_SERVICE_PRIVATE_KEY // replace with your actual private key
        }
    }
    try {
        let resdata = await axios.post(url,dataSend,option)
        let data = resdata.data
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}