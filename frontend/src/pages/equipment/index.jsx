import Navbar from '@/components/Navbar'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

const API_URL = 'http://localhost:8080/allEquipment'



// Hur man kan hämta data från en API genom ASYNC & AWAIT och sedan använda den i en funktion
// const getData = async () => {
//     const response = await Axios.get(API_URL)
//     const info = response.data.map((data) => allEquipments((data.name)))
//     return info
// }

axios.create({
    baseURL: 'http://localhost:8080/allEquipment',
})


const EquipmentDefault = () => {

    const [data, setData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get(API_URL, {
                    headers: "Access-Control-Allow-Origin: *"
                })
                console.log(response.data)
                const info = response.data
                setData(info)
            } catch (error) {
                if (error.response) {
                    console.log(error.response.data)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
                else {
                    console.log(`Error: ${error.message}`)
                }

            }
        }
        fetchData()

    }, [])



    return (
        <main className='flex min-h-screen flex-grow'>
            <Navbar />
            <h1 className='flex text-2xl text-center justify-center mb-1 justify-items-center'>All Equipments</h1>



            <div className="container bg-grays">

                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link href="#">
                        <Image className="w-full" width={120} height={120} src={data ? data.image : "There is no data"}
                            alt="All cameras" />


                        <p> {data ? data.description : "There is no data"}</p>
                    </Link>
                    <div className="p-5">
                        <a href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>

                    </div>
                </div>

            </div>




        </main>

    )
}
export default EquipmentDefault