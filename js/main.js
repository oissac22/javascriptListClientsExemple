import * as database from './database.js'


// database.insertClient({
//     name:'Josuel',
//     idade:25
// })
// database.insertClient({
//     name:'Cássio',
//     idade:36
// })


var ID_SET = null;
var SEARCH = ''


window.updateForm = ({ name, idade, id }) => {
    const nameObj = document.getElementById('insert_name')
    const idadeObj = document.getElementById('insert_idade')
    nameObj.value = name;
    idadeObj.value = idade;
    ID_SET = id
}


export const renderlistUser = () => {
    const tbody = document.getElementById('userslist')
    var result = database.selectStorage()
    if(SEARCH.trim()){
        const expReg = eval(`/${SEARCH.replace(/[^\d\w]+/g,'.*')}/i`)
        result = result.filter( client => {
            return expReg.test(client.name + ' ' + client.idade)
        } )
    }
    result = result.sort( (a, b) => a.name < b.name ? -1 : 1 )
        .map( client => {
            return `<tr>
                    <td>${client.id}</td>
                    <td>${client.name}</td>
                    <td>${client.idade}</td>
                    <td>
                        <button class='red' onclick="database.deleteClient(${client.id})">DELETE</button>
                        <button onclick='updateForm(${JSON.stringify( client )})'>UPDATE</button>
                    </td>
                </tr>`
        } )
    tbody.innerHTML = result.join('')
}


database.props.onRender = renderlistUser




function start(){
    window.addEventListener('load', () => {
        renderlistUser()

        const form = document.getElementById('insert')
        form.addEventListener('submit', e => {
            e.preventDefault()
            const name = document.getElementById('insert_name')
            const idade = document.getElementById('insert_idade')
            if(ID_SET){
                database.updateClient(ID_SET, { name:name.value, idade:Number(idade.value) })
            }else{
                database.insertClient({ name:name.value, idade:Number(idade.value) })
            }
            ID_SET = null
            name.value = ''
            idade.value = ''
            name.focus()
        })

        const search = document.getElementById('search')
        search.addEventListener('keyup', e => {
            SEARCH = e.target.value;
            renderlistUser()
        })

    })
}


start()

window.database = database;