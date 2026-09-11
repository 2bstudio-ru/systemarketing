import imgAtom from '../assets/images/cases/atom.jpg'
import imgCool from '../assets/images/cases/coolclever.jpg'
import imgDikarev from '../assets/images/cases/dikarev.jpg'
import imgDivisor from '../assets/images/cases/divisor.jpg'
import imgQultura from '../assets/images/cases/qultura.jpg'
import imgSistema from '../assets/images/cases/sistema.jpg'

export type CaseStudy = {
  id: string
  index: string
  name: string
  popupTitle: string
  quote: string
  result: string
  image: string
  rotate: number
  video?: string
}

export const cases: CaseStudy[] = [
  {
    id: 'dikarev',
    index: '01',
    name: 'Центр дикарева',
    popupTitle: 'центр дикарева',
    quote:
      '«Как загрузить клинику и всех врачей консультациями и операциями и понимать узкие горлышки бизнеса?»',
    result:
      'Глубоко изучили сферу, врачей и уникальные методики, перевыпустили сайт, рекламные кампании, спродюсировали соц. сети и внедрили глубинную аналитику. В итоге рост заказов +138% месяц к месяцу с точным пониманием зон развития',
    image: imgDikarev,
    rotate: -2,
    video: 'https://kinescope.io/embed/kZo7uHXMUprC8VkdW7Ut99',
  },
  {
    id: 'divisor',
    index: '02',
    name: 'divisor',
    popupTitle: 'divisor',
    quote:
      '«Мне нужен бренд! Придумайте название, нарисуйте логотип ну и все, что нужно для упаковки и эмоций — есть неделя»',
    result:
      'За неделю придумали нейминги и айдентику, защитили и улучшили итоговый вариант. Результат — осмысленное наименование и слоган, логотип созданный по принципам золотого сечения. Смотрите как мы это создавали на видео.',
    image: imgDivisor,
    rotate: 2,
    video: 'https://kinescope.io/embed/aqhztCA78NABVJRmXPSPJ4',
  },
  {
    id: 'coolclever',
    index: '03',
    name: 'КуулКлевер',
    popupTitle: 'КуулКлевер',
    quote:
      '«Пандемия! Нужно перейти в онлайн и доставлять продукты питания свежими, не потеряв лояльность клиентов»',
    result:
      'В пандемию помогли федеральному ритейлеру запустить мобильное приложение и доставку. Результат — рост оборота онлайн-заказов в 2,6 раза и рост брендовых запросов в 2 раза год к году',
    image: imgCool,
    rotate: 4,
    video: 'https://kinescope.io/embed/njs5YPNeZoraH6naBKkmpF',
  },
  {
    id: 'qultura',
    index: '04',
    name: 'Qultura',
    popupTitle: 'Qultura',
    quote:
      '«Хочу стать лидером fashion-ресейл в Москве и получить измеримый прозрачный бизнес»',
    result:
      'В 2024 году с помощью нашей команды сделали Qultura топ-1 в России по выкупленным вещам, создали полноценную систему управления бизнесом через маркетинг, организовали работу всей команды через регулярные системные коммуникации',
    image: imgQultura,
    rotate: -3,
    video: 'https://kinescope.io/embed/wrN8VkJNmBU3qR51Nuk1oj',
  },
  {
    id: 'atom',
    index: '05',
    name: 'АТОМАКУСТИК',
    popupTitle: 'Атомакустик',
    quote:
      '«Я придумал продукт, мне нужен бренд, упаковка и продвижение. И все это — вчера»',
    result:
      'За 57 дней с нуля создали бренд профессиональных акустических систем: от нейминга и сайта до стенда на международной выставке. Результат — более 100 заявок на покупку в первый месяц после запуска',
    image: imgAtom,
    rotate: 0,
    video: 'https://kinescope.io/embed/sXryvGRwhzHeQLB2Npy9eP',
  },
  {
    id: 'sistema',
    index: '06',
    name: '«Система»',
    popupTitle: 'Система',
    quote:
      '«Сайт, соц.сети, приложения, аналитика и создание всего контента - маркетинг под ключ»',
    result:
      '«Система» — это больше, чем маркетинг; это команда для решения самых сложных проектов, которая выстраивает единый механизм из бренда, рекламы, аналитики и продаж для достижения измеримого результата.',
    image: imgSistema,
    rotate: -1,
  },
]
