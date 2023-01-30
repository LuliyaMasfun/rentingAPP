import Navbar from '@/components/Navbar'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import '../../app/globals.css'

const API_URL = 'http://localhost:8080/allEquipment'



// Hur man kan hämta data från en API genom ASYNC & AWAIT och sedan använda den i en funktion
// const getData = async () => {
//     const response = await Axios.get(API_URL)
//     const info = response.data.map((data) => allEquipments((data.name)))
//     return info
// }


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
        <main className='flex flex-col min-h-screen flex-grow'>
            <Navbar />
            <h1 className='flex justify-center text-center'>All Equipments</h1>



            <div className="container bg-grays justify-center">


                <div className='flex w-full flex-col justify-center'>

                    {data.map(item => (

                        <div className="container flex flex-col w-full" key={item.id}>
                            <h1>{item.name}</h1>

                            <Image alt={item.name} width={200} height={200} />

                            <p> Hello {item.equipmentDescription}</p>
                            <p> equipmentLocation: {item.equipmentLocation}</p>


                        </div>

                    ))}


                </div>

            </div>

        </main>

    )
}
export default EquipmentDefault