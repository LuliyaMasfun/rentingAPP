import { useRouter } from "next/router"
import Image from "next/image"
import { useEffect, useState } from "react"

const Equipment = () => {

    const router = useRouter()
    const { id } = router.query
    console.log(id)

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
                fetchData()
            }
        }
    })

    return (
        <main>

            <h1 className="text-2xl"> This is the page for Item {id}</h1>

            <div className="container">

                {data.map(item => {
                    if (item.id === id) {
                        return (
                            <div className="container flex flex-col w-full" key={item.id}>
                                <h1>{item.name}</h1>

                                <Image alt={item.name} width={200} height={200} src={item.equipmentImg} />

                                <p> Hello {item.equipmentDescription}</p>
                                <p> equipmentLocation: {item.equipmentLocation}</p>



                            </div>)
                    }
                })
                }
            </div>
        </main>

    )

}

export default Equipment