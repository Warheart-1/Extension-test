const info = document.getElementById('info')

// Charger le ficher json (pure JS)
async function loadJSON(file) {
  try {
    const reponse = await fetch(file)
    const data = await reponse.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

// Enregistre les données du fichier json dans une variable
const data = await loadJSON('../config/data.json')

const url = `https://id.twitch.tv/oauth2/token?client_id=${data.client_id}&client_secret=${data.client_secret}&grant_type=client_credentials`

// Option pour la requête fetch pour obtenir le token
const option = {
    method: 'POST',
    headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'Content-Type': 'application/json'  
  }
}

// Obtention du token pour accéder à l'API
async function getToken(url, option) {
  try
  {
    const reponse = await fetch(url, option)
    const data = await reponse.json()
    return data
  }
  catch(err)
  {
    console.log(err)
  }
} 

// Récupération du token dans getToken() pour accéder à l'API et récupérer les données du stream
async function renderToken() {
  const exam = await getToken(url, option)
  // Option pour la requête fetch pour obtenir les données du stream
  const config = {
    method: 'get',
    //TODO : possibilité de mettre un user_login différent
    url: 'https://api.twitch.tv/helix/streams?user_login=aikamorii',
      headers: { 
          'Authorization': `Bearer ${exam.access_token}`, 
          'Client-Id': data.client_id
        }
  }
  try{
    const reponse = await fetch(config.url, config)
    const data = await reponse.json()
    return data
  }
  catch(err)
  {
    console.log(err)
  }
}

// Affiche si le streamer est en ligne ou non (doit attendre la réponse de la fonction renderToken())
async function renderStream() {
  const dataStream = await renderToken()
  if (dataStream.data[0]){
      info.innerHTML = "Streaming"
  } else {
      info.innerHTML = "Not Streaming"
  }
}

// Inialisation de la fonction renderStream()
renderStream()
