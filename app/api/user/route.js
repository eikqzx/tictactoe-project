import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const name = url.searchParams.get('name')
    
    if (!name) {
      return NextResponse.json({ error: 'Name parameter is required' }, { status: 400 })
    }

    let apiUrl = `https://ap-southeast-1.data.tidbcloud.com/api/v1beta/app/dataapp-XYwQOosJ/endpoint/User?USER_NAME=${encodeURIComponent(name)}`
    let option = {
      auth: {
        username: process.env.ONLINE_SERVICE_PUBLIC_KEY,
        password: process.env.ONLINE_SERVICE_PRIVATE_KEY
      }
    }

    let resdata = await axios.get(apiUrl, option)
    return NextResponse.json(resdata.data)
  } catch (err) {
    console.error('Error in GET /api/user:', err)
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const dataSend = await request.json()

    let url = `https://ap-southeast-1.data.tidbcloud.com/api/v1beta/app/dataapp-XYwQOosJ/endpoint/User`
    let option = {
      auth: {
        username: process.env.ONLINE_SERVICE_PUBLIC_KEY,
        password: process.env.ONLINE_SERVICE_PRIVATE_KEY
      }
    }

    let resdata = await axios.post(url, dataSend, option)
    return NextResponse.json(resdata.data)
  } catch (err) {
    console.error('Error in POST /api/user:', err)
    return NextResponse.json({ error: 'Failed to insert user data' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const dataSend = await request.json()

    let url = `https://ap-southeast-1.data.tidbcloud.com/api/v1beta/app/dataapp-XYwQOosJ/endpoint/User_UPD_SCORE`
    let option = {
      auth: {
        username: process.env.ONLINE_SERVICE_PUBLIC_KEY,
        password: process.env.ONLINE_SERVICE_PRIVATE_KEY
      }
    }

    let resdata = await axios.put(url, dataSend, option)
    return NextResponse.json(resdata.data)
  } catch (err) {
    console.error('Error in PUT /api/user:', err)
    return NextResponse.json({ error: 'Failed to update user score' }, { status: 500 })
  }
}