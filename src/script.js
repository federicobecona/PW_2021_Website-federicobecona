const msgOpenModalBtn = document.getElementById('msgModal__openButton')
const msgCloseModalBtn = document.getElementById('msgModal__closeButton')
const msgModalContainer = document.getElementById('msgModal__container')
const msgSendModal = document.getElementById('msgModal__form')
const msgNotifierModal = document.getElementById('msgModal__notifier')
let modalFrom_name = document.getElementById('msgModal__from_name')
let modalMessage = document.getElementById('msgModal__message')
const detOpenModalBtn = document.getElementById('detModal__openButton')
const detCloseModalBtn = document.getElementById('detModal__closeButton')
const detModalContent = document.getElementById('detModal__mainContent')
const detModalContainer = document.getElementById('detModal__container')
const detModalText = document.getElementById('detModal__text')
const home = document.getElementById('Inicio')
const homeBtn = document.getElementById('homeBtn')
const cv = document.getElementById('CV')
const cvBtn = document.getElementById('cvBtn')

let urlExp = "https://pw2021-apinode-federicobecona.federicobecona.repl.co/experiencia-laboral"
let urlCookie = "https://pw2021-apinode-federicobecona.federicobecona.repl.co/hacer-cookie"

fetch(urlExp, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    },
}).then(function(response) {
    response.text().then(function(ans){
        let exp = JSON.parse(ans)
        let divs = [document.getElementById('cv__exp1'), 
            document.getElementById('cv__exp2'),
         document.getElementById('cv__exp3')
        ]
        for(let i=0; i<ans.length; i++){
            if(exp[i]){
                let empresa = document.createElement("p")
                empresa.style.fontWeight = 'bold'
                empresa.style.fontSize = 'x-large'
                let puesto = document.createElement("p")
                puesto.style.fontWeight = 'bolder'
                empresa.style.fontSize = 'large'
                let descripcion = document.createElement("p")
                let fechas = document.createElement("p")
                empresa.textContent = exp[i].empresa
                puesto.textContent = exp[i].puesto
                descripcion.textContent = exp[i].descripcion
                fechas.textContent = exp[i].fechaInicio.toString().split('T')[0] + 
                    " || " + exp[i].fechaFin.toString().split('T')[0]
                divs[i].appendChild(empresa)
                divs[i].appendChild(puesto)
                divs[i].appendChild(descripcion)
                divs[i].appendChild(fechas)
            }
        }
    })
})



msgSendModal.addEventListener("submit",(e)=>{
    e.preventDefault()
    let msg = {
        nombreContacto: modalFrom_name.value,
        mensaje: modalMessage.value
    }
    msgNotifierModal.textContent = "Enviando..."
    fetch(urlCookie, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(msg)
    }).then(function(response) {
        response.text().then(function(res){
            msgNotifierModal.textContent = res
        })
    })
})



function toggleModal(modal){
    if(modal.classList.contains("invisible")){
        modal.classList.remove("invisible")
    }else{
        modal.classList.add("invisible")
    }
}
function toggleModalHandlerMsg() {
    toggleModal(msgModalContainer)
    msgNotifierModal.textContent = ""
    modalFrom_name.value = ""
    modalMessage.value = ""
}
function toggleModalHandlerDet() {
    toggleModal(detModalContainer)
}
window.onclick = function(event) {
    if (event.target == msgModalContainer) {
        toggleModalHandlerMsg()
    }
    if (event.target == detModalContainer) {
        toggleModal(detModalContainer)
    }
}
msgOpenModalBtn.onclick = toggleModalHandlerMsg
msgCloseModalBtn.onclick = toggleModalHandlerMsg
detOpenModalBtn.onclick = toggleModalHandlerDet
detCloseModalBtn.onclick = toggleModalHandlerDet



var h = document.createElement('h6')
h.textContent = "⚡Dato de color: soy de Peñarol"
detModalContent.appendChild(h)
h.classList.add("font-bold")
let img = document.createElement('img')
img.classList.add("rounded-full")
img.setAttribute('alt', 'Estadio de Peñarol');
img.setAttribute('src', "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2020%2F0426%2Fr692907_1296x729_16%2D9.jpg&w=920&h=518&scale=crop&cquality=80&location=origin&format=jpg");
detModalContent.appendChild(img)




homeBtn.onclick = (e)=> {
    e.preventDefault()
    home.style.visibility = "visible"
    cv.style.visibility = "hidden"
}

cvBtn.onclick = (e)=> {
    e.preventDefault()
    cv.style.visibility = "visible"
    home.style.visibility = "hidden"
}

window.addEventListener("scroll", function(){
    var header = document.querySelector("header")   
    header.classList.toggle("sticky-navbar", window.scrollY > 0)
})