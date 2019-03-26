//client connects to main namespace
const username= prompt("what is your username?");
const socket = io('http://localhost:9000', {
    query: {
        username: username
    }
});
let nsSocket = "";
socket.on('nsList', (nsData) => {
    console.log("the list of namespaces has arrived");
    let namespacesDiv = document.querySelector('.namespaces'); 
    namespacesDiv.innerHTML = "";
    nsData.forEach((ns) => {
        namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}" /></div>`
    });

    //loop through everything with a class of namespace which we got from nslist
    //add a click listener to it and get endpoint out of it which is the 'ns' attribute
    //call js on nsEndpoint when the user clicks on it
    Array.from(document.getElementsByClassName("namespace")).forEach((element) => {
        element.addEventListener('click', (e) => {
            const nsEndpoint = element.getAttribute('ns');
           joinNs(nsEndpoint);
        });
    });
    joinNs('/wiki');
});


