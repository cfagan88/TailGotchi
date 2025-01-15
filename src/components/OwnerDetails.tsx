import { useEffect, useState } from "react"
import { UserProfile } from "../api/global.types"
import { supaClient } from "../api/client"

const OwnerDetails = () =>{
     const [fetchError, setFetchError] = useState<null | string>(null) 
    const [ownerData, setOwnerData] = useState<null | UserProfile[]>(null)
    
        useEffect(()=>{
            const fetchPets = async () =>{
                const {
                    data: { user },
                  } = await supaClient.auth.getUser();
                  if(!user){
                    return;
                  }
    
                const { data, error } = await supaClient
                .from('users_profiles')
                .select()
                .eq('user_id', user.id)
    
                if (error){
                    setFetchError('Could not fetch pet data')
                    setOwnerData(null)
                    console.log(error)
                }
    
                if(data){
                    setOwnerData(data)
                    setFetchError(null)
                }
            }
    
            fetchPets();
    
    
        }, [])
    return(
        <>
            {fetchError && (<p>{fetchError}</p>)}
            {ownerData&&(
                <article>
                <p>Owner: {ownerData[0].username}</p>
                </article>
            )}
            
        </>
    )
}

export default OwnerDetails