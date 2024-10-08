"use strict";
function privacySeries(clickedItem, num) {
    // Manage active class for left series items
    const leftSeriesItems = document.querySelectorAll('.left-sieries li');
    leftSeriesItems.forEach(item => {
        item.classList.remove('active'); // Remove 'active' from all left-series items
        if (clickedItem === item) {
            item.classList.add('active'); // Add 'active' only to the clicked item
        }
    });
    // Manage active class and height transition for right series items
    const rightSeriesItems = document.querySelectorAll('.right-series__item');
    rightSeriesItems.forEach(item => {
        const itemAtr = item.getAttribute('data-number'); // Get the data-number attribute
        const content = item.querySelector('.right-sieries__content'); // Select the right-series content
        // Remove 'active' class from all right series items and collapse their content
        item.classList.remove('active');
        if (content) {
            content.style.height = '0'; // Collapse content
        }
        // Add 'active' class and expand the clicked item's content
        if (num == itemAtr) {
            item.classList.add('active'); // Add 'active' to the right-series item that matches the clicked left-series item
            if (content) {
                // Measure the actual height of the content
                const fullHeight = content.scrollHeight + 'px';
                content.style.height = fullHeight; // Set the height to the full height
            }
        }
    });
}
function toggleAccordion(clickedHead) {
    const allAccordions = document.querySelectorAll('.accordion'); // Select all accordions
    const clickedAccordion = clickedHead.parentElement; // Get the parent .accordion of the clicked head
    const clickedContent = clickedAccordion === null || clickedAccordion === void 0 ? void 0 : clickedAccordion.querySelector('.accordion-content');
    if (!clickedContent)
        return; // Exit if no content found
    // Close all accordions except the clicked one
    allAccordions.forEach(accordion => {
        const content = accordion.querySelector('.accordion-content');
        if (accordion !== clickedAccordion) {
            accordion.classList.remove('active'); // Remove active class from other accordions
            content.style.height = '0'; // Collapse the content
        }
    });
    // Toggle the clicked accordion
    clickedAccordion === null || clickedAccordion === void 0 ? void 0 : clickedAccordion.classList.toggle('active');
    if (clickedAccordion === null || clickedAccordion === void 0 ? void 0 : clickedAccordion.classList.contains('active')) {
        const fullHeight = clickedContent.scrollHeight + 'px'; // Get full height of the content
        clickedContent.style.height = fullHeight; // Expand the clicked accordion
    }
    else {
        clickedContent.style.height = '0'; // Collapse the clicked accordion if it's active
    }
}
// Function to handle the opening/closing of the select menu
function toggleSelectMenu(event) {
    const selectDiv = event.currentTarget;
    const tariffCardSelect = selectDiv.closest('.tariff-card__select'); // Cast to HTMLElement | null
    const selectMenu = tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.querySelector('.tariff-select__menu'); // Cast to HTMLElement | null
    if (!selectMenu)
        return; // Exit if no menu found
    // Close all other open menus first
    closeOtherMenus(tariffCardSelect);
    // Toggle the 'open' class for the clicked item
    tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.classList.toggle('open');
    // Set height dynamically for smooth transition
    if (tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.classList.contains('open')) {
        const fullHeight = selectMenu.scrollHeight + 'px'; // Get the full height of the content
        selectMenu.style.height = fullHeight; // Set height to expand
    }
    else {
        selectMenu.style.height = '0'; // Collapse the menu
    }
}
// Function to close other open menus
function closeOtherMenus(currentSelect) {
    const allSelects = document.querySelectorAll('.tariff-card__select');
    allSelects.forEach(select => {
        if (select !== currentSelect) {
            select.classList.remove('open');
            const menu = select.querySelector('.tariff-select__menu');
            if (menu) {
                menu.style.height = '0'; // Collapse any open menus
            }
        }
    });
}
// Function to handle selecting an option from the dropdown menu
function selectOption(event) {
    const selectedItem = event.currentTarget;
    const tariffCardSelect = selectedItem.closest('.tariff-card__select'); // Cast to HTMLElement | null
    const h2Element = tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.querySelector('.select h2');
    if (h2Element) {
        h2Element.textContent = selectedItem.textContent; // Replace h2 text with the selected option
    }
    // Close the menu after selection
    const selectMenu = tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.querySelector('.tariff-select__menu');
    tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.classList.remove('open');
    if (selectMenu) {
        selectMenu.style.height = '0'; // Collapse the menu after selection
    }
}
// Add event listener for opening/closing the select menu
document.querySelectorAll('.tariff-card__select .select').forEach(selectDiv => {
    selectDiv.addEventListener('click', toggleSelectMenu);
});
// Add event listener for selecting an option
document.querySelectorAll('.tariff-select__menu li').forEach(option => {
    option.addEventListener('click', selectOption);
});
const closeBtn = document.querySelector('.close-btn');
const headerDropdown = document.querySelector('.header-dropdown');
const headerBottom = document.querySelector('.header-bottom');
let headerOpen = false;
const header = document.querySelector('header');
headerDropdown.addEventListener('click', () => {
    closeBtn.style.display = 'block';
    let HTheaderBottom = headerBottom.scrollHeight + 'px';
    if (headerOpen == false) {
        header.classList.add('open');
        headerBottom.style.opacity = '1';
        headerBottom.style.height = HTheaderBottom;
        headerOpen = true;
    }
    else {
        header.classList.remove('open');
        headerBottom.style.height = '0px';
        headerBottom.style.opacity = '0';
        headerOpen = false;
    }
});
const langBtn = document.querySelector('.lang-btn');
const dropdownItems = document.querySelectorAll('.dropdown-menu li');
const dropdownMenu = document.querySelector('.dropdown-menu');
langBtn.addEventListener('click', () => {
    closeBtn.style.display = 'block';
    dropdownMenu.classList.add('show');
});
dropdownItems.forEach(item => {
    const lang = item.getAttribute('lang');
    item.addEventListener('click', () => {
        if (lang) {
            langBtn.value = lang;
            dropdownMenu.classList.remove('show');
        }
    });
});
closeBtn.addEventListener('click', () => {
    header.classList.remove('open');
    headerBottom.style.height = '0px';
    headerBottom.style.opacity = '0';
    headerOpen = false;
    closeBtn.style.display = 'none';
    dropdownMenu.classList.remove('show');
});
