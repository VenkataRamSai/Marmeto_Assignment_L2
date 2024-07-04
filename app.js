let men = document.getElementById("men");
let women = document.getElementById("women");
let kids = document.getElementById("kids");

let layoutCard = document.getElementById("cardlayout");

function displayLayout(products) {

    layoutCard.textContent = "";

    for (let eachProduct of products) {
        let {
            badge_text,
            compare_at_price,
            image,
            price,
            title,
            vendor
        } = eachProduct;
        let subContainer = document.createElement("div");

        let imageContainer = document.createElement("div");
        imageContainer.style.backgroundImage = "url(" + image + ")";
        imageContainer.classList.add("imagecontainer");

        let badge = document.createElement("p");
        badge.textContent = badge_text;
        badge.classList.add("badge");
        if (badge_text !== null) {
            imageContainer.appendChild(badge);
        }

        subContainer.appendChild(imageContainer);

        let titleConteiner = document.createElement("div");
        titleConteiner.classList.add("titleConteiner");

        let titleElemnt = document.createElement("h1");
        titleElemnt.textContent = title;
        titleElemnt.classList.add("titleElemnt");
        titleConteiner.appendChild(titleElemnt);

        let vendorElement = document.createElement("p");
        vendorElement.textContent = '* ' + vendor;
        titleConteiner.appendChild(vendorElement);

        subContainer.appendChild(titleConteiner);

        let pricecontainer = document.createElement("div");
        pricecontainer.classList.add("pricecontainer");

        let priceElement = document.createElement("p");
        priceElement.textContent = "Rs." + price;
        pricecontainer.appendChild(priceElement);

        let comparePriceElement = document.createElement("p");
        comparePriceElement.textContent = compare_at_price;
        comparePriceElement.classList.add("comparePriceElement");
        pricecontainer.appendChild(comparePriceElement);

        let offElement = document.createElement("p");
        offElement.textContent = "50% off";
        offElement.classList.add("offElement");
        pricecontainer.appendChild(offElement);

        subContainer.appendChild(pricecontainer);

        let cartButton = document.createElement("button");
        cartButton.textContent = "Add to cart";
        cartButton.classList.add("cartButton");

        subContainer.appendChild(cartButton);

        layoutCard.appendChild(subContainer);
    }
}

function fetchData(categoryName) {
    let url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
    let options = {
        method: "GET"
    };

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            let {
                categories
            } = jsonData;
            for (let eachCategory of categories) {
                if (eachCategory.category_name === categoryName) {
                    let categoryProducts = eachCategory.category_products;
                    displayLayout(categoryProducts);
                }
            }
        });
}

men.classList.add("highlight-tab");
fetchData("Men");

men.onclick = function() {
    men.classList.add("highlight-tab");
    women.classList.remove("highlight-tab");
    kids.classList.remove("highlight-tab");
    fetchData("Men");
}
women.onclick = function() {
    men.classList.remove("highlight-tab");
    women.classList.add("highlight-tab");
    kids.classList.remove("highlight-tab");
    fetchData("Women");
}
kids.onclick = function() {
    men.classList.remove("highlight-tab");
    women.classList.remove("highlight-tab");
    kids.classList.add("highlight-tab");
    fetchData("Kids");
}