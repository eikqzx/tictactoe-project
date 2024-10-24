import { NextResponse } from 'next/server'
import axios from 'axios'

export async function GET() {
    try {
      let apiUrl = `https://ap-southeast-1.data.tidbcloud.com/api/v1beta/app/dataapp-XYwQOosJ/endpoint/GET_TOP_SCORE`;
  
      let option = {
        auth: {
          username: process.env.ONLINE_SERVICE_PUBLIC_KEY,
          password: process.env.ONLINE_SERVICE_PRIVATE_KEY,
        },
      };
  
      let resdata = await axios.get(apiUrl, option);
  
      return NextResponse.json(resdata.data);
    } catch (err) {
      console.error('Error in GET_TOP_SCORE:', err);
      return NextResponse.json({ error: 'Failed to fetch top scores' }, { status: 500 });
    }
  }
  