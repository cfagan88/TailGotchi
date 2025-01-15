
import { useEffect, useState } from "react"
import { supaClient } from "../api/client"



const PetCard = () => {
    type petGeneric = {
        pet_id : number,
        created_at : string,
        pet_name : string,
        pet_care_info? : string,
        pet_likes? : string, 
        pet_dislikes? : string,
        breed? : string,
        pet_age? : number,
        gender? : string
    }

    const [fetchError, setFetchError] = useState<null | string>(null) 
    const [petData, setPetData] = useState<null | petGeneric[]>(null)

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
                        petData.map((pet)=>
                            <p key={pet.pet_id}>{pet.pet_name}</p>
                        )
                    }
                </div>
            )}
        </>
    )
}

export default PetCard