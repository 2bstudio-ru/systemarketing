import iconAds from '../assets/icons/services/ads.svg'
import iconAnalytics from '../assets/icons/services/analytics.svg'
import iconApps from '../assets/icons/services/apps.svg'
import iconBrand from '../assets/icons/services/brand.svg'
import iconHr from '../assets/icons/services/hr.svg'
import iconSites from '../assets/icons/services/sites.svg'
import mediaAds from '../assets/images/service-ads.jpg'
import mediaAnalytics from '../assets/images/service-analytics.jpg'
import mediaApps from '../assets/images/service-apps.jpg'
import mediaBrand from '../assets/images/service-brand.jpg'
import mediaHr from '../assets/images/service-hr.jpg'
import mediaSites from '../assets/images/service-sites.jpg'

export type Service = {
  id: string
  title: string
  lead: string
  body: string
  icon: string
  media: string
}

export const services: Service[] = [
  {
    id: 'brand',
    title: 'Брендинг и стратегия',
    lead: 'Cоздаем ДНК вашего бренда и пишем четкий план действий',
    body: 'Это ваша дорожная карта к предсказуемому росту, которая страхует от неверных шагов и позволяет развиваться уверенно, а не вслепую',
    icon: iconBrand,
    media: mediaBrand,
  },
  {
    id: 'sites',
    title: 'Сайты, дизайн, контент',
    lead: 'От продуманных сайтов и упаковки продукта до оформления витрин, презентаций и вдохновляющих фото/видео',
    body: 'Ваш бренд будет говорить с клиентом в безошибочно узнаваемом стиле',
    icon: iconSites,
    media: mediaSites,
  },
  {
    id: 'apps',
    title: 'Приложения и сервисы',
    lead: 'Запускаем мобильные приложения в 3-4 раза дешевле и быстрее рынка',
    body: 'Используем ИИ и вайбкодинг, чтобы вы получили мощный инструмент удержания клиентов без переплат и долгого ожидания',
    icon: iconApps,
    media: mediaApps,
  },
  {
    id: 'ads',
    title: 'Реклама и соцсети',
    lead: 'Мы делаем так, чтобы вас заметили везде, где есть ваша аудитория',
    body: 'Грамотно распределяем бюджеты по всем каналам, а в соцсетях создаем мощный визуал, который приносит не просто лайки, а реальные заказы',
    icon: iconAds,
    media: mediaAds,
  },
  {
    id: 'analytics',
    title: 'Аналитика и автоматизация',
    lead: 'Превращаем хаос данных в понятную систему',
    body: 'Вы будете видеть, откуда приходят деньги, и сможете принимать решения, основанные на цифрах, а не на интуиции. А рутинные действия мы просто отдадим роботам',
    icon: iconAnalytics,
    media: mediaAnalytics,
  },
  {
    id: 'hr',
    title: 'Развитие бизнеса и команды',
    lead: 'Мы\u00A0не\u00A0просто находим людей\u00A0— мы\u00A0строим вашу команду мечты',
    body: 'Создаем систему, в\u00A0которой маркетинг и\u00A0продажи работают как единый механизм, а\u00A0сотрудники мотивированы на\u00A0общий результат',
    icon: iconHr,
    media: mediaHr,
  },
]
