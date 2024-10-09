// Funktsiya: Saralashni boshqarish
function privacySeries(clickedItem: HTMLElement, num: number | null): void {
	// Chap seriyalar elementlari uchun 'active' klassini boshqarish
	const leftSeriesItems = document.querySelectorAll('.left-sieries li') as NodeListOf<HTMLLIElement>;
	leftSeriesItems.forEach(item => {
		item.classList.remove('active');  // Barcha chap seriya elementlaridan 'active' ni olib tashlash
		if (clickedItem === item) {
			item.classList.add('active');  // Faqat bosilgan elementga 'active' qo'shish
		}
	});

	// O'ng seriya elementlari uchun 'active' klassini va balandlik o'tishini boshqarish
	const rightSeriesItems = document.querySelectorAll('.right-series__item') as NodeListOf<HTMLElement>;
	rightSeriesItems.forEach(item => {
		const itemAtr = item.getAttribute('data-number');  // data-number atributini olish
		const content = item.querySelector('.right-sieries__content') as HTMLElement;  // O'ng seriya kontentini tanlash
		// Barcha o'ng seriya elementlaridan 'active' ni olib tashlash va kontentini qisqartirish
		item.classList.remove('active');
		if (content) {
			content.style.height = '0';  // Kontentni qisqartirish
		}
		// Bosilgan chap seriya elementiga mos o'ng seriya kontentini kengaytirish
		if (num == itemAtr) {
			item.classList.add('active');  // O'ng seriya elementiga 'active' qo'shish
			if (content) {
				const fullHeight = content.scrollHeight + 'px';  // Kontentning to'liq balandligini o'lchash
				content.style.height = fullHeight;  // Balandlikni to'liq balandlikka qo'yish
			}
		}
		item.addEventListener('click', () => {
			console.log('salom');
		})
	});
}




document.addEventListener('DOMContentLoaded', () => {
	const mdAccElements = document.querySelectorAll<HTMLElement>('.md-acc');

	mdAccElements.forEach((element) => {
		element.addEventListener('click', function () {
			const content = this.nextElementSibling as HTMLElement; // keyin keluvchi right-sieries__content

			// Agar ekran kengligi 991px dan kichik bo'lsa
			if (window.innerWidth <= 991) {
				// Barcha boshqa contentlarning balandligini kamaytiramiz
				document.querySelectorAll<HTMLElement>('.right-sieries__content').forEach((el) => {
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

const body = document.querySelector('body') as HTMLElement;
document.addEventListener('DOMContentLoaded', () => {
	const toggleButton = document.getElementById('theme-toggle') as HTMLButtonElement;

	// Qo'shimcha mavzu uchun CSS linki
	let additionalThemeLink: HTMLLinkElement | null = null;

	// Qo'shimcha mavzuni qo'shish funksiyasi (light.min.css)
	function addLightTheme(): void {
		body.classList.add('light')
		additionalThemeLink = document.createElement('link'); // Yangi <link> yaratish
		additionalThemeLink.rel = 'stylesheet';
		additionalThemeLink.href = 'css/light-theme.css'; // Yangi CSS faylni yuklash
		additionalThemeLink.id = 'light-theme-link'; // ID berib qo'yamiz
		document.head.appendChild(additionalThemeLink); // <head> ga qo'shamiz
	}

	// Qo'shimcha mavzuni o'chirish funksiyasi (light.min.css ni o'chirish)
	function removeLightTheme(): void {
		if (additionalThemeLink) {
			document.head.removeChild(additionalThemeLink); // <link> ni o'chirish
			additionalThemeLink = null; // Elementni null ga o'zgartirish
			body.classList.remove('light')
		}
	}
	// Dark atributiga ega elementlarni topish
	const darkElements = document.querySelectorAll<HTMLElement>('[dark]');

	// Light atributiga ega elementlarni topish
	const lightElements = document.querySelectorAll<HTMLElement>('[light]');
	lightElements.forEach((el) => {
		el.style.display = 'none';
	});
	// Dark atributiga ega elementlarni yashirish, light atributiga ega elementlarni ko'rsatish
	function showLightTheme(): void {
		darkElements.forEach((el) => {
			el.style.display = 'none'; // Dark elementlarni yashirish
		});
		lightElements.forEach((el) => {
			el.style.display = 'block'; // Light elementlarni ko'rsatish
		});
	}

	// Light atributiga ega elementlarni yashirish, dark atributiga ega elementlarni ko'rsatish
	function showDarkTheme(): void {
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
			showLightTheme()
		} else {
			showDarkTheme()
			removeLightTheme(); // Qo'shimcha CSS faylni olib tashlash
		}
	});
});


// Funktsiya: Akkordeonni o'chirish va ochish
function toggleAccordion(clickedHead: HTMLElement): void {
	const allAccordions = document.querySelectorAll('.accordion'); // Barcha akkordeonlarni tanlash
	const clickedAccordion = clickedHead.parentElement; // Bosilgan sarlavha elementining ota .accordionini olish
	const clickedContent = clickedAccordion?.querySelector('.accordion-content') as HTMLElement;

	if (!clickedContent) return; // Agar kontent topilmasa, chiqib ketish

	// Faqat bosilgan akkordeondan tashqari barcha akkordeonlarni yopish
	allAccordions.forEach(accordion => {
		const content = accordion.querySelector('.accordion-content') as HTMLElement;
		if (accordion !== clickedAccordion) {
			accordion.classList.remove('active'); // Boshqa akkordeonlardan 'active' ni olib tashlash
			content.style.height = '0'; // Kontentni qisqartirish
		}
	});

	// Bosilgan akkordeonni o'zgartirish
	clickedAccordion?.classList.toggle('active');
	if (clickedAccordion?.classList.contains('active')) {
		const fullHeight = clickedContent.scrollHeight + 'px'; // Kontentning to'liq balandligini olish
		clickedContent.style.height = fullHeight; // Bosilgan akkordeonni kengaytirish
	} else {
		clickedContent.style.height = '0'; // Agar akkordeon aktiv bo'lsa, qisqartirish
	}
}

// Funktsiya: Tanlov menyusini o'chirish va ochish
function toggleSelectMenu(event: Event): void {
	const selectDiv = event.currentTarget as HTMLElement;
	const tariffCardSelect = selectDiv.closest('.tariff-card__select') as HTMLElement | null; // HTMLElement yoki null sifatida
	const selectMenu = tariffCardSelect?.querySelector('.tariff-select__menu') as HTMLElement | null; // HTMLElement yoki null sifatida

	if (!selectMenu) return; // Agar menyu topilmasa, chiqib ketish

	// Boshqa ochiq menyularni yopish
	closeOtherMenus(tariffCardSelect);

	// Bosilgan element uchun 'open' klassini o'zgartirish
	tariffCardSelect?.classList.toggle('open');

	// Silliq o'tish uchun balandlikni dinamik sozlash
	if (tariffCardSelect?.classList.contains('open')) {
		const fullHeight = selectMenu.scrollHeight + 'px'; // Kontentning to'liq balandligini olish
		selectMenu.style.height = fullHeight; // Kengaytirilgan balandlikni qo'yish
	} else {
		selectMenu.style.height = '0'; // Menyuni qisqartirish
	}
}

// Funktsiya: Boshqa ochiq menyularni yopish
function closeOtherMenus(currentSelect: HTMLElement | null): void {
	const allSelects = document.querySelectorAll('.tariff-card__select') as NodeListOf<HTMLElement>;

	allSelects.forEach(select => {
		if (select !== currentSelect) {
			select.classList.remove('open');
			const menu = select.querySelector('.tariff-select__menu') as HTMLElement | null;
			if (menu) {
				menu.style.height = '0'; // Ochiq menyularni qisqartirish
			}
		}
	});
}

// Funktsiya: Tanlov menyusidan variant tanlashni boshqarish
function selectOption(event: Event): void {
	const selectedItem = event.currentTarget as HTMLElement;
	const tariffCardSelect = selectedItem.closest('.tariff-card__select') as HTMLElement | null; // HTMLElement yoki null sifatida
	const h2Element = tariffCardSelect?.querySelector('.select h2') as HTMLElement | null;

	if (h2Element) {
		h2Element.textContent = selectedItem.textContent; // h2 matnini tanlangan variant bilan almashtirish
	}

	// Tanlovdan so'ng menyuni yopish
	const selectMenu = tariffCardSelect?.querySelector('.tariff-select__menu') as HTMLElement | null;
	tariffCardSelect?.classList.remove('open');
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
const closeBtn = document.querySelector('.close-btn') as HTMLElement;
const headerDropdown = document.querySelector('.header-dropdown') as HTMLLIElement;
const headerBottom = document.querySelector('.header-bottom') as HTMLElement;

let headerOpen = false;
const header = document.querySelector('header') as HTMLElement;

// Boshqarish tugmasiga hodisa qo'shish
headerDropdown.addEventListener('click', () => {
	closeBtn.style.display = 'block';
	let HTheaderBottom = headerBottom.scrollHeight + 'px';
	if (!headerOpen) {
		header.classList.add('open');
		headerBottom.style.opacity = '1';
		headerBottom.style.height = HTheaderBottom;
		headerOpen = true;
	} else {
		header.classList.remove('open');
		headerBottom.style.height = '0px';
		headerBottom.style.opacity = '0';
		headerOpen = false;
	}
});

// Til tanlash tugmasi va menyusini boshqarish
const langBtn = document.querySelector('.lang-btn') as HTMLInputElement;
const dropdownItems = document.querySelectorAll('.dropdown-menu li') as NodeListOf<HTMLLIElement>;
const dropdownMenu = document.querySelector('.dropdown-menu') as HTMLElement;

langBtn.addEventListener('click', () => {
	closeBtn.style.display = 'block';
	dropdownMenu.classList.add('show');
});

dropdownItems?.forEach(item => {
	const lang = item.getAttribute('lang');
	item.addEventListener('click', () => {
		if (lang) {
			langBtn.value = lang;
			dropdownMenu.classList.remove('show');
			closeBtn.style.display = 'none';
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
function showServerContent(button: HTMLElement, serverId: number): void {
	// Barcha server kontentlarini yashirish
	document.querySelectorAll('.tab-servet-content').forEach((content: Element) => {
		content.classList.remove('show'); // "show" klassini olib tashlash
	});

	// Faollashtirilgan server kontentini ko'rsatish
	const activeContent = document.getElementById(`server-${serverId}`);
	if (activeContent) {
		activeContent.classList.add('show'); // "show" klassini qo'shish
	}

	// Barcha tugmalardan "active" sinfini olib tashlash
	document.querySelectorAll('.tabs-server button').forEach((btn: Element) => {
		(btn as HTMLElement).classList.remove('active');
	});

	// Joriy tugmaga "active" sinfini qo'shish
	button.classList.add('active');
}

try {
	// Region kontentini boshqarish
	function showContentRegion(button: HTMLElement, regionId: number): void {
		// Barcha region kontentlarini olish
		const serverContentRegions = document.querySelectorAll('.tab-servet-content');

		// Har bir server uchun tegishli region kontentini yangilash
		serverContentRegions.forEach((content: Element) => {
			const regions = (content as HTMLElement).querySelectorAll('.server-content-region');
			regions.forEach((region: Element, index: number) => {
				if (index === regionId - 1) {
					(region as HTMLElement).classList.add('show'); // "show" klassini qo'shish
				} else {
					(region as HTMLElement).classList.remove('show'); // "show" klassini olib tashlash
				}
			});
		});

		// Barcha region tugmalaridan "active" sinfini olib tashlash
		document.querySelectorAll('.tabs-region button').forEach((btn: Element) => {
			(btn as HTMLElement).classList.remove('active');
		});

		// Joriy region tugmasiga "active" sinfini qo'shish
		button.classList.add('active');
	}

	// Boshlang'ich sozlash
	showServerContent(document.querySelector('.tabs-server button.active') as HTMLElement, 1);
	showContentRegion(document.querySelector('.tabs-region button.active') as HTMLElement, 1);

} catch (error) {

}