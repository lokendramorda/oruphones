"use client"
import Image from 'next/image'
import Link from 'next/link'
import oru from '../oru.png'

export default function Home() {
  return (
    <main className=" bg-white">
     <div className="flex min-h-screen sm:flex-col lg:flex-row justify-center items-center">
           
           <div className="lg:w-1/2 md:w-full sm:w-full flex text-black justify-center items-center p-10">
             <div className="mb-8 relative ">
               {" "}
               
               <Image className='' src={oru} alt="oru" width={70} height={40}/>
              <div className='p-6 text-white rounded-lg' style={{backgroundColor:"#252B48"}}>
                
               <h1 className="text-[30px] font-bold mb-3  " >ORUphones!</h1>
              <h1 className="text-md font-bold mb-4">C2C online marketplace for Old, Refurbished & Used phones</h1>
              </div>
               <h2 className="text-sm rounded-lg mt-5 border shadow-lg p-3">
               ORUphones is India’s first ever online marketplace exclusively built for buying and selling Certified Old, Refurbished & Used phones. Our vision is to be a trusted marketplace for every user to buy and sell old phones confidently, easily, and for the best price possible. We strive to achieve this with a strong base of technology and a dedicated team of professionals who are well-seasoned and understand the needs of the market.
               </h2>
             </div>
             
           </div>

          
           <div className="lg:w-1/2 md:w-full sm:w-full bg-gray-100  flex text-black justify-center items-center min-h-screen">
           <div className="text-center relative top-[-60px]">
               <h2 className="text-2xl font-bold mb-6">Get Started!</h2>
               <Link
               href='/login'
                 className="inline-block px-6 py-3 bg-white text-black font-medium rounded-full mr-4 border border-black hover:bg-black hover:text-white"
               >
                 Login
               </Link>
               <Link
               href='/signup'
                 className="inline-block px-6 py-3 bg-white text-black font-medium rounded-full border border-black hover:bg-black hover:text-white"
               >
                 Sign Up
               </Link>
               </div>
             </div>
         </div>
    </main>
  )
}
