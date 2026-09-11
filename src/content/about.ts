import auditImg from '../assets/images/about/audit.jpg'
import measureImg from '../assets/images/about/measure.jpg'
import missionImg from '../assets/images/about/mission.jpg'
import podcastImg from '../assets/images/about/podcast.jpg'
import salesImg from '../assets/images/about/sales.jpg'

export type AboutItem = {
  id: string
  index: string
  title: string
  body: string
  image: string
  rotate: number
  /** artboard coords @ 360 */
  left: number
  top: number
  width: number
  height: number
  mediaHeight: number
  /** Tilda SBS scroll: my shift over di (trg=1, ofst=0). */
  parallax?: { my: number; di: number }
  video?: string
  href?: string
  wide?: boolean
}

export const aboutItems: AboutItem[] = [
  {
    id: 'mission',
    index: '01',
    title: 'Наша миссия',
    body: 'Работаем не с сотней проектов, а вдолгую с избранными. Выбираем проекты, которые нас вдохновляют, и проходим с клиентами все этапы роста. Даже кризисы и пандемию. Потому что мы — настоящие партнеры.',
    image: missionImg,
    rotate: -2,
    left: 20,
    top: 65,
    width: 150,
    height: 220,
    mediaHeight: 180,
    video: 'https://kinescope.io/embed/6dVcHmqgPSUuBZ5F4ms19q',
  },
  {
    id: 'sales',
    index: '02',
    title: 'Продажи,\nа не охваты',
    body: 'Мы думаем как собственники: не про лайки и показы, а про поток клиентов и измеримую прибыль. Каждый канал должен закрывать задачу бизнеса, а не отчёт агентства.',
    image: salesImg,
    rotate: 2,
    left: 185,
    top: 125,
    width: 150,
    height: 240,
    mediaHeight: 185,
    parallax: { my: -30, di: 1000 },
    video: 'https://kinescope.io/embed/dgWwJjMo58k7o5HbvD8sN8',
  },
  {
    id: 'measure',
    index: '03',
    title: 'Измеримость —\nнаш подход',
    body: 'Вы будете видеть, откуда приходят деньги, и сможете принимать решения, основанные на цифрах, а не на интуиции. Отчёты — это карта бизнеса, а не скучные таблицы.',
    image: measureImg,
    rotate: -2,
    left: 25,
    top: 345,
    width: 150,
    height: 240,
    mediaHeight: 185,
    parallax: { my: 50, di: 1000 },
    video: 'https://kinescope.io/embed/njQnmWAJRu6PNqtpQSvpnG',
  },
  {
    id: 'audit',
    index: '04',
    title: 'Аудит у нас',
    body: 'Более 15 лет опыта помогают нам увидеть типичные узкие места в маркетинге, продажах и бизнесе, которые ваша команда пропустила. Покажем, где теряется прибыль и как её быстро прибавить.',
    image: auditImg,
    rotate: 2,
    left: 185,
    top: 425,
    width: 150,
    height: 220,
    mediaHeight: 180,
    parallax: { my: -50, di: 800 },
    video: 'https://kinescope.io/embed/as2jSzMzHA1oewuTf1eoAm',
  },
  {
    id: 'podcast',
    index: '05',
    title: 'Подкаст с нами',
    body: 'Куда утекают миллионы — подкаст о маркетинге и бизнесе.',
    image: podcastImg,
    rotate: 0,
    left: 20,
    top: 695,
    width: 320,
    height: 200,
    mediaHeight: 160,
    wide: true,
    href: 'https://www.youtube.com/watch?v=-JH3TYcRHGc&t=155s',
  },
]
