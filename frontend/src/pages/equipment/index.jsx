import Navbar from '@/components/Navbar'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import camera from '../../../public/CAMERA.png'
import light from '../../../public/LIGHT.png'
import sound from '../../../public/SOUND.png'
import '../../app/globals.css'
import Link from 'next/link'

const API_URL = 'http://localhost:8080/allEquipments'



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

    const checkType = (obj) => {

        if (obj.equipmentType == "CAMERA") {
            return camera;
        } else if (obj.equipmentType == "LIGHT") {
            return light;
        } else {
            return sound;
        }
    }



    return (
        <main className='flex flex-col min-h-screen flex-grow'>
            <Navbar />

            <h1 className='flex justify-center font-bold text-center text-2xl mb-6'>All Equipments</h1>



            <div className="container flex flex-row bg-grays justify-center w-full">


                <div className='flex w-full flex-col justify-center'>

                    {data.map(item => (


                        <div className="container flex flex-col w-full border-black-300" key={item.id}>
                            <h1 className='flex ml-5'>{item.equipmentName}</h1>

                            <Link href={`/equipment/${item.id}`}>
                                <Image alt="Good equipments" width={200} height={200} src={checkType(item)} />
                            </Link>


                            <p> Hello {item.equipmentDescription}</p>
                            <p> EquipmentLocation: {item.equipmentLocation}</p>


                        </div>

                    ))}


                </div>

            </div>

        </main>

    )
}
export default EquipmentDefault