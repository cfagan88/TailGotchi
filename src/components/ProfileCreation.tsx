const ProfileCreation = () => {
    return(
       
        <main className="bg-primarylight flex flex-col space-y-4 justify-center items-center m-auto w-screen h-[70vh]">
          <h1 className="font-jersey25 text-navy">Profile Creation</h1>
          <div className="rounded-md border-4 border-mediumblue bg-lightblue shadow shadow-navy h-[50%] flex items-center">
            <form className="m-auto flex flex-col space-y-4">
              <label>Username:</label>
              <input type="text" className="bg-primarylight"></input>
              <label>First Name:</label>
              <input type="text" className="bg-primarylight"></input>
              <label>Last Name:</label>
              <input type="text" className="bg-primarylight"></input>
              <input type="file"></input>
            </form>
          </div>
        </main>
       
    )
}

export default ProfileCreation;