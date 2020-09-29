const DATA_NAME = '@clients'

var DATA_DB = [];


const readStorageData = () => {
    DATA_DB = JSON.parse( localStorage.getItem(DATA_NAME) || '[]' )
}


const writeStorageData = () => {
    localStorage.setItem(DATA_NAME, JSON.stringify(DATA_DB))
}


readStorageData()


const newId = () => {
    return '' + (parseInt(Math.random()*100000000)) + (parseInt(Math.random()*100000000)) + (parseInt(Math.random()*100000000));
}



export const props = {
    onRender:() => {}
}

export const insertClient = ({ name, idade }) => {
    const id = newId();
    DATA_DB.push({ id, name, idade })
    writeStorageData()
    if(props.onRender) props.onRender()
}

export const updateClient = (idClient, { name, idade }) => {
    const client = dataStorage(idClient)
    if(client){
        if(name) client.name = name;
        if(idade) client.idade = idade;
    }
    writeStorageData()
    if(props.onRender) props.onRender()
}

export const deleteClient = (idClient) => {
    DATA_DB = DATA_DB.filter( client => {
        return idClient != client.id
    } )
    writeStorageData()
    if(props.onRender) props.onRender()
}

export const selectStorage = () => {
    return DATA_DB;
}

export const dataStorage = (clientId) => {
    return DATA_DB.find( client => {
        return client.id == clientId
    } )
}
