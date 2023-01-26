import Navbar from '@/components/Navbar'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const API_URL = 'http://localhost:8080/users'

// Hur man kan hämta data från en API genom ASYNC & AWAIT och sedan använda den i en funktion
// const getData = async () => {
//     const response = await Axios.get(API_URL)
//     const info = response.data.map((data) => allEquipments((data.name)))
//     return info
// }



const EquipmentDefault = () => {

    const [data, setData] = useState([])

    console.log(Axios.get(API_URL).then(res => {
        console.log(res.data)
    }).then(err => console.log(err)))

    useEffect(() => {
        Axios.get(API_URL).then(res => {
            console.log(`res.data is => ${res.data}`)
            setData(res.data)
        }).catch(
            err => console.log(err)
        )
    }, []);



    return (
        <main className='flex min-h-screen flex-grow'>
            <Navbar />
            <div className='flex border-8 m-8'>
                {data.map(item => (
                    <div key={item.id}>
                        <h2>{item.name}</h2>
                        <h2> {item.last_name}</h2>
                        <p>{item.email}</p>
                    </div>

                ))}
            </div>

            <h1 className='flex text-2xl text-center justify-center mb-1 justify-items-center'>All Equipments</h1>


            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link href="#">
                    <Image className="rounded-t-lg" width={120} height={120} src={data.map(item => {

                    })} alt="" />
                </Link>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>

                </div>
            </div>




        </main>

    )
}
export default EquipmentDefault