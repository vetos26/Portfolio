import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'bootstrap/js/dist/modal';
import Collapse from 'bootstrap/js/dist/collapse';
import '@fontsource-variable/manrope';
import '@fontsource-variable/jetbrains-mono';
import './style.css';

import terminalIcon from 'lucide-static/icons/terminal.svg?raw';
import menuIcon from 'lucide-static/icons/menu.svg?raw';
import upRightIcon from 'lucide-static/icons/arrow-up-right.svg?raw';
import downRightIcon from 'lucide-static/icons/arrow-down-right.svg?raw';
import arrowDownIcon from 'lucide-static/icons/arrow-down.svg?raw';
import arrowUpIcon from 'lucide-static/icons/arrow-up.svg?raw';
import crosshairIcon from 'lucide-static/icons/crosshair.svg?raw';
import sparklesIcon from 'lucide-static/icons/sparkles.svg?raw';
import codeIcon from 'lucide-static/icons/code-xml.svg?raw';
import phoneIcon from 'lucide-static/icons/smartphone.svg?raw';
import layersIcon from 'lucide-static/icons/layers.svg?raw';
import xIcon from 'lucide-static/icons/x.svg?raw';
import downloadIcon from 'lucide-static/icons/download.svg?raw';
import aiImage from '../assets/project-ai.webp';
import appImage from '../assets/project-app.webp';
import artImage from '../assets/project-art.webp';
import webImage from '../assets/project-web.webp';

const icons = {
  terminal: terminalIcon, menu: menuIcon, 'up-right': upRightIcon, 'down-right': downRightIcon,
  'arrow-down': arrowDownIcon, 'arrow-up': arrowUpIcon, crosshair: crosshairIcon,
  sparkles: sparklesIcon, code: codeIcon, phone: phoneIcon, layers: layersIcon, x: xIcon, download: downloadIcon,
};

function paintIcons(root) {
  root.querySelectorAll('[data-icon]').forEach((node) => {
    node.innerHTML = icons[node.dataset.icon] || '';
    node.setAttribute('aria-hidden', 'true');
  });
}
paintIcons(document);

const projects = [
  {
    id: 'promptlab', category: 'ai', label: 'AI / LLM', title: 'PromptLab', image: aiImage, alt: 'Тёмный интерфейс редактора промптов с бирюзовыми акцентами',
    summary: 'Рабочее пространство для создания и тестирования промптов.',
    description: 'Концепт редактора, в котором можно собрать инструкцию для языковой модели, проверить её на разных примерах и сравнить ответы между версиями.',
    features: ['Шаблоны с переменными для повторяющихся задач.', 'Набор тестовых запросов для проверки неоднозначных входных данных.', 'Сравнение ответов по формату, полноте и точности.'],
    tags: ['LLM', 'Prompt Design', 'UX'],
  },
  {
    id: 'focusflow', category: 'android', label: 'ANDROID', title: 'FocusFlow', image: appImage, alt: 'Два экрана Android-приложения со списком задач и статистикой',
    summary: 'Мобильный планировщик задач и привычек для Android.',
    description: 'Интерфейсный прототип ежедневного планировщика: главные задачи видны сразу, а статистика помогает заметить, как меняется нагрузка в течение недели.',
    features: ['Список дел на сегодня с быстрым добавлением задачи.', 'Отдельный сценарий для повторяющихся привычек.', 'Еженедельная сводка выполненных задач.'],
    tags: ['Android', 'Material Design', 'UI'],
  },
  {
    id: 'neural-forms', category: 'art', label: 'ГРАФИКА', title: 'Neural Forms', image: artImage, alt: 'Абстрактная спираль из фиолетового стекла и синего хрома',
    summary: 'Визуальное исследование формы, света и текстуры с помощью AI.',
    description: 'Серия абстрактных визуальных экспериментов со стеклом, светом и объёмом. Для этой работы выбран контраст холодного металла и фиолетового свечения.',
    features: ['Поиск формы через вариации композиции и ракурса.', 'Настройка материала и контраста с помощью промптов.', 'Подготовка изображения для широкоформатной обложки.'],
    tags: ['Generative Art', 'AI Graphics', '3D'],
  },
  {
    id: 'forma', category: 'web', label: 'ВЕБ', title: 'Forma Studio', image: webImage, alt: 'Макет сайта архитектурной студии с большой фотографией здания',
    summary: 'Концепт адаптивного сайта архитектурной студии.',
    description: 'Редакционная подача архитектурных работ: крупная типографика, фотографии и простая навигация. Макет рассчитан на реализацию с помощью компонентов Bootstrap.',
    features: ['Сетка Bootstrap с разными колонками для телефона и десктопа.', 'Семантическая структура страниц на HTML5.', 'Галерея с крупными изображениями и краткими описаниями.'],
    tags: ['HTML5', 'Bootstrap 5', 'Responsive'],
  },
];

