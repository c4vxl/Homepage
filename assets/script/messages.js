let messages = [];

const createMessage = (name, mail, date, content, id) => {
    document.querySelector("#message__container").insertAdjacentHTML("afterbegin", `
        <div class="message primary">
            <p style="opacity: .7; text-align: center; margin-top: 0;">${date}</p>
            <div class="row">
                <span>Name:</span>
                <input type="text" class="primary" disabled value="${name}">
            </div>
            <div class="row">
                <span>E-Mail:</span>
                <input type="text" class="primary" disabled value="${mail}">
            </div>
            <p>Message:</p>
            <textarea class="primary" disabled>${content}</textarea>
            <button class="primary" data-cursor-event="mail" onclick='reply(${id})'>Reply</button>
            <button class="primary" data-cursor-event="none" onclick='deleteMessage(${id})'>Delete</button>
        </div>`);
}

const reloadMessages = () => {
    document.querySelector("#message__container").innerHTML = "";
    fetch("messages/messages.json").then(response => response.json())
        .then(response => {
            messages = response;
            if (messages.length == 0) {
                document.querySelector("#message__container").innerHTML = "<p id='no__msgs'>It seems like there are no messages!</p>";
            }
            response.forEach((element, i) => {
                let time = element.time.split(" ");
                createMessage(element.name, element.email, time[0].split("-").reverse().join(".") + " - " + time[1], element.message, i) 
            });
        })
        .catch(e => {
            document.querySelector("#message__container").innerHTML = "<p id='no__msgs'>It seems like there are no messages!</p>";
        });
}

const reply = (id) => {
    window.open(`mailto:${messages[id].email}`);
}

const deleteMessage = (id) => {
    fetch(`api/message.php?delete=${id}`)
        .then(x => x.json())
        .then(x => {
            if (x.success) {
                showNotification("Success", "Message has been removed successfully!", "green");
            } else {
                showNotification("Error", x.error);
            }
        });
    reloadMessages();
}

reloadMessages();