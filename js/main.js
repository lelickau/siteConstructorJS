/**
 * Создание элемента html
 * @param {*String} tagName - имя тэга
 * @param {*Array ['...']} classNames - массив с классами
 * @param {*Object {}} attr - объект с атрибутами
 * @returns - вернет html элемент
 */
const getElem = (tagName, classNames, attr) => {
	const elem = document.createElement(tagName);
	if (classNames) {
		elem.classList.add(...classNames)
	}

	if (attr) {
		for (const item in attr) {
			elem[item] = attr[item];
		}
	}
	return elem;
}

/**
 * Конструктор header
 * @param {*Jbject} param - объект со значениями для header
 * @returns - вернет готовый элемент html header
 */
const createHeader = ({logo, title,	menu, social}) => {
	const header = getElem('header');
	const container = getElem('div', ['container']);
	const wrapper = getElem('div', ['header']);

	if (logo) {
		const logoElem = getElem('img', ['logo'], {
			src: logo,
			alt: title,
		});

		wrapper.append(logoElem);
	}

	if (menu) {
		const nav = getElem('nav', ['menu-list']);
		const allMenuLink = menu.map(item => {
			const link = getElem('a', ['menu-link'], {
				href: item.link,
				textContent: item.title
			});
			return link;
		})

		nav.append(...allMenuLink);
		wrapper.append(nav);

		//меню при адаптиве
		const btnMenu = getElem('button', ['menu-button']);
		btnMenu.addEventListener('click', () => {
			btnMenu.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});
		container.append(btnMenu);
	}

	if (social) {
		const socialWrapper = getElem('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElem('a', ['social-link'], {
				href: item.link
			});
			socialLink.append(getElem('img', ['social-img'], {
				src: item.img,
				alt: item.title,
			}))

			return socialLink;
		});

		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container);
	container.append(wrapper);
	return header;
}

/**
 * Конструктор элемента html main
 * @param {*Object} param - объект с данными для main 
 * @returns вернет готовый элемент html main
 */
const createMain = ({main: {title, genre, rating, descriptions, trailer, slider}}) => {
	const main = getElem('main');
	const container = getElem('div', ['container']);
	main.append(container);
	const wrapper = getElem('div', ['main-content']);
	container.append(wrapper);
	const content = getElem('div', ['content']);
	wrapper.append(content);

	if (genre) {
		const genreSpan = getElem('span', ['genre','animated','fadeInRight'], {
			textContent: genre,
		});
		content.append(genreSpan);
	}

	if (rating) {
		const ratingBlock = getElem('div', ['rating','animated','fadeInRight']);
		const ratingStars = getElem('div', ['rating-stars']);
		const ratingNumber = getElem('div', ['rating-number'], {
			textContent: `${rating}/10`
		});

		for (let i = 0; i < 10; i++) {
			const star = getElem('img', ['star'], {
				alt: i ? `` : `Рейтинг ${rating} из 10`,
				src: i < rating ? `img/star.svg` : `img/star-o.svg`
			});
			ratingStars.append(star);
		}

		content.append(ratingBlock);
		ratingBlock.append(ratingStars, ratingNumber);
	}

	content.append(getElem('h1', ['main-title','animated','fadeInRight'], {
		textContent: title,
	}));

	if (descriptions) {
		const descriptionEl = getElem('p', ['main-description','animated','fadeInRight'], {
			textContent: descriptions,
		});
		content.append(descriptionEl);
	}

	if (trailer) {
		const youTubeLink = getElem('a', ['button','animated','fadeInRight','youtube-modal'], {
			textContent: 'Смотреть трейлер',
			href: trailer,
		});

		const youTubeImgLink = getElem('a', ['play', 'youtube-modal'], {
			href: trailer,
		});
		const iconPlay = getElem('img', ['play-img'], {
			alt: 'play',
			src: 'img/play.svg',
			arriaHidden: true
		});
		content.append(youTubeLink);
		youTubeImgLink.append(iconPlay);
		wrapper.append(youTubeImgLink);
	}

	if (slider) {
		const sliderBlock = getElem('div', ['series']);
		const swiperBlock = getElem('div', ['swiper-container']);
		const swiperWrapper = getElem('div', ['swiper-wrapper']);
		const arrow = getElem('button', ['arrow']);

		const slides = slider.map(slide => {
			const swiperSlide = getElem('div', ['swiper-slide']);
			const card = getElem('figure', ['card']);
			swiperSlide.append(card);
			const cardImg = getElem('img', ['card-img'], {
				src: slide.img,
				alt: ((slide.title || 'slide') + ' ' + (slide.subtitle || 'slide')).trim(),
			});
			card.append(cardImg);

			if (slide.title || slide.subtitle) {
				const cardDescription = getElem('figcaption', ['card-description']);
				cardDescription.innerHTML = `
					${slide.subtitle ? `<p class="card-subtitle">${slide.subtitle}</p>` : ''}
					${slide.title ? `<p class="card-title">${slide.title}</p>` : ''}
					
				`;
				card.append(cardDescription);
			}
			return swiperSlide
		});
		main.append(sliderBlock);
		sliderBlock.append(swiperBlock, arrow);
		swiperBlock.append(swiperWrapper);
		swiperWrapper.append(...slides);

		//swiper slider
		new Swiper(swiperBlock, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	}
	return main;
}


//footer
const createFooter = ({copyright, menu}) => {
	const footer = getElem('footer', ['footer']);
	const container = getElem('div', ['container']);
	const content = getElem('div', ['footer-content']);
	container.append(content);

	if (copyright) {
		const leftContent = getElem('div', ['left']);
		const copyrightElem = getElem('span', ['copyright'], {
			textContent: copyright
		});
		content.append(leftContent);
		leftContent.append(copyrightElem);
	}

	if (menu) {
		const rightContent = getElem('div', ['right']);
		const nav = getElem('nav', ['footer-menu']);

		const allFooterLink = menu.map(item => {
			const link = getElem('a', ['footer-link'], {
				href: item.href,
				textContent: item.title
			})
			return link;
		});

		content.append(rightContent);
		rightContent.append(nav);
		nav.append(...allFooterLink);
	}

	footer.append(container);
	return footer;
}

/**
 * Финальный конструктор (собирает страницу сайта)
 * @param {*String} selector - принимает селектор в котором будет находится вся внутренность сайта
 * @param {*Object} options - объект с данными для контента сайта
 */
const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');
	app.style.backgroundImage = options.background ? `url('${options.background}')` : '';
	app.style.color = options.fontColor ||  '';
	app.style.backgroundColor = options.backgroundColor || '';

	if (options.subColor) {
		document.documentElement.style.setProperty('--sub-color', options.subColor);
	}

	//title страницы
	document.title = options.title;

	//favicon
	if (options.favicon) {
		const index = options.favicon.lastIndexOf('.');
		const type = options.favicon.substring(index + 1);

		const favicon = getElem('link', null, {
			rel:"shortcut icon",
			href: options.favicon,
			type: "image/" + (type === 'svg' ? 'svg-xml' : type),
		});
		document.head.append(favicon);
	}
	

	//header
	if (options.header) {
		app.append(createHeader(options.header));
	}

	//main
	if (options.main) {
		app.append(createMain(options));
	}

	//footer
	if (options.footer) {
		app.append(createFooter(options.footer))
	}
}

