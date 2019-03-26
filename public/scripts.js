const socket = io('http://localhost:9000');
let nsSocket = "";
socket.on('nsList', (nsData) => {
    console.log("the list of namespaces has arrived");
    let namespacesDiv = document.querySelector('.namespaces'); 
    namespacesDiv.innerHTML = "";
    nsData.forEach((ns) => {
        namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}" /></div>`
    });

    Array.from(document.getElementsByClassName("namespace")).forEach((element) => {
        element.addEventListener('click', (e) => {
            const nsEndpoint = element.getAttribute('ns');
            console.log(`${nsEndpoint} I should go to now`);
        });
    });
    joinNs('/wiki');
});


