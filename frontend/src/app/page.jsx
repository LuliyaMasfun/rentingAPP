import "./globals.css"
import lion from "../../public/lion.png"
import Image from "next/image"


export default function Home() {
  return (
    <main className="container mx-auto min-h-screen bg-grays" >

      <div className="flex p-11 items-center ">
        <Image className=" object-cover rounded-full" src={lion} alt="logo for the company" width={100} height={100} />
        <p className=" ml-3 text-white">Hayal Tech</p>
      </div>

      <div className=" ml-28">
        <h1 className="text-3xl text-white justify-center"> Welcome back,</h1>
        <p className="text-white">Please enter your details</p>

      </div>


      <div className="flex w-full flex-col items-center mt-12 min-h-fit  ">

      </div>

    </main >
  )
}
