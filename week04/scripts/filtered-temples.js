
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modified: " + document.lastModified;


const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");


    if (nav.classList.contains("open")) {
        hamburger.textContent = "✕";
    } else {
        hamburger.textContent = "☰";
    }
});

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Belém Brazil Temple",
        location: "Belém Brazil",
        dedicated: "2022, November, 20",
        area: 28675,
        imageUrl: 
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/belem-brazil/1280x800/belem_brazil_temple_exterior2.jpg"
    },
    {
        templeName: "Bountiful Utah Temple",
        location: "Bountiful Utah",
        dedicated: "1995, January, 14",
        area: 104000,
        imageUrl: 
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bountiful-utah/1280x800/bountiful-temple-766347-wallpaper.jpg"
    },
    {
        templeName: "Brigham City Utah Temple",
        location: "Brigham City Utah", 
        dedicated: "2012, September, 23",
        area: 36000,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/brigham-city-utah/1280x800/brigham-city-temple-lds-1078623-wallpaper.jpg"
    },
    {
        templeName: "Cedar City Utah Temple",
        location: "Cedar City Utah",
        dedicated: "2017, December, 10",
        area: 42657,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/cedar-city-utah/1200x675/Cedar-City-1978603.jpg"
    },
    {
        templeName: "Chicago Illinois Temple",
        location: "Glenview Illinois",
        dedicated: "1985, August, 13",
        area: 37062,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/chicago-illinois/1280x800/Chicago-Temple_0784.jpg"
    }
        
];

function createTempleCards(templeList) {
    const main = document.querySelector("main");
    main.innerHTML = "<h1>Home</h1><div class='card-grid'></div>";
    const grid = main.querySelector(".card-grid");

    templeList.forEach(temple => {
        const card = document.createElement("div");
        card.classList.add("temple-card");

        card.innerHTML = `
            <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
            <h2>${temple.templeName}</h2>
            <p><span>Location:</span> ${temple.location}</p>
            <p><span>Dedicated:</span> ${temple.dedicated}</p>
            <p><span>Area:</span> ${temple.area.toLocaleString()} sq ft</p>
        `;
        grid.appendChild(card);
    });
}

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = link.getAttribute("href");

        document.querySelector("main h1").textContent =
            filter.charAt(0).toUpperCase() + filter.slice(1);

        let filtered;
        switch (filter) {
            case "old":
                filtered = temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
                break;
            case "new":
                filtered = temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
                break;
            case "large":
                filtered = temples.filter(t => t.area > 90000);
                break;
            case "small":
                filtered = temples.filter(t => t.area < 10000);
                break;
            default:
                filtered = temples;
        }

        createTempleCards(filtered);
    });
});

createTempleCards(temples);