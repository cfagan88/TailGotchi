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
        
        //check if possible to destructure ownerData rather than having to use square brackets
        <>
            {fetchError && (<p>{fetchError}</p>)}
            {ownerData&&(
                <article className="border-2 border-mediumblue bg-lightblue rounded-lg min-w-[20%] max-w-[40%] max-h-[40%] min-h-[20%] shadow-md shadow-lightblue">
                <p className="text-navy">Owner name: {ownerData[0].name}</p>
                <p className="text-navy">Username: {ownerData[0].username}</p>
                {
                    !ownerData[0].avatar_url ? (
                        <p>No profile image</p>
                    ) : (
                        <img src={ownerData[0].avatar_url}></img>
                    )
                }
                
                </article>
            )}
            
        </>
    )
}

export default OwnerDetails