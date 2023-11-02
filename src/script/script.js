function sekarang() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var date2 = date.toLocaleString();
    return (hours < 10 ? "0" + hours: hours) + ":" + (minutes < 10 ? "0" + minutes: minutes);
}

function utama() {
    var chatBox = document.getElementById("chat-box");
    var botMessage = document.createElement("div");
    botMessage.className = "chat chat-start";
    botMessage.innerHTML = `<div class='chat-header'>
    Bitz Botz<div class="chat-bubble">
    Halo, saya adalah Bitz Botz, ada yang bisa saya bantu?
    </div>
    <time class='text-xs opacity-50 float-left'>${sekarang()}</time>
    </div>
    `;
    chatBox.appendChild(botMessage);
}

function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    var chatBox = document.getElementById("chat-box");

    if (userInput) {
        var userMessage = document.createElement("div");
        userMessage.className = "chat chat-end";
        userMessage.innerHTML = `<div class='chat-header'>
        You<div class='chat-bubble'>
        ${userInput}
        </div>
        <time class='text-xs opacity-50 float-right'>${sekarang()}</time><div>
        `;
        chatBox.appendChild(userMessage);
        chatBox.scrollTop = chatBox.scrollHeight;

        var botMessage = document.createElement("div");
        botMessage.className = "chat chat-start";

        const cooldownTime = 1500;

        function displayBotMessage(message) {
            botMessage.innerHTML = `<span class="loading loading-bars loading-xs h-5 w-7"></span>`;

            setTimeout(() => {
                botMessage.innerHTML = message;
            }, cooldownTime);
        }

        if (userInput) {
            const url = `https://chat-gpt-3-5-turbo.p.rapidapi.com/${userInput}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'eaef1b90c9msh814f276c869972bp1545edjsn8290ecee1053',
                    'X-RapidAPI-Host': 'chat-gpt-3-5-turbo.p.rapidapi.com'
                }
            };

            try {
                const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                displayBotMessage(loadingMessage);

                fetch(url, options)
                .then(response => {
                    if (response.status === 200) {
                        return response.text();
                    } else {
                        throw new Error(`Request failed with status: ${response.status}`);
                    }
                })
                .then(result => {
                    const botMessageContent = `<div class='chat-header'>
                    Bitz Botz<div class='chat-bubble'>
                    ${result}
                    </div>
                    <time class='text-xs opacity-50 float-left'>${sekarang()}</time>
                    </div>`;
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                })
                .catch(error => {
                    const botMessageContent = `<div class='chat-header'>
                    Bitz Botz<div class='chat-bubble'>
                    ${error}
                    </div>
                    <time class='text-xs opacity-50 float-left'>${sekarang()}</time>
                    </div>`;
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                });
            } catch (error) {
                console.error(error);
            }
            chatBox.appendChild(botMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    document.getElementById("user-input").value = "";
}