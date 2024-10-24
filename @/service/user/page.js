import axios from "axios";

export async function getUserByName(name) {
    if (!name) {
        console.error('Name is required for getUserByName')
        return false
    }

    // Use an absolute URL
    let url = `${process.env.NEXT_PUBLIC_API_URL}/api/user?name=${encodeURIComponent(name)}`
    // console.log('getUserByName URL:', url)
    
    try {
        let resdata = await axios.get(url)
        // console.log('getUserByName response:', resdata)
        
        return resdata.data
    } catch (err) {
        console.error('Error in getUserByName:', err)
        return false
    }
}

export async function insertUser(userData) {
    if (!userData) {
        console.error('User data is required for insertUser')
        return false
    }

    let url = '/api/user'
    // console.log('insertUser URL:', url)
    
    try {
        let resdata = await axios.post(url, userData)
        // console.log('insertUser response:', resdata)
        
        return resdata.data
    } catch (err) {
        console.error('Error in insertUser:', err)
        return false
    }
}

export async function updateScore(scoreData) {
    if (!scoreData) {
        console.error('Score data is required for updateScore')
        return false
    }

    let url = '/api/user'
    // console.log('updateScore URL:', url)
    
    try {
        let resdata = await axios.put(url, scoreData)
        // console.log('updateScore response:', resdata)
        
        return resdata.data
    } catch (err) {
        console.error('Error in updateScore:', err)
        return false
    }
}