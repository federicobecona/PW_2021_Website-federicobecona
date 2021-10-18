const mailOpenModalBtns = document.getElementsByClassName('mailModal__openButton')
const mailCloseModalBtn = document.getElementById('mailModal__closeButton')
const mailModalContainer = document.getElementById('mailModal__container')
const mailSendModal = document.getElementById('mailModal__form')
const mailNotifierModal = document.getElementById('mailModal__notifier')
let modalFrom_name = document.getElementById('mailModal__from_name')
let modalMessage = document.getElementById('mailModal__message')

const cvOpenModalBtns = document.getElementsByClassName('cvModal__openButton')
const cvCloseModalBtn = document.getElementById('cvModal__closeButton')
const cvModalContent = document.getElementById('cvModal__mainContent')
const cvModalContainer = document.getElementById('cvModal__container')
const cvModalText = document.getElementById('cvModal__text')


var listModalTexts = ["⚡Dato de color: soy de Peñarol",
                    "Desde el año 2018 estudio la carrera de Ingeniería en Informática.", 
                    "A principios de 2021 obtuve el título intermedio de Analista en Informática.", 
                    "Realicé exámenes ESOL de la Universidad de Cambridge obteniendo el First en el año 2015.  "]
var linksMatrix = [
                ["Proyecto", "Lenguajes y Herramientas", ""],
                ["Inteligencia Artificial I", "Python, SciKitLearn, RapidMiner, Excel", "https://federicobecona.github.io/Machine-Learning-Portfolio/home"],
                ["Sistemas Operativos", "Java", "https://github.com/federicobecona/Operating-Systems"], 
                ["Programación I", "Python", "https://github.com/federicobecona/Programming-I"], 
                ["Programación II", "C#", "https://github.com/federicobecona/Programming-II"],
                ["Física I", "Python", "https://github.com/federicobecona/Physics-I-simulations"],
                ["Programación funcional", "Haskell", "https://github.com/federicobecona/Functional-programming"],
                ["Sistemas embebidos", "C", "https://github.com/federicobecona/Embedded-Systems"],
                ["Bases de datos", "Java", "https://github.com/federicobecona/Databases"]
            ]
var imagesLinks = ["https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2020%2F0426%2Fr692907_1296x729_16%2D9.jpg&w=920&h=518&scale=crop&cquality=80&location=origin&format=jpg"]

for (var i = 0, len = mailOpenModalBtns.length; i < len; i++) {
    mailOpenModalBtns[i].onclick = toggleModalHandler
}
mailCloseModalBtn.onclick = toggleModalHandler

mailSendModal.addEventListener("submit",(e)=>{
    e.preventDefault()
    let templateParams = {
        from_name: modalFrom_name.value,
        message: modalMessage.value
    }
    mailNotifierModal.textContent = "Enviando..."
    emailjs.send('mail', 'template_dfpsj68', templateParams)
    .then(function(response) {
        mailNotifierModal.textContent = "Mensaje enviado"
    }, function(error) {
        mailNotifierModal.textContent = "Ha habido un error"
    });
})

window.addEventListener("scroll", function(){
    var header = document.querySelector("header")   
    header.classList.toggle("sticky-navbar", window.scrollY > 0)
})

for (let i = 0; i < listModalTexts.length; i++) {
    cvOpenModalBtns[i].addEventListener('click', function() {
    cvModalContent.innerHTML = ""
    var p = document.createElement('p')
    p.textContent = listModalTexts[i]
    cvModalContent.appendChild(p)
    if(i==0){
        p.classList.add("font-bold")
        let img = document.createElement('img')
        img.setAttribute('src', imagesLinks[0]);
        img.setAttribute('width', '500px');
        img.setAttribute('heigth', '500px');
        img.setAttribute('alt', 'Estadio de Peñarol');
        img.classList.add("rounded-full")
        img.classList.add("mt-4")
        cvModalContent.appendChild(img)
    }
    if(i==1){
        var table = document.createElement('TABLE')
        table.style.marginTop = "20px"
        cvModalContent.appendChild(table)
        table.border='1'
        var tableBody = document.createElement('TBODY')
        table.appendChild(tableBody)
        for (let i=0; i<linksMatrix.length; i++){
            var tr = document.createElement('TR')
            tableBody.appendChild(tr)
            for (let j=0; j<2; j++){
                var td = document.createElement('TD')
                var node
                node = document.createTextNode(linksMatrix[i][j])
                td.width='200'
                if(i==0){
                    td.style.fontWeight = 'bold'
                }
                if(j==0 && i!=0){
                    node = document.createElement('a')
                    node.textContent = linksMatrix[i][j]
                    node.style.color = 'blue'
                    node.href = linksMatrix[i][2]
                }
                td.appendChild(node)
                tr.appendChild(td)
            }
        }
    }
    toggleModal(cvModalContainer)
    })
}

cvCloseModalBtn.addEventListener('click', function() {
    toggleModal(cvModalContainer)
})

window.onclick = function(event) {
    if (event.target == mailModalContainer) {
        toggleModalHandler()
    }
    if (event.target == cvModalContainer) {
        toggleModal(cvModalContainer)
    }
}

function toggleModalHandler() {
    toggleModal(mailModalContainer)
    mailNotifierModal.textContent = ""
    modalFrom_name.value = ""
    modalMessage.value = ""
}

function toggleModal(modal){
    if(modal.classList.contains("invisible")){
        modal.classList.remove("invisible")
    }else{
        modal.classList.add("invisible")
    }
}

