
import { useEffect, useState } from "react"
import { supaClient } from "../api/client"



const PetCard = () => {
    

    const [fetchError, setFetchError] = useState<null | string>(null) 
    const [petData, setPetData] = useState<null | object[]>(null)

    useEffect(()=>{
        const fetchPets = async () =>{
            const {
                data: { user },
              } = await supaClient.auth.getUser();
              if(!user){
                return;
              }

            const { data, error } = await supaClient
            .from('users_pets')
            .select('pets(*)')
            .eq('user_id', user.id)

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