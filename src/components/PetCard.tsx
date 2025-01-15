
import { useEffect, useState } from "react"
import { supaClient } from "../api/client"
import { Pet } from "../api/global.types"



const PetCard = () => {
    

    const [fetchError, setFetchError] = useState<null | string>(null) 
    const [petData, setPetData] = useState<null | Pet[]>(null)

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
                const pets = data.map((item) => item.pets);
                setPetData(pets)
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