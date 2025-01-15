import Footer from "../components/Footer"
import Header from "../components/Header"
import OwnerDetails from "../components/OwnerDetails"
import PetCard from "../components/PetCard"

const OwnerProfile = () => {

    return(
        <>
            <Header />
            <main className="bg-primarylight text-navy flex items-center justify-center m-auto w-screen h-[70vh]">
                <OwnerDetails />
                <PetCard />
            
            </main>
            <Footer />
        </>
    )
}

export default OwnerProfile