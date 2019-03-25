const socket = io('http://localhost:9000');

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
});

socket.on('messageFromServer', (dataFromServer) => {
    console.log(dataFromServer);
    socket.emit('dataToServer', { data: "Data from the Client!" });
});

socket.on('joined', (msg) => {
    console.log(msg);
});


document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const newMessage = document.querySelector('#user-message').value;
    socket.emit('newMessageToServer', { text: newMessage });
});