const grid = document.querySelector('#project-grid');
const filters = [...document.querySelectorAll('[data-filter]')];
const more = document.querySelector('#more-projects');
const projectsStatus = document.querySelector('#project-status');
const modal = document.querySelector('#project-modal');
let category = 'all';
let expanded = false;

function tags(project) {
  return project.tags.map((tag) => `<span>${tag}</span>`).join('');
}

function renderProjects() {
  const visible = category === 'all'
    ? projects.slice(0, expanded ? projects.length : 3)
    : projects.filter((project) => project.category === category);

  grid.innerHTML = visible.map((project) => `
    <div class="col-sm-6 col-lg-4">
      <article class="project-card position-relative">
        <div class="project-image">
          <img src="${project.image}" alt="${project.alt}" loading="lazy" decoding="async">
          <span class="category" data-category="${project.category}">${project.label}</span>
        </div>
        <div class="project-info">
          <h3>${project.title}</h3>
          <p>${project.summary}</p>
          <div class="project-end">
            <div class="tags">${tags(project)}</div>
            <button class="btn icon-button stretched-link" type="button" data-project="${project.id}" aria-label="Открыть проект ${project.title}"><span data-icon="up-right"></span></button>
          </div>
        </div>
      </article>
    </div>`).join('');
  paintIcons(grid);
  more.hidden = category !== 'all';
  more.setAttribute('aria-expanded', String(expanded));
  more.innerHTML = expanded ? 'Свернуть <span data-icon="arrow-up"></span>' : 'Все проекты <span data-icon="arrow-down"></span>';
  paintIcons(more);
  projectsStatus.textContent = `Показано проектов: ${visible.length}.`;
}

filters.forEach((button) => button.addEventListener('click', () => {
  category = button.dataset.filter;
  filters.forEach((filter) => filter.setAttribute('aria-pressed', String(filter === button)));
  renderProjects();
}));
more.addEventListener('click', () => {
  expanded = !expanded;
  renderProjects();
  if (expanded) grid.querySelector('[data-project="forma"]')?.focus();
});
renderProjects();

grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-project]');
  if (button) Modal.getOrCreateInstance(modal).show(button);
});
modal.addEventListener('show.bs.modal', (event) => {
  const project = projects.find(({id}) => id === event.relatedTarget?.dataset.project);
  if (!project) {
    event.preventDefault();
    return;
  }
  modal.querySelector('#case-title').textContent = project.title;
  modal.querySelector('#case-category').textContent = `${project.label} / КОНЦЕПТ`;
  const image = modal.querySelector('#case-image');
  image.src = project.image;
  image.alt = project.alt;
  modal.querySelector('#case-description').textContent = project.description;
  modal.querySelector('#case-features').replaceChildren(...project.features.map((feature) => {
    const li = document.createElement('li');
    li.textContent = feature;
    return li;
  }));
  modal.querySelector('#case-tags').innerHTML = tags(project);
  modal.addEventListener('hidden.bs.modal', () => event.relatedTarget.focus(), {once: true});
});

const menu = document.querySelector('#site-menu');
const navLinks = [...menu.querySelectorAll('.nav-link')];
function updateNav(hash) {
  navLinks.forEach((link) => {
    const active = (hash || '#top') === link.hash;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
menu.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  const mobileMenu = window.matchMedia('(max-width: 767.98px)').matches;
  const open = document.querySelector('.navbar-toggler').getAttribute('aria-expanded') === 'true';
  if (!link || !mobileMenu || !open || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

  event.preventDefault();
  const collapse = Collapse.getOrCreateInstance(menu, {toggle: false});
  menu.addEventListener('hidden.bs.collapse', () => {
    if (location.hash !== link.hash) location.hash = link.hash;
    else document.getElementById(link.hash.slice(1))?.scrollIntoView();
  }, {once: true});
  if (menu.classList.contains('collapsing')) {
    menu.addEventListener('shown.bs.collapse', () => collapse.hide(), {once: true});
  } else {
    collapse.hide();
  }
});
window.addEventListener('hashchange', () => updateNav(location.hash));
updateNav(location.hash);

const brief = document.querySelector('#brief-form');
const task = brief.querySelector('#brief-task');
const briefStatus = brief.querySelector('#brief-status');
brief.addEventListener('input', () => {
  task.setCustomValidity('');
  briefStatus.textContent = '';
});
brief.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = new FormData(brief);
  if (!task.value.trim()) {
    task.setCustomValidity('Кратко опишите задачу.');
    task.reportValidity();
    return;
  }
  const text = `Бриф проекта\n\nИмя: ${fields.get('name').trim() || 'Не указано'}\nНаправление: ${fields.get('type')}\n\nЗадача:\n${task.value.trim()}\n`;
  const url = URL.createObjectURL(new Blob([text], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'project-brief.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  briefStatus.textContent = 'Бриф подготовлен к скачиванию. Данные не отправлены.';
});
