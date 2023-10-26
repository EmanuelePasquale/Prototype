window.addEventListener("load", (event) => {

    startAnimazioneProdotti()

    if (window.location.href.includes("index.html")) {
        startAnimazioneProdotti();
    }
    if (window.location.href.includes("annunci.html")) {

        let url = new URL(window.location.href)

        let filtroPrezzi = url.searchParams.get("inputPrezzi");
        let filtroNome = url.searchParams.get("inputNomeProdotto");
        let filtroCategoria = url.searchParams.get("inputCategoria");

        if (filtroCategoria == "cellulari") {
            filtroCategoria = "smartphones"
        } else if (filtroCategoria == "laptops") {
            filtroCategoria = "laptops"
        } else if (filtroCategoria == "profumi") {
            filtroCategoria = "fragrances"
        } else if (filtroCategoria == "gioielli-donna") {
            filtroCategoria = "womens-jewellery"
        } else if (filtroCategoria == "cura-della-pelle") {
            filtroCategoria = "skincare"
        } else if (filtroCategoria == "abiti-donna") {
            filtroCategoria = "womens-dresses"
        } else if (filtroCategoria == "scarpe-donna") {
            filtroCategoria = "womens-shoes"
        } else if (filtroCategoria == "abiti-uomo") {
            filtroCategoria = "mens-shirts"
        } else if (filtroCategoria == "scarpe-uomo") {
            filtroCategoria = "mens-shoes"
        } else if (filtroCategoria == "orologi-uomo") {
            filtroCategoria = "mens-watches"
        } else if (filtroCategoria == "orologi-donna") {
            filtroCategoria = "womens-watches"
        } else if (filtroCategoria == "borse-donna") {
            filtroCategoria = "womens-bags"
        } else if (filtroCategoria == "occhiali-da-sole") {
            filtroCategoria = "sunglasses"
        } else if (filtroCategoria == "accessori-auto") {
            filtroCategoria = "automotive"
        } else if (filtroCategoria == "accessori-moto") {
            filtroCategoria = "motorcycle"
        } else if (filtroCategoria == "illuminazione") {
            filtroCategoria = "lighting"
        } else if (filtroCategoria == "home-decor") {
            filtroCategoria = "home-decoration"
        } else if (filtroCategoria == "arredamento") {
            filtroCategoria = "furniture"
        } else if (filtroCategoria == "tops") {
            filtroCategoria = "tops"
        } else if (filtroCategoria == "cibo") {
            filtroCategoria = "groceries"
        }

        let limiteInferiore = filtroPrezzi?.split("-")[0]
        let limiteSuperiore = filtroPrezzi?.split("-")[1]

        aggiungiProdotti(limiteInferiore, limiteSuperiore, filtroNome, filtroCategoria)
    }
    if (window.location.href.includes("prodotto.html")) {
        let url = new URL(window.location.href)
        let idProdotto = url.searchParams.get("idProdotto")
        ottieniProdotto(idProdotto)
    }
});
function startAnimazioneProdotti() {
    let i = 0;

    setInterval(function () {
        let immagine = document.querySelector(".immagineIntro");
        immagine.style.transition = "opacity 1s";
        immagine.style.opacity = 0;

        setTimeout(function () {
            if (i == 0) {
                immagine.src = "./images/Louis-Vuitton-Shoes-PNG-Clipart.png"
                immagine.style.opacity = 1
                i++
            } else if (i == 1) {
                immagine.src = "/images/Rolex-Watch-PNG-Clipart.png"
                immagine.style.opacity = 1
                i++
            }
            else if (i == 2) {
                immagine.src = "/images/cellulari.png"
                immagine.style.opacity = 1
                i++
            }
            else if (i == 3) {
                immagine.src = "/images/laptop.png"
                immagine.style.opacity = 1
                i++
            }
            else if (i == 4) {
                immagine.src = "/images/green-img.png"
                immagine.style.opacity = 1
                i = 0
            }
        }, 1000)

    }, 2000)
}
function vaiAllaHome() {
    window.location.href = "/index.html"
}
function VaiAiContatti() {
    window.location.href = "/contatti.html"

}
function vaiAllaRegistrazione() {

    window.location.href = "/registrazione.html"
}
function vaiAllAccesso() {

    window.location.href = "/accedi.html"

}
function VaiAlloShop() {
    window.location.href = "/shop.html"

}
function vaiAgliAnnunci() {

    let filtroPrezzi = document.getElementById("inputPrezzi").value
    let filtroNome = document.getElementById("inputNomeProdotto").value
    let filtroCategoria = document.getElementById("inputCategoria").value

    window.location.href = "/annunci.html" + "?inputPrezzi=" + filtroPrezzi + "&inputNomeProdotto=" + filtroNome + "&inputCategoria=" + filtroCategoria
}
function aggiungiProdotti(limiteInferiore, limiteSuperiore, filtroNome, filtroCategoria) {

    fetch("https://dummyjson.com/products?limit=0&skip=0")
        .then((response) => response.json())
        .then(data => {
            data = data["products"].filter(function (prodotto) {

                return prodotto.category == filtroCategoria && prodotto.title.startsWith(filtroNome) && (prodotto.price >= limiteInferiore && prodotto.price <= limiteSuperiore)
            });

            let numeroElementi = data?.length;
            document.getElementById("numeroRisultatiP").innerHTML = numeroElementi + "Risultati"
            for (let i = 0; i < data.length; i++) {

                let divProdotto = document.createElement("div")

                divProdotto.classList.add("cardProdotto")

                let prezzo = data[i].price;
                let titolo = data[i].title;
                let immagine = data[i].thumbnail;
                let descrizione = data[i].description;
                let idProdotto = data[i].id;
                let scontoProdotto = data[i].discountPercentage;
                let valutazioneUtenti = data[i].rating;
                let marchio = data[i].brand;
                let disponibilità = data[i].stock;
                let galleria = data[i].images;

                divProdotto.innerHTML = `<h3 style="text-align: center; justify-content: center;">${titolo}</h3>
                <img src="${immagine}" onclick="vaiAlProdotto(${idProdotto})" alt="foto prodotto"
                    style="width: 100%; height: 170px; object-fit: contain;">
                    <h4 style="justify-content: center; margin-top: 20px; font-size: 16px; text-align: center; color: #2c3e50; font-weight: bold;">Brand: ${marchio}</h4>
                <h4 style="justify-content: center; margin-top: 20px; font-size: 13px; text-align: center color: black">${descrizione}</h4>
                <h3 style="text-align: center; color: black;">${prezzo}€</h2> 
                <h3 style="margin-top: 0px;text-align: center;padding-bottom: 8px ">Disponibili: ${disponibilità} unità</h3> 
                <h4 style="font-weight: bold; margin-top: 20px;text-align: center;padding-bottom: 8px ">Scontato del ${scontoProdotto}%</h4>
                <h6 style="justify-content: center; margin-top: 20px; font-size: 15px; text-align: center">Valutazione Utenti ${valutazioneUtenti}<img class="valutation" src="/images/star.jpg"></h6>

                <button onclick="vaiAlProdotto(${idProdotto})" class="btnRegistrati"
                    style="height: 50px;width: 100%;background-color: #4973ff; color: white;border-radius: 15px;padding-left: 9px; font-size: 18px;border: 1px solid black;">Acquista</button>
                    <div class="product-gallery">
                    <div class="product-carousel">
                    ${galleria.map(image => `<img class="img-carousel" src="${image}" alt="foto prodotto" style="width: 90%; height: 120px; object-fit: contain;">`).join('')}
                    </div>

                    </div>`
                document.getElementById("containerProdotti").appendChild(divProdotto)
            }

        })
        .catch; (error => {
            console.log(error)
        }
        );
}
function prevSlide(event) {
    const carousel = event.target.parentNode.previousElementSibling;
    carousel.scrollBy(-carousel.offsetWidth, 0);
  } 
  function nextSlide(event) {
    const carousel = event.target.parentNode.previousElementSibling;
    carousel.scrollBy(carousel.offsetWidth, 0);
  }
