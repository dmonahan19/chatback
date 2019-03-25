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
    const nsSocket = io('http://localhost:9000/wiki'); 
    nsSocket.on('nsRoomLoad', (nsRooms) => {
        let roomList = document.querySelector(".room-list");
        roomList.innerHTML = "";
        nsRooms.forEach((room) => {
            let glyph;
            if(room.privateRoom){
                glyph= 'lock';
            }else{
                glyph= 'globe';
            }
            roomList.innerHTML += `<li class="room"><span class="glyphicon glyphicon-${glyph}">
            </span>${room.roomTitle}</li>`;
        });
        let roomNodes = document.getElementsByClassName("room");
        Array.from(roomNodes).forEach((element) => {
            element.addEventListener('click', (e) => {
                console.log("Someone clicked on", e.target.innerText)
            });
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