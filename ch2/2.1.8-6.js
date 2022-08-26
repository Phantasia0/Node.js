async function findAndSaveUser(Users){
    //생략
}

findAndSaveUser().then(()=>{
    /* 생략 */
})

async function other(){
    const result = await findAndSaveUser();
}