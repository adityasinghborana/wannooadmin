"use client"
import { getHomePageData } from "@/lib/services"
import { useEffect, useState } from "react"

const Home = () => {
    const [homepagedata,setHomePageData] = useState()

    useEffect(()=>{
        const getData = async () =>{
            setHomePageData(await getHomePageData())
        }
        getData()
    },[])

    return (
    <div>Home</div>
  )
}

export default Home