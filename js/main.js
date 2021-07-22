/* new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
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

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
}) */

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

const createHeader = (param) => {
	const header = getElem('header');
	const container = getElem('div', ['container']);
	const wrapper = getElem('div', ['header']);
	const btnMenu = getElem('button', ['menu-button'])

	

	if (param.header.logo) {
		const logo = getElem('img', ['logo'], {
			src: param.header.logo,
			alt: param.header.title,
		});

		wrapper.append(logo);
	}

	if (param.header.menu) {
		const nav = getElem('nav', ['menu-list']);
		const allMenuLink = param.header.menu.map(item => {
			const link = getElem('a', ['menu-link'], {
				href: item.link,
				textContent: item.title
			});
			return link;
		})

		nav.append(...allMenuLink);
		wrapper.append(nav);
	}

	if (param.header.social) {
		const socialWrapper = getElem('div', ['social']);
		const allSocial = param.header.social.map(item => {
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
	container.append(btnMenu);
	return header;
}

const createMain = ({main: {title, genre, rating, descriptions, trailer}}) => {
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
	return main;

}

const movieConstructor = (selector, options) => {
	const app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.backgroundImage = options.background ? `url('${options.background}')` : '';
	document.title = options.title;

	if (options.header) {
		app.append(createHeader(options));
	}

	if (options.main) {
		app.append(createMain(options));
	}
}

movieConstructor('.app', {
	title: 'Ведьмак - официальный сайт сериала',
	background: 'witcher/background.jpg',
	header: {
		title: 'Ведьмак',
		logo: 'witcher/logo.png',
		social: [{
				title: 'twitter',
				link: 'https://twitter.com',
				img: 'witcher/social/twitter.svg',
			},
			{
				title: 'instagram',
				link: 'https://instagram.com',
				img: 'witcher/social/instagram.svg',
			},
			{
				title: 'facebook',
				link: 'https://facebook.com',
				img: 'witcher/social/facebook.svg',
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
		title: 'Ведьмак',
		genre: '2019,фэнтези',
		rating: '8',
		descriptions: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.',
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
	}
	
});