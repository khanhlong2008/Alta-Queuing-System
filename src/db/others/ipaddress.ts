export const  fetchIP = async()=>{
    let reponse = await fetch('https://geolocation-db.com/json/8dd79c70-0801-11ec-a29f-e381a788c2c0')
    let data = await reponse.json()
    return data
}