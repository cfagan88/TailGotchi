
import { useEffect, useState } from "react"
import { supaClient } from "../api/client"

const PetCard = () => {
    const [fetchError, setFetchError] = (null)
    const [petData, setPetData] = useState(null)

    useEffect(()=>{
        const fetchPets = async () =>{
            const { data, error } = await supaClient
            .from('users_pets')
            .select('pets(*)')
            .eq('user_id', '1')

            if (error){
                setFetchError('Could not fetch pet data')
                setPetData(null)
                console.log(error)
            }

            if(data){
                setPetData(data)
                setFetchError(null)
            }
        }

        fetchPets();


    }, [])

    return(
        <>
            {fetchError && (<p>{fetchError}</p>)}
            {petData && (
                <div>
                    {
                        petData.map((pet)=>{
                            <p>{pet.pet_name}</p>
                        })
                    }
                </div>
            )}
        </>
    )
}

export default PetCard