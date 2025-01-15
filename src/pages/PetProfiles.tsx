import Footer from "../components/Footer"
import Header from "../components/Header"
import PetCard from "../components/PetCard"

const PetProfiles = () => {

    return(
        
        <>
            <Header />
            <main className="bg-primarylight flex flex-col space-y-4 justify-center items-center m-auto w-screen h-[70vh]">
                <PetCard /> 
                
            </main> 

            <Footer />
        </>
    )
}

export default PetProfiles