function vaiAlProdotto(idProdotto) {
    window.location.href = "/prodotto.html?idProdotto=" + idProdotto
}
function abitiDonna() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=abiti-donna";
}
function abitiUomo() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=abiti-uomo";
}
function borseDonna() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=borse-donna";
}
function gioielliDonna() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=gioielli-donna";
}
function orologiDonna() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=orologi-donna";
}
function scarpeDonna() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=scarpe-donna";
}
function orologiUomo() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=orologi-uomo";
}
function scarpeUomo() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=scarpe-uomo";
}
function occhialiDaSole() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=occhiali-da-sole";
}
function arredamento() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=arredamento";
}
function homeDecor() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=home-decor";
}
function cibo() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=cibo";
}
function curaDellaPelle() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=cura-della-pelle";
}
function profumi() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=profumi";
}
function tops() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=tops";
}
function cellulari() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=cellulari";
}
function laptops() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=laptops";
}
function accessoriAuto() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=accessori-auto";
}
function accessoriMoto() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=accessori-moto";
}
function illuminazione() {
    window.location.href = "/annunci.html?inputPrezzi=1-2000&inputNomeProdotto=&inputCategoria=illuminazione";
}
function scrollaDestra() {
    $("#divRaccomandazioni").animate({ scrollLeft: $("#divRaccomandazioni").scrollLeft() + 200 }, 200);
}
function scrollaSinistra() {
    $("#divRaccomandazioni").animate({ scrollLeft: $("#divRaccomandazioni").scrollLeft() - 200 }, 200);
}
function toggleLogin() {

    let btnLogin = document.getElementById("btnLogin")
    let textBtnLogin = document.getElementById("textBtnLogin")
    let btnRegistrazione = document.getElementById("btnRegistrazione")
    let textBtnRegistrazione = document.getElementById("textBtnRegistrazione")


    btnLogin.style.transition = "background-color 0.4s"
    btnLogin.style.backgroundColor = "white"
    textBtnLogin.style.color = "black"
    btnRegistrazione.style.transition = "background-color 0.1s"
    btnRegistrazione.style.backgroundColor = "black"
    textBtnRegistrazione.style.color = "white"

    let divLogin = document.getElementById("divLogin")
    let divRegistrazione = document.getElementById("divRegistrazione")

    divRegistrazione.style.transition = "opacity 0.4s"
    divRegistrazione.style.opacity = 0

    setTimeout(function () {
        divRegistrazione.style.display = "none"
        divLogin.style.transition = "opacity 0.4s"
        divLogin.style.opacity = 0
        divLogin.style.display = "flex"

        setTimeout(function () {
            divLogin.style.opacity = 1

        }, 200)
    }, 200)
}
function toggleRegistrazione() {
    let btnRegistrazione = document.getElementById("btnRegistrazione")
    let textBtnRegistrazione = document.getElementById("textBtnRegistrazione")
    let btnLogin = document.getElementById("btnLogin")
    let textBtnLogin = document.getElementById("textBtnLogin")

    btnRegistrazione.style.transition = "background-color 0.1s"
    btnRegistrazione.style.backgroundColor = "white"
    textBtnRegistrazione.style.color = "pickled bluewood"
    btnLogin.style.transition = "background-color 0.4s"
    btnLogin.style.backgroundColor = "pickled bluewood"
    textBtnLogin.style.color = "white"

    let divLogin = document.getElementById("divLogin")
    let divRegistrazione = document.getElementById("divRegistrazione")

    divLogin.style.transition = "opacity 0.4s"
    divLogin.style.opacity = 0

    setTimeout(function () {
        divLogin.style.display = "none"
        divRegistrazione.style.transition = "opacity 0.4s"
        divRegistrazione.style.opacity = 0
        divRegistrazione.style.display = "flex"

        setTimeout(function () {
            divRegistrazione.style.opacity = 1

        }, 200)
    }, 200)
}
function ottieniProdotto(idProdotto) {
    fetch("https://dummyjson.com/products/" + idProdotto)
        .then((response) => response.json())
        .then(data => {

            document.getElementById("divCaricamento").style.display = "none";
            document.getElementById("divProdotto").style.display = "flex";

            let immagine = document.getElementById("immagineProdotto")
            immagine.style.opacity = 0;
            immagine.style.transition = "opacity 2s"
            immagine.src = data.thumbnail

            setTimeout(function () {
                immagine.style.opacity = 1

            }, 500)


            let titoloProdotto = document.getElementById("titoloProdotto")
            titoloProdotto.innerHTML = data.title

            let descrizioneProdotto = document.getElementById("descrizioneProdotto")
            descrizioneProdotto.innerHTML = data.description

            let prezzoProdotto = document.getElementById("prezzoProdotto")
            prezzoProdotto.innerHTML = data.price

        })
        .catch; (error => {
            console.log(error)
        }
        )
};
function loginEmail() {
    let usernameUtente = document.getElementById("inputUsername").value
    let passwordUtente = document.getElementById("inputPassword").value
    fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({

            username: usernameUtente,
            password: passwordUtente,
            expiresInMin: 60,
        })
    })
        .then(res => res.json())
        .then((data) => {

            if (data?.message == "Invalid credentials") {
                document.getElementById("erroreLoginP").style.display = "block"
                console.log("Le credenziali sono errate")
            } else {
                console.log("Sono l'utente" + data?.username + ", sono loggato.")
                window.location.href = "/dashboard.html"
            }
        });
}