movieConstructor('.app', {
	title: 'Локи - официальный сайт сериала',
	background: 'loki/background.jpg',
	favicon: 'loki/favicon.png',
	fontColor: '#FFFFFF',
	backgroundColor: '#141218',
	subColor: '#81b214',
	header: {
		title: 'Локи',
		logo: 'loki/logo.png',
		social: [{
				title: 'twitter',
				link: 'https://twitter.com',
				img: 'loki/social/twitter.svg',
			},
			{
				title: 'instagram',
				link: 'https://instagram.com',
				img: 'loki/social/instagram.svg',
			},
			{
				title: 'facebook',
				link: 'https://facebook.com',
				img: 'loki/social/facebook.svg',
			}
		],
		menu: [{
			title: 'Описание',
			link: '#',
		},
		{
			title: 'Трейлер',
			link: '#',
		},
		{
			title: 'Отзывы',
			link: '#',
		}
	]
	},
	main: {
		title: 'Локи',
		genre: '2021, фантастика, фэнтези, боевик, приключения',
		rating: '8',
		descriptions: 'Локи попадает в таинственную организацию «Управление временными изменениями» после того, как он украл Тессеракт, и путешествует во времени, меняя историю.',
		trailer: 'https://youtu.be/YrjHcYqe31g',
		slider: [
          {
            img: 'loki/series/series-1.jpg',
            title: 'Славная миссия',
            subtitle: 'Серия №1',
          }, 
          {
            img: 'loki/series/series-2.jpg',
            title: 'Вариант',
            subtitle: 'Серия №2',
          }, 
          {
            img: 'loki/series/series-3.jpg',
            title: 'Ламентис',
            subtitle: 'Серия №3',
          }, 
          {
            img: 'loki/series/series-4.jpg',
            title: 'Смежное событие',
            subtitle: 'Серия №4',
          },
          {
            img: 'loki/series/series-5.jpg',
            title: 'Путешествие в неизвестность',
            subtitle: 'Серия №5',
          },
          {
            img: 'loki/series/series-6.jpg',
            title: 'На все времена. Всегда',
            subtitle: 'Серия №6',
          }
        ]
	},
	footer : {
		copyright: '© 2020 The Loki. All right reserved.',
		menu: [
			{
				title: 'Privacy Policy',
				href: '#',
			},
			{
				title: 'Terms of Service',
				href: '#',
			},
			{
				title: 'Legal',
				href: '#',
			},
		],
	}
	
}
);

