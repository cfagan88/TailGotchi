import Footer from "../components/Footer"
import Header from "../components/Header"
import OwnerDetails from "../components/OwnerDetails"
import PetCard from "../components/PetCard"

const OwnerProfile = () => {

    return(
        <>
            <Header />
            <main className="bg-primarylight  text-navy flex flex-col space-y-4 items-center justify-center m-auto w-screen min-h-[70vh]">
                <OwnerDetails />
                <div className="bg-primarylight flex-wrap space-x-3 space-y-4 text-navy flex items-center justify-center m-auto">
                    <PetCard />
                </div>
            </main>
            <Footer />
        </>
    )
}

export default OwnerProfile