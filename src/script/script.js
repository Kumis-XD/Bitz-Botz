function sekarang() {
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var date2 = date.toLocaleString();
    return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
}

function utama() {
    var chatBox = document.getElementById("chat-box");
    var botMessage = document.createElement("div");
    botMessage.className = "chat chat-start";
    botMessage.innerHTML = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Halo, saya adalah Bitz Botz, ketik <code><strong>list</strong></code> atau <code><strong>help</strong></code> untuk melihat fitur dan bantuan perintah/command.</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
    chatBox.appendChild(botMessage);
}

function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    var chatBox = document.getElementById("chat-box");

    if (userInput) {
        var userMessage = document.createElement("div");
        userMessage.className = "chat chat-end";
        userMessage.innerHTML = `<div class='chat-header'>You<div class='chat-bubble'>${userInput}</div><time class='text-xs opacity-50 float-right'>${sekarang()}</time><div>`;
        chatBox.appendChild(userMessage);
        chatBox.scrollTop = chatBox.scrollHeight;


        var botMessage = document.createElement("div");
        botMessage.className = "chat chat-start";

        // Set waktu cooldown dalam milidetik
        const cooldownTime = 1500;

        // Buat fungsi untuk menampilkan pesan dari bot setelah cooldown selesai
        function displayBotMessage(message) {
            botMessage.innerHTML = `<span class="loading loading-bars loading-xs h-5 w-7"></span>`;

            setTimeout(() => {
                botMessage.innerHTML = message;
            }, cooldownTime);
        }

        // Contoh penggunaan saat pengguna mengirim pesan
        if (userInput.toLowerCase() === "help") {
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `
            <div class='chat-header'>Bitz Botz
            <div class='chat-bubble'>
            <strong>Help :</strong><br><br>
            Lokasi (IP Addres)<br>
            Translate (Text)<br>
            Gpt (Text)<br>
            Cuaca (Nama Kota)<br>
            Berita (Random)<br>
            Cari (Text)<br>
            Tomp3 (URL)<br>
            Shorturl (URL)<br>
            Texttoqr (Text or URL)<br>
            Motivasi (Random)
            </div>
            <time class='text-xs opacity-50 float-left'>${sekarang()}</time>
            </div>
            `;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        } else if (userInput.toLowerCase() === "list") {
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'><p><strong class='features'>Features</strong></p><ol><li>Lacak IP (Math | No Limit)</li><li>Berita Terbaru (Random | No Limit)</li><li>Pencari (String | No Limit)</li><li>Deteksi cuaca (String | No Limit)</li><li>Tomp3 (URL | Limit)</li><li>Short link (URL | Limit)</li><li>Text to QR (String | No Limit)</li><li>Random motivasi (Random | Limit)</li><li>Translate to EN (String | Limit)</li><li>Chat GPT (String | Limit)</li></ol></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        } else if (userInput.toLowerCase() === "motivasi") {

            var url = `https://api.xfarr.com/api/randomtext/motivasi?apikey=MIlhJs2IPY`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200 && data.result) {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'>${data.result}</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    } else if (data.status === 403 && data.result) {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'>${data.result}</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    } else {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'>Tidak dapat merespon.</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    }
                })
                .catch(error => {
                    const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                    const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'>${error}</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                });
        } else if (userInput.toLowerCase().startsWith("translate ")) {
            var user = userInput.substr(10);

            var url = `https://api.xfarr.com/api/tools/translate?apikey=MIlhJs2IPY&text=${user}&language=id`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200 && data.result) {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'><label>Translate <strong>${user}</strong> to <strong>ID</strong><br><label>Result : ${data.result}</label></label></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    } else if (data.status === 403) {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'>${data.message}</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    } else {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'>Terjadi kesalahan bahasa text.</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    }
                })
                .catch(error => {
                    const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                    const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'>${error}</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                    displayBotMessage(loadingMessage);
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                });
        } else if (userInput.toLowerCase().startsWith("gpt ")) {
            var input = userInput.substr(4);

            var url = `https://api.xfarr.com/api/ai/blackbox?apikey=MIlhJs2IPY&chat=${input}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200 && data.result) {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'>${data.result}</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    } else if (data.status === 403) {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'>${data.message}</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    }
                })
                .catch(error => {
                    const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                    const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'>${error}</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                    displayBotMessage(loadingMessage);
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                });
        } else if (userInput.toLowerCase().startsWith("texttoqr ")) {
            var text = userInput.substr(9);
            var urlQr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${text}`;
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble"><img src="${urlQr} width="200" height="200"></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        } else if (userInput.toLowerCase().startsWith("cari ")) {
            var query = userInput.substr(5);
            var apiKey = "AIzaSyBCmJ7ZlsvuXkzA4IG8jMjPnvD8r9mNpVE";
            var cx = "d149e278510994ec6";
            var googleSearchAPIUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${apiKey}&cx=${cx}`;

            fetch(googleSearchAPIUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.items && data.items.length > 0) {
                        var firstResult = data.items[0];
                        var title = firstResult.title;
                        var link = firstResult.link;

                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Hasil pencarian untuk "${query}": <a href="${link}" target="_blank">${title}</a></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    } else {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = "<div class='chat-header'>Bitz Botz<div class='chat-bubble'>Tidak ada hasil pencarian untuk query: " + query + `</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    }
                })
                .catch(error => {
                    const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                    const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Terjadi kesalahan dalam pencarian ( ${error} )</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                    displayBotMessage(loadingMessage);
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                });
        } else if (userInput.toLowerCase() === 'berita') {
            var apKey = '2c45f37711c84285a7c99ff877e2dc37';
            var url = `https://newsapi.org/v2/top-headlines?country=id&apiKey=${apKey}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.articles && data.articles.length > 0) {
                        data.articles.forEach(article => {
                            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble"><a href="${article.url}" target="_blank">${article.title}</a><p>${article.description}</p></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                            displayBotMessage(loadingMessage);
                            setTimeout(() => {
                                displayBotMessage(botMessageContent);
                            }, cooldownTime);
                        });
                    } else {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Tidak ada berita tersedia.</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    }
                })
                .catch(error => {
                    const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                    const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Terjadi kesalahan dalam mengambil berita.</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                    displayBotMessage(loadingMessage);
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                });
        } else if (userInput.toLowerCase().startsWith("shorturl ")) {
            var urlUser = userInput.substr(9);

            var userUrl = `https://api.xfarr.com/api/tools/shorturl?apikey=MIlhJs2IPY&url=${urlUser}`;

            fetch(userUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 200 && data.result) {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble"><label>Url : <a href="${data.result}">${data.result}</a></label></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    } else if (data.status === 403) {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">${data.message}</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    } else {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Terjadi kesalahan saat memuat URL.</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    }
                })
                .catch(error => {
                    const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                    const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">${error}</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                    displayBotMessage(loadingMessage);
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                });
        } else if (userInput.toLowerCase() === "shorturl") {
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Gunakan perintah <strong>shorturl</strong> dengan sebagai berikut : <br><br><br><p>Ketik : shorturl {URL}</p></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        } else if (userInput.toLowerCase() === "texttoqr") {
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Gunakan perintah <strong>texttoqr</strong> dengan sebagai berikut : <br><br><br><p>Ketik : texttoqr {String}</p></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        } else if (userInput.toLowerCase() === "gpt") {
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Gunakan perintah <strong>shorturl</strong> dengan sebagai berikut : <br><br><br><p>Ketik : gpt {Query}</p></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        } else if (userInput.toLowerCase().startsWith("lokasi ")) {
            var ipAddress = userInput.substr(7);
            var apiUrl = `http://ip-api.com/json/${ipAddress}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    var city = data.city;
                    var region = data.regionName;
                    var country = data.country;
                    var latitude = data.lat;
                    var longitude = data.lon;

                    const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                    const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Lokasi IP ${ipAddress}: Kota ${city}, Provinsi ${region}, Negara ${country}, Koordinat (${latitude}, ${longitude})</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                    chatBox.appendChild(botMessage);
                    chatBox.scrollTop = chatBox.scrollHeight;
                    displayBotMessage(loadingMessage);
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                })
                .catch(error => {
                    const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                    const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Terjadi kesalahan dalam melacak lokasi IP</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                    displayBotMessage(loadingMessage);
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                });
        } else if (userInput.toLowerCase().startsWith("tomp3 ")) {
            var yt = userInput.substr(6);
            var apiUrl = `https://api.xfarr.com/api/download/ytaudio2?apikey=MIlhJs2IPY&url=${yt}`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.status === 200 && data.result.title && data.result.url) {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Musik anda telah siap untuk di download :<br><a href="${data.result.url}" target="_blank">${data.result.title}</a></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    } else if (data.status === 403) {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">${data.message}</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    } else {
                        const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                        const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Terjadi kesalahan saat mengunduh mp3</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                        displayBotMessage(loadingMessage);
                        setTimeout(() => {
                            displayBotMessage(botMessageContent);
                        }, cooldownTime);
                    }
                })
                .catch(error => {
                    const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                    const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Terjadi kesalahan saat menghubungi server.</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                    displayBotMessage(loadingMessage);
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                });
        } else if (userInput.toLowerCase().startsWith("cuaca ")) {
            var city = userInput.substr(6);
            var apiKey = "f4047972ea6d46bd09dca19ca43eb1e9";
            var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    var weatherDescription = data.weather[0].description;
                    var temperature = data.main.temp - 273.15;
                    var city = data.name;

                    const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                    const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Cuaca di ${city}: ${weatherDescription}, Suhu: ${temperature.toFixed(1)}°C</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                    chatBox.appendChild(botMessage);
                    chatBox.scrollTop = chatBox.scrollHeight;
                    displayBotMessage(loadingMessage);
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                })
                .catch(error => {
                    const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
                    const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Terjadi kesalahan dalam mengambil data cuaca ( ${error} )</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
                    displayBotMessage(loadingMessage);
                    setTimeout(() => {
                        displayBotMessage(botMessageContent);
                    }, cooldownTime);
                });
        } else if (userInput.toLowerCase() === "cuaca") {
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Gunakan perintah <strong>cuaca</strong> dengan sebagai berikut : <br><br><br><p>Ketik : cuaca {Nama Kota}</p></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        } else if (userInput.toLowerCase() === "cari") {
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Gunakan perintah <strong>cari</strong> dengan sebagai berikut : <br><br><br><p>Ketik : cari {Pencarian yang ingin di telusuri}</p></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        } else if (userInput.toLowerCase() === "translate") {
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Gunakan perintah <strong>translate</strong> dengan sebagai berikut : <br><br><br><p>Ketik : translate {Text}</p></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        } else if (userInput.toLowerCase() === "lokasi") {
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Gunakan perintah <strong>lokasi</strong> dengan sebagai berikut : <br><br><br><p>Ketik : lokasi {IP Addres}</p></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        } else if (userInput.toLowerCase() === "tomp3") {
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class="chat-bubble">Gunakan perintah <strong>audio-mp3</strong> dengan sebagai berikut : <br><br><br><p>Ketik : tomp3 {URL}</p></div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        } else {
            const loadingMessage = `<span class="loading loading-bars loading-xs"></span>`;
            const botMessageContent = `<div class='chat-header'>Bitz Botz<div class='chat-bubble'>Perintah > <code><strong>${userInput}</strong></code> tidak tersedia.<br><br>Ketik <code><strong>help</strong></code> untuk bantuan command/perintah yang ada.</div><time class='text-xs opacity-50 float-left'>${sekarang()}</time></div>`;
            displayBotMessage(loadingMessage);
            setTimeout(() => {
                displayBotMessage(botMessageContent);
            }, cooldownTime);
        }
        chatBox.appendChild(botMessage);
        chatBox.scrollTop = chatBox.scrollHeight; // Otomatis scroll ke bawah untuk melihat pesan terbaru.
    }

    document.getElementById("user-input").value = "";
}