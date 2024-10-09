"use strict";
// Funktsiya: Saralashni boshqarish
function privacySeries(clickedItem, num) {
    // Chap seriyalar elementlari uchun 'active' klassini boshqarish
    const leftSeriesItems = document.querySelectorAll('.left-sieries li');
    leftSeriesItems.forEach(item => {
        item.classList.remove('active'); // Barcha chap seriya elementlaridan 'active' ni olib tashlash
        if (clickedItem === item) {
            item.classList.add('active'); // Faqat bosilgan elementga 'active' qo'shish
        }
    });
    // O'ng seriya elementlari uchun 'active' klassini va balandlik o'tishini boshqarish
    const rightSeriesItems = document.querySelectorAll('.right-series__item');
    rightSeriesItems.forEach(item => {
        const itemAtr = item.getAttribute('data-number'); // data-number atributini olish
        const content = item.querySelector('.right-sieries__content'); // O'ng seriya kontentini tanlash
        // Barcha o'ng seriya elementlaridan 'active' ni olib tashlash va kontentini qisqartirish
        item.classList.remove('active');
        if (content) {
            content.style.height = '0'; // Kontentni qisqartirish
        }
        // Bosilgan chap seriya elementiga mos o'ng seriya kontentini kengaytirish
        if (num == itemAtr) {
            item.classList.add('active'); // O'ng seriya elementiga 'active' qo'shish
            if (content) {
                const fullHeight = content.scrollHeight + 'px'; // Kontentning to'liq balandligini o'lchash
                content.style.height = fullHeight; // Balandlikni to'liq balandlikka qo'yish
            }
        }
        item.addEventListener('click', () => {
            console.log('salom');
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const mdAccElements = document.querySelectorAll('.md-acc');
    mdAccElements.forEach((element) => {
        element.addEventListener('click', function () {
            const content = this.nextElementSibling; // keyin keluvchi right-sieries__content
            // Agar ekran kengligi 991px dan kichik bo'lsa
            if (window.innerWidth <= 991) {
                // Barcha boshqa contentlarning balandligini kamaytiramiz
                document.querySelectorAll('.right-sieries__content').forEach((el) => {
                    if (el !== content) {
                        el.style.height = '0'; // Yashirish
                    }
                });
                const actualHeight = content.scrollHeight; // Balandlik o'lchovi
                content.style.height = `${actualHeight}px`; // Balandlikni o'rnatamiz
            }
        });
    });
});
const body = document.querySelector('body');
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    // Qo'shimcha mavzu uchun CSS linki
    let additionalThemeLink = null;
    // Qo'shimcha mavzuni qo'shish funksiyasi (light.min.css)
    function addLightTheme() {
        body.classList.add('light');
        additionalThemeLink = document.createElement('link'); // Yangi <link> yaratish
        additionalThemeLink.rel = 'stylesheet';
        additionalThemeLink.href = 'css/light-theme.css'; // Yangi CSS faylni yuklash
        additionalThemeLink.id = 'light-theme-link'; // ID berib qo'yamiz
        document.head.appendChild(additionalThemeLink); // <head> ga qo'shamiz
    }
    // Qo'shimcha mavzuni o'chirish funksiyasi (light.min.css ni o'chirish)
    function removeLightTheme() {
        if (additionalThemeLink) {
            document.head.removeChild(additionalThemeLink); // <link> ni o'chirish
            additionalThemeLink = null; // Elementni null ga o'zgartirish
            body.classList.remove('light');
        }
    }
    // Dark atributiga ega elementlarni topish
    const darkElements = document.querySelectorAll('[dark]');
    // Light atributiga ega elementlarni topish
    const lightElements = document.querySelectorAll('[light]');
    lightElements.forEach((el) => {
        el.style.display = 'none';
    });
    // Dark atributiga ega elementlarni yashirish, light atributiga ega elementlarni ko'rsatish
    function showLightTheme() {
        darkElements.forEach((el) => {
            el.style.display = 'none'; // Dark elementlarni yashirish
        });
        lightElements.forEach((el) => {
            el.style.display = 'block'; // Light elementlarni ko'rsatish
        });
    }
    // Light atributiga ega elementlarni yashirish, dark atributiga ega elementlarni ko'rsatish
    function showDarkTheme() {
        lightElements.forEach((el) => {
            el.style.display = 'none'; // Light elementlarni yashirish
        });
        darkElements.forEach((el) => {
            el.style.display = 'block'; // Dark elementlarni ko'rsatish
        });
    }
    // Tugma bosilganda CSS faylni qo'shish yoki olib tashlash
    toggleButton.addEventListener('click', () => {
        if (!additionalThemeLink) {
            addLightTheme(); // Qo'shimcha CSS faylni qo'shish
            showLightTheme();
        }
        else {
            showDarkTheme();
            removeLightTheme(); // Qo'shimcha CSS faylni olib tashlash
        }
    });
});
// Funktsiya: Akkordeonni o'chirish va ochish
function toggleAccordion(clickedHead) {
    const allAccordions = document.querySelectorAll('.accordion'); // Barcha akkordeonlarni tanlash
    const clickedAccordion = clickedHead.parentElement; // Bosilgan sarlavha elementining ota .accordionini olish
    const clickedContent = clickedAccordion === null || clickedAccordion === void 0 ? void 0 : clickedAccordion.querySelector('.accordion-content');
    if (!clickedContent)
        return; // Agar kontent topilmasa, chiqib ketish
    // Faqat bosilgan akkordeondan tashqari barcha akkordeonlarni yopish
    allAccordions.forEach(accordion => {
        const content = accordion.querySelector('.accordion-content');
        if (accordion !== clickedAccordion) {
            accordion.classList.remove('active'); // Boshqa akkordeonlardan 'active' ni olib tashlash
            content.style.height = '0'; // Kontentni qisqartirish
        }
    });
    // Bosilgan akkordeonni o'zgartirish
    clickedAccordion === null || clickedAccordion === void 0 ? void 0 : clickedAccordion.classList.toggle('active');
    if (clickedAccordion === null || clickedAccordion === void 0 ? void 0 : clickedAccordion.classList.contains('active')) {
        const fullHeight = clickedContent.scrollHeight + 'px'; // Kontentning to'liq balandligini olish
        clickedContent.style.height = fullHeight; // Bosilgan akkordeonni kengaytirish
    }
    else {
        clickedContent.style.height = '0'; // Agar akkordeon aktiv bo'lsa, qisqartirish
    }
}
// Funktsiya: Tanlov menyusini o'chirish va ochish
function toggleSelectMenu(event) {
    const selectDiv = event.currentTarget;
    const tariffCardSelect = selectDiv.closest('.tariff-card__select'); // HTMLElement yoki null sifatida
    const selectMenu = tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.querySelector('.tariff-select__menu'); // HTMLElement yoki null sifatida
    if (!selectMenu)
        return; // Agar menyu topilmasa, chiqib ketish
    // Boshqa ochiq menyularni yopish
    closeOtherMenus(tariffCardSelect);
    // Bosilgan element uchun 'open' klassini o'zgartirish
    tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.classList.toggle('open');
    // Silliq o'tish uchun balandlikni dinamik sozlash
    if (tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.classList.contains('open')) {
        const fullHeight = selectMenu.scrollHeight + 'px'; // Kontentning to'liq balandligini olish
        selectMenu.style.height = fullHeight; // Kengaytirilgan balandlikni qo'yish
    }
    else {
        selectMenu.style.height = '0'; // Menyuni qisqartirish
    }
}
// Funktsiya: Boshqa ochiq menyularni yopish
function closeOtherMenus(currentSelect) {
    const allSelects = document.querySelectorAll('.tariff-card__select');
    allSelects.forEach(select => {
        if (select !== currentSelect) {
            select.classList.remove('open');
            const menu = select.querySelector('.tariff-select__menu');
            if (menu) {
                menu.style.height = '0'; // Ochiq menyularni qisqartirish
            }
        }
    });
}
// Funktsiya: Tanlov menyusidan variant tanlashni boshqarish
function selectOption(event) {
    const selectedItem = event.currentTarget;
    const tariffCardSelect = selectedItem.closest('.tariff-card__select'); // HTMLElement yoki null sifatida
    const h2Element = tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.querySelector('.select h2');
    if (h2Element) {
        h2Element.textContent = selectedItem.textContent; // h2 matnini tanlangan variant bilan almashtirish
    }
    // Tanlovdan so'ng menyuni yopish
    const selectMenu = tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.querySelector('.tariff-select__menu');
    tariffCardSelect === null || tariffCardSelect === void 0 ? void 0 : tariffCardSelect.classList.remove('open');
    if (selectMenu) {
        selectMenu.style.height = '0'; // Tanlovdan so'ng menyuni qisqartirish
    }
}
// Tanlov menyusini ochish/yopish uchun hodisalar qo'shish
document.querySelectorAll('.tariff-card__select .select').forEach(selectDiv => {
    selectDiv.addEventListener('click', toggleSelectMenu);
});
// Variant tanlash uchun hodisalar qo'shish
document.querySelectorAll('.tariff-select__menu li').forEach(option => {
    option.addEventListener('click', selectOption);
});
// Yopish tugmasini va boshqarish elementlarini tanlash
const closeBtn = document.querySelector('.close-btn');
const headerDropdown = document.querySelector('.header-dropdown');
const headerBottom = document.querySelector('.header-bottom');
let headerOpen = false;
const header = document.querySelector('header');
// Boshqarish tugmasiga hodisa qo'shish
headerDropdown.addEventListener('click', () => {
    closeBtn.style.display = 'block';
    let HTheaderBottom = headerBottom.scrollHeight + 'px';
    if (!headerOpen) {
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
// Til tanlash tugmasi va menyusini boshqarish
const langBtn = document.querySelector('.lang-btn');
const dropdownItems = document.querySelectorAll('.dropdown-menu li');
const dropdownMenu = document.querySelector('.dropdown-menu');
langBtn.addEventListener('click', () => {
    closeBtn.style.display = 'block';
    dropdownMenu.classList.add('show');
});
dropdownItems === null || dropdownItems === void 0 ? void 0 : dropdownItems.forEach(item => {
    const lang = item.getAttribute('lang');
    item.addEventListener('click', () => {
        if (lang) {
            langBtn.value = lang;
            dropdownMenu.classList.remove('show');
        }
    });
});
// Yopish tugmasi uchun hodisa qo'shish
closeBtn.addEventListener('click', () => {
    header.classList.remove('open');
    headerBottom.style.height = '0px';
    headerBottom.style.opacity = '0';
    headerOpen = false;
    closeBtn.style.display = 'none';
    dropdownMenu.classList.remove('show');
});
// Server kontentini boshqarish
function showServerContent(button, serverId) {
    // Barcha server kontentlarini yashirish
    document.querySelectorAll('.tab-servet-content').forEach((content) => {
        content.classList.remove('show'); // "show" klassini olib tashlash
    });
    // Faollashtirilgan server kontentini ko'rsatish
    const activeContent = document.getElementById(`server-${serverId}`);
    if (activeContent) {
        activeContent.classList.add('show'); // "show" klassini qo'shish
    }
    // Barcha tugmalardan "active" sinfini olib tashlash
    document.querySelectorAll('.tabs-server button').forEach((btn) => {
        btn.classList.remove('active');
    });
    // Joriy tugmaga "active" sinfini qo'shish
    button.classList.add('active');
}
try {
    // Region kontentini boshqarish
    function showContentRegion(button, regionId) {
        // Barcha region kontentlarini olish
        const serverContentRegions = document.querySelectorAll('.tab-servet-content');
        // Har bir server uchun tegishli region kontentini yangilash
        serverContentRegions.forEach((content) => {
            const regions = content.querySelectorAll('.server-content-region');
            regions.forEach((region, index) => {
                if (index === regionId - 1) {
                    region.classList.add('show'); // "show" klassini qo'shish
                }
                else {
                    region.classList.remove('show'); // "show" klassini olib tashlash
                }
            });
        });
        // Barcha region tugmalaridan "active" sinfini olib tashlash
        document.querySelectorAll('.tabs-region button').forEach((btn) => {
            btn.classList.remove('active');
        });
        // Joriy region tugmasiga "active" sinfini qo'shish
        button.classList.add('active');
    }
    // Boshlang'ich sozlash
    showServerContent(document.querySelector('.tabs-server button.active'), 1);
    showContentRegion(document.querySelector('.tabs-region button.active'), 1);
}
catch (error) {
}
