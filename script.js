"use strict";

const ACCESS_SIGNATURE = 330;
const ACCESS_SIZE = 3;
const STORAGE_KEY = "kodovy-shtorm-state-v1";
const CHAPTERS = [
  "Контур формы",
  "GET-передача",
  "POST-протокол",
  "PHP-приемник",
  "SQL-инъекции",
  "Парольный щит",
  "Хэш-ядро",
  "Cookies и база",
];

const QUESTS = [
  {
    id: 1,
    chapter: 1,
    title: "Первый сигнал формы",
    story: "Ника видит на панели пустую форму. Чтобы открыть шлюз, нужно понять, что именно отправляет данные на сервер.",
    type: "single",
    question: "Какой HTML-элемент чаще всего отправляет данные формы?",
    options: ["Кнопка submit внутри формы", "Заголовок h1", "Обычный абзац p", "Картинка img"],
    answer: 0,
    hint: "В уроке форма имела поля Name, Age и кнопку Submit.",
    explanation: "Кнопка submit запускает отправку формы на сервер.",
  },
  {
    id: 2,
    chapter: 1,
    title: "Метод передачи",
    story: "В воротах формы мигает пустой атрибут. Без него сервер не поймет, каким способом придут данные.",
    type: "text",
    question: "Впиши атрибут формы, который выбирает GET или POST: <form ______=\"get\">",
    answers: ["method"],
    hint: "В примере было написано form method=\"get\".",
    explanation: "Атрибут method задает способ отправки данных: get или post.",
  },
  {
    id: 3,
    chapter: 1,
    title: "Имя поля",
    story: "Данные дошли до PHP, но переменная пустая. Похоже, поле формы не получило правильный идентификатор.",
    type: "single",
    question: "Какой атрибут input нужен PHP, чтобы найти значение поля?",
    options: ["src", "href", "name", "alt"],
    answer: 2,
    hint: "PHP обращается к данным по ключу: $_GET[\"name\"].",
    explanation: "Атрибут name становится ключом в $_GET или $_POST.",
  },
  {
    id: 4,
    chapter: 1,
    title: "Маршрут в другой файл",
    story: "Нике нужно отправить форму не в текущий файл, а в отдельный обработчик action.php.",
    type: "text",
    question: "Впиши атрибут формы, который указывает файл-обработчик: <form ______=\"action.php\" method=\"post\">",
    answers: ["action"],
    hint: "В уроке был пример: form action=\"action.php\" method=\"post\".",
    explanation: "action задает адрес скрипта, который обработает форму.",
  },
  {
    id: 5,
    chapter: 1,
    title: "Собери форму",
    story: "Первый сектор почти восстановлен. Осталось вписать недостающий фрагмент.",
    type: "text",
    question: "Впиши пропущенное слово: <form ______=\"get\">",
    answers: ["method"],
    hint: "Это атрибут, который выбирает GET или POST.",
    explanation: "Правильно: <form method=\"get\">.",
  },
  {
    id: 6,
    chapter: 2,
    title: "Видимый след",
    story: "Data Storm оставляет след прямо в адресной строке. Ника должна понять, какой метод это делает.",
    type: "text",
    question: "Впиши метод, который передает параметры прямо в URL.",
    answers: ["GET", "get"],
    hint: "В уроке после GET данные можно было увидеть в адресной ссылке.",
    explanation: "GET добавляет параметры в URL, например ?name=Ivan&age=45.",
  },
  {
    id: 7,
    chapter: 2,
    title: "Когда GET уместен",
    story: "Портал предлагает сохранить поисковый фильтр. Это не секретные данные, их удобно видеть в ссылке.",
    type: "single",
    question: "Для какого сценария GET подходит лучше всего?",
    options: ["Ввод пароля", "Номер банковской карты", "Поиск и фильтрация данных", "Смена пароля"],
    answer: 2,
    hint: "GET удобен для получения данных, которые можно кэшировать.",
    explanation: "GET хорош для получения информации: поиск, фильтры, страницы каталога.",
  },
  {
    id: 8,
    chapter: 2,
    title: "URL-параметр",
    story: "В адресной строке появился фрагмент: ?name=Ivan&age=45. Нужно расшифровать, что это значит.",
    type: "single",
    question: "Что означает age=45 в GET-запросе?",
    options: ["Имя файла", "Параметр age со значением 45", "Команду удаления", "Название базы данных"],
    answer: 1,
    hint: "Параметры GET записываются как ключ=значение.",
    explanation: "age - имя параметра, 45 - переданное значение.",
  },
  {
    id: 9,
    chapter: 2,
    title: "Секреты и GET",
    story: "Один модуль хочет отправить пароль через GET. Ника должна остановить ошибку.",
    type: "single",
    question: "Почему пароль не стоит отправлять через GET?",
    options: ["Он будет виден в адресной строке", "GET не работает с PHP", "GET удаляет форму", "GET всегда шифрует пароль"],
    answer: 0,
    hint: "Все, что находится в URL, проще увидеть и сохранить в истории.",
    explanation: "Пароли и конфиденциальные данные нельзя отправлять через видимые URL-параметры.",
  },
  {
    id: 10,
    chapter: 2,
    title: "Команда GET",
    story: "Нужно выбрать все свойства GET, чтобы открыть второй шлюз.",
    type: "multi",
    question: "Выбери свойства GET-запроса.",
    options: ["Параметры видны в URL", "Подходит для получения данных", "Идеален для паролей", "Можно использовать для поиска"],
    answer: [0, 1, 3],
    hint: "GET не для секретов, но удобен для получения информации.",
    explanation: "GET передает параметры в URL и подходит для поиска, фильтров и получения данных.",
  },
  {
    id: 11,
    chapter: 3,
    title: "Тело запроса",
    story: "Третий сектор требует отправить форму так, чтобы данные не показывались в URL.",
    type: "text",
    question: "Впиши метод, который отправляет данные в теле запроса.",
    answers: ["POST", "post"],
    hint: "В уроке POST предлагался для форм, где данные не должны быть в адресной строке.",
    explanation: "POST отправляет данные в теле запроса.",
  },
  {
    id: 12,
    chapter: 3,
    title: "Форма входа",
    story: "Ника проектирует форму логина. Пароль должен уйти безопаснее, чем через URL.",
    type: "single",
    question: "Какой метод лучше выбрать для формы входа?",
    options: ["GET", "POST", "Любой, разницы нет", "img"],
    answer: 1,
    hint: "Вход и регистрация отправляют чувствительные данные.",
    explanation: "Для формы входа лучше использовать POST.",
  },
  {
    id: 13,
    chapter: 3,
    title: "POST и кэш",
    story: "Система спрашивает, почему POST используют для данных, которые нельзя просто кэшировать.",
    type: "single",
    question: "Какая мысль лучше описывает POST?",
    options: ["Для отправки данных, которые не должны быть видны в URL", "Только для картинок", "Только для CSS", "Для замены базы данных"],
    answer: 0,
    hint: "POST часто используют для отправки форм на сервер.",
    explanation: "POST подходит для отправки форм и конфиденциальных данных.",
  },
  {
    id: 14,
    chapter: 3,
    title: "Синтаксис POST",
    story: "Нужно исправить форму, чтобы она отправляла данные методом POST.",
    type: "text",
    question: "Впиши значение атрибута: <form method=\"_____\">",
    answers: ["post"],
    hint: "Нужен метод, который не выводит данные в URL.",
    explanation: "Правильно: <form method=\"post\">.",
  },
  {
    id: 15,
    chapter: 3,
    title: "GET или POST",
    story: "Перед Никой три сценария. Нужно определить, где POST обязателен.",
    type: "multi",
    question: "Где лучше использовать POST?",
    options: ["Регистрация пользователя", "Отправка пароля", "Фильтр каталога по цвету", "Отправка комментария"],
    answer: [0, 1, 3],
    hint: "POST используют для отправки данных на сервер, особенно если данные не должны быть в URL.",
    explanation: "Регистрация, пароль и комментарий - это отправка данных. Фильтр каталога часто можно сделать через GET.",
  },
  {
    id: 16,
    chapter: 4,
    title: "Суперглобальный массив GET",
    story: "PHP-приемник ждет правильную команду, чтобы прочитать name из GET.",
    type: "text",
    question: "Впиши PHP-массив для GET: $name = ______[\"name\"];",
    answers: ["$_GET", "GET", "$_get"],
    hint: "В PHP он начинается со знака доллара и подчеркивания.",
    explanation: "Правильно: $_GET[\"name\"].",
  },
  {
    id: 17,
    chapter: 4,
    title: "Суперглобальный массив POST",
    story: "Форма отправлена через POST. Нике нужно прочитать возраст.",
    type: "text",
    question: "Впиши PHP-массив: $age = ______[\"age\"];",
    answers: ["$_POST", "POST", "$_post"],
    hint: "POST-данные в PHP берутся из массива с названием метода.",
    explanation: "Правильно: $_POST[\"age\"].",
  },
  {
    id: 18,
    chapter: 4,
    title: "Ключ массива",
    story: "В форме есть input name=\"age\". Нужно понять, какой ключ будет в PHP.",
    type: "single",
    question: "Какой ключ нужно использовать в $_GET или $_POST?",
    options: ["input", "age", "text", "submit"],
    answer: 1,
    hint: "Ключ совпадает с атрибутом name поля.",
    explanation: "Если поле называется name=\"age\", то значение читается по ключу \"age\".",
  },
  {
    id: 19,
    chapter: 4,
    title: "Доступность массива",
    story: "В интерфейсе написано: суперглобальный массив. Ника должна объяснить, что это значит.",
    type: "single",
    question: "Что означает суперглобальный массив в контексте урока?",
    options: ["Он доступен в PHP-скрипте без отдельного подключения", "Он работает только в CSS", "Он хранится только в браузере", "Он удаляет данные формы"],
    answer: 0,
    hint: "В уроке сказано, что $_GET доступен везде для получения данных GET-запроса.",
    explanation: "$_GET и $_POST доступны в PHP для чтения данных запроса.",
  },
  {
    id: 20,
    chapter: 4,
    title: "Свяжи форму и PHP",
    story: "Форма отправляет name и age. Нужно выбрать строки, которые получают оба значения.",
    type: "multi",
    question: "Какие строки корректно читают данные формы?",
    options: ["$name = $_GET[\"name\"];", "$age = $_POST[\"age\"];", "$name = GET.name;", "$age = input.age;"],
    answer: [0, 1],
    hint: "В PHP используется синтаксис массива с квадратными скобками.",
    explanation: "Данные читают через $_GET[\"name\"] или $_POST[\"age\"], в зависимости от метода формы.",
  },
  {
    id: 21,
    chapter: 5,
    title: "Враждебный ввод",
    story: "Data Storm подсовывает в поле логина подозрительную строку. Это уже не просто имя.",
    type: "single",
    question: "Как называется атака через вредный SQL-запрос в поле ввода?",
    options: ["CSS shadow", "SQL injection", "HTML align", "Cookie snack"],
    answer: 1,
    hint: "В уроке это называлось SQL-инъекцией.",
    explanation: "SQL injection - внедрение SQL-кода через пользовательский ввод.",
  },
  {
    id: 22,
    chapter: 5,
    title: "Ошибка доверия",
    story: "Старый модуль сразу вставляет данные формы в SQL-запрос. Ника должна отметить риск.",
    type: "single",
    question: "Почему нельзя слепо доверять тексту из формы?",
    options: ["Пользователь может ввести вредный SQL-фрагмент", "Форма всегда пустая", "PHP не умеет читать строки", "База данных не хранит текст"],
    answer: 0,
    hint: "Любое поле ввода может принять не только обычное имя.",
    explanation: "Данные из формы нужно проверять и защищать перед SQL-запросом.",
  },
  {
    id: 23,
    chapter: 5,
    title: "Экранирование",
    story: "На панели защиты есть функция, которая убирает опасные спецсимволы.",
    type: "text",
    question: "Впиши функцию, которая помогает экранировать ввод перед работой с MySQL.",
    answers: ["mysqli_real_escape_string", "mysqli_real_escape_string()"],
    hint: "Название начинается с mysqli и связано со строкой.",
    explanation: "mysqli_real_escape_string($conn, ...) экранирует специальные символы.",
  },
  {
    id: 24,
    chapter: 5,
    title: "Что проверять первым",
    story: "Перед сохранением данных Ника ставит первый фильтр.",
    type: "single",
    question: "Что нужно проверять перед обработкой обязательных полей?",
    options: ["Что они не пустые", "Что они желтого цвета", "Что у них есть картинка", "Что они написаны большими буквами"],
    answer: 0,
    hint: "Пустые значения могут привести к ошибкам и уязвимостям.",
    explanation: "Обязательные поля должны быть заполнены.",
  },
  {
    id: 25,
    chapter: 5,
    title: "Четыре защитных правила",
    story: "Чтобы закрыть сектор инъекций, выбери рабочие методы защиты из урока.",
    type: "multi",
    question: "Какие меры повышают безопасность обработки POST-запроса?",
    options: ["Проверка пустых полей", "Хэширование паролей", "Использование сессий", "Сохранение пароля в URL"],
    answer: [0, 1, 2],
    hint: "Один вариант здесь явно опасен.",
    explanation: "Проверки, хэши и сессии помогают. Пароль в URL хранить нельзя.",
  },
  {
    id: 26,
    chapter: 6,
    title: "Пароль в базе",
    story: "В старой базе лежат обычные пароли. Это главный пробой в щите.",
    type: "single",
    question: "Почему нельзя хранить пароль обычным текстом?",
    options: ["При утечке базы пароли сразу станут известны", "PHP перестанет работать", "Cookies исчезнут", "GET станет POST"],
    answer: 0,
    hint: "Если злоумышленник получил базу, обычный текст читается сразу.",
    explanation: "В базе нужно хранить хэш, а не исходный пароль.",
  },
  {
    id: 27,
    chapter: 6,
    title: "Что хранить",
    story: "Ника заменяет колонку password на безопасное значение.",
    type: "single",
    question: "Что нужно сохранять в базе вместо пароля?",
    options: ["Хэш пароля", "Подсказку к паролю", "Пароль в URL", "Случайный заголовок"],
    answer: 0,
    hint: "Хэш - результат преобразования пароля.",
    explanation: "В базе сохраняют хэш пароля.",
  },
  {
    id: 28,
    chapter: 6,
    title: "Свойство хэша",
    story: "Система объясняет хэш как преобразование в бессмысленный набор символов.",
    type: "single",
    question: "Что такое хэширование в этом уроке?",
    options: ["Преобразование информации в хэш-код", "Отправка формы через GET", "Удаление cookie", "Создание HTML-заголовка"],
    answer: 0,
    hint: "Хэш выглядит как набор символов, не похожий на исходный пароль.",
    explanation: "Хэширование превращает пароль в защищенный хэш-код.",
  },
  {
    id: 29,
    chapter: 6,
    title: "Почему дата рождения плохая",
    story: "На экране появляется предупреждение про простой пароль.",
    type: "single",
    question: "Почему слабый пароль опасен даже при хэшировании?",
    options: ["Его могут попробовать угадать простой подстановкой", "Он не помещается в форму", "Он всегда становится GET", "Он удаляет базу"],
    answer: 0,
    hint: "В уроке упоминалась дата рождения как пример ненадежного пароля.",
    explanation: "Слабый пароль легче подобрать, поэтому нужен надежный пароль и хэширование.",
  },
  {
    id: 30,
    chapter: 6,
    title: "Парольный протокол",
    story: "Чтобы пройти шлюз, нужно выбрать все верные утверждения о хранении паролей.",
    type: "multi",
    question: "Какие утверждения верны?",
    options: ["Пароль нельзя хранить обычным текстом", "В базе лучше хранить хэш", "Хэш нужен для безопасности", "Пароль безопасно хранить в GET-ссылке"],
    answer: [0, 1, 2],
    hint: "GET-ссылка не подходит для секретов.",
    explanation: "Пароли хранят как хэш, а не как текст и не в URL.",
  },
  {
    id: 31,
    chapter: 7,
    title: "Создание хэша",
    story: "Ника запускает генератор хэшей. Нужно назвать PHP-функцию.",
    type: "text",
    question: "Впиши функцию, которая создает хэш пароля в PHP.",
    answers: ["password_hash", "password_hash()"],
    hint: "Название буквально означает хэш пароля.",
    explanation: "password_hash() создает безопасный хэш пароля.",
  },
  {
    id: 32,
    chapter: 7,
    title: "Алгоритм по умолчанию",
    story: "В коде стоит PASSWORD_DEFAULT. Система спрашивает, нужно ли менять его вручную.",
    type: "single",
    question: "Что делать с PASSWORD_DEFAULT по материалу урока?",
    options: ["Можно не менять", "Всегда заменить на GET", "Удалить из кода", "Поставить cookie"],
    answer: 0,
    hint: "В уроке прямо сказано: PASSWORD_DEFAULT можно не менять.",
    explanation: "PASSWORD_DEFAULT использует современный алгоритм по умолчанию.",
  },
  {
    id: 33,
    chapter: 7,
    title: "Проверка пароля",
    story: "Пользователь вводит пароль. Нужно проверить его с хэшем из базы.",
    type: "text",
    question: "Впиши функцию, которая проверяет пароль на корректность.",
    answers: ["password_verify", "password_verify()"],
    hint: "verify означает проверять.",
    explanation: "password_verify($password_entered, $hashed_password) проверяет пароль.",
  },
  {
    id: 34,
    chapter: 7,
    title: "Соль",
    story: "Два хэша не совпали визуально. Ника вспоминает, что функция добавляет соль.",
    type: "single",
    question: "Почему нельзя просто сравнивать два новых хэша одного пароля?",
    options: ["Из-за соли хэши могут быть разными", "Потому что PHP не умеет сравнивать строки", "Потому что GET быстрее", "Потому что cookie мешает"],
    answer: 0,
    hint: "Соль усложняет хэширование и делает защиту надежнее.",
    explanation: "password_hash() добавляет соль, поэтому для проверки используют password_verify().",
  },
  {
    id: 35,
    chapter: 7,
    title: "Собери проверку",
    story: "В коде пропущено имя функции. Нужно открыть парольный шлюз.",
    type: "text",
    question: "Впиши функцию: if (________($password_entered, $hashed_password))",
    answers: ["password_verify", "password_verify()"],
    hint: "Это функция проверки пароля, а не создания хэша.",
    explanation: "Правильно: password_verify($password_entered, $hashed_password).",
  },
  {
    id: 36,
    chapter: 8,
    title: "Cookie-файл",
    story: "Портал хочет помнить пользователя между запросами.",
    type: "single",
    question: "Что такое cookie по материалу урока?",
    options: ["Небольшие данные, сохраняемые у пользователя", "SQL-таблица", "Функция хэширования", "Название метода формы"],
    answer: 0,
    hint: "Cookies сохраняются на компьютере пользователя.",
    explanation: "Cookie - небольшое значение, которое браузер хранит и отправляет серверу.",
  },
  {
    id: 37,
    chapter: 8,
    title: "Создать cookie",
    story: "Ника создает временную метку пользователя на один час.",
    type: "text",
    question: "Впиши функцию, которая создает cookie в PHP.",
    answers: ["setcookie", "setcookie()"],
    hint: "Название функции начинается со слова set.",
    explanation: "setcookie(\"username\", \"John Doe\", time()+3600) создает cookie.",
  },
  {
    id: 38,
    chapter: 8,
    title: "Прочитать cookie",
    story: "Портал уже сохранил username. Нужно получить его в PHP.",
    type: "text",
    question: "Впиши массив: $username = ______[\"username\"];",
    answers: ["$_COOKIE", "COOKIE", "$_cookie"],
    hint: "Cookie читают через суперглобальный массив.",
    explanation: "Правильно: $_COOKIE[\"username\"].",
  },
  {
    id: 39,
    chapter: 8,
    title: "Проверка существования",
    story: "Перед чтением cookie Ника проверяет, существует ли она.",
    type: "text",
    question: "Впиши функцию, которая проверяет, существует ли cookie.",
    answers: ["isset", "isset()"],
    hint: "В уроке: isset() возвращает true, если cookie есть.",
    explanation: "isset($_COOKIE[\"user\"]) проверяет наличие cookie.",
  },
  {
    id: 40,
    chapter: 8,
    title: "Связанные таблицы",
    story: "Последний сектор: база интернет-магазина. Заказ должен знать пользователя и продукт.",
    type: "multi",
    question: "Какие поля в orders/comments могут быть внешними ключами?",
    options: ["user_id", "product_id", "text", "comment_date"],
    answer: [0, 1],
    hint: "Внешний ключ связывает одну таблицу с другой через ID.",
    explanation: "user_id и product_id связывают заказы/комментарии с пользователями и товарами.",
  },
];

const STORY_BEATS = [
  "Ника спускается в нижний слой портала. Первый шлюз пустой, но на стекле интерфейса мерцает форма: если понять, как она отправляет данные, городская сеть снова услышит агента.",
  "Шлюз открывает два маршрута передачи. Один ведет через адресную строку, другой скрывает данные в теле запроса. Нике нужно выбрать правильный механизм.",
  "На полу вспыхивают имена полей. Сервер видит только то, что форма подписала правильно, поэтому Ника ищет ключ, по которому PHP сможет забрать значение.",
  "Система показывает файл action.php как удаленный пункт приема. Ника должна перенаправить форму к нужному обработчику и не потерять данные по дороге.",
  "Первый контур почти собран. Остался один пропуск в теге формы: правильное слово активирует канал передачи и снимает блокировку сектора.",
  "Ника видит след запроса прямо в адресной строке. Это удобно для поиска и фильтров, но опасно для секретов: нужно распознать метод по его следу.",
  "В архиве портала лежит поисковый фильтр. Он не содержит паролей, значит его можно превратить в ссылку и быстро повторять запрос.",
  "На экране появляется строка ?name=Ivan&age=45. Ника разбирает ее как карту: каждый параметр имеет имя и значение.",
  "Один поврежденный модуль пытается отправить пароль через URL. Ника останавливает процесс до того, как секрет попадет в историю браузера.",
  "GET-сектор закрыт набором утверждений. Чтобы пройти дальше, нужно отделить полезные свойства GET от опасных применений.",
  "В следующем тоннеле данные должны уйти без видимого следа в URL. Ника переключает канал на POST и готовит форму входа.",
  "Форма логина светится красным: пароль нельзя показывать в адресной строке. Ника выбирает метод, который передает данные в теле запроса.",
  "Портал спрашивает, зачем POST нужен в реальных проектах. Ника собирает объяснение: формы, отправка данных и меньше лишней видимости.",
  "В коде формы не хватает значения method. Ника вводит короткую команду, и маршрут запроса перестраивается на безопасный режим.",
  "Перед Никой три сценария: регистрация, пароль, каталог и комментарий. Нужно понять, где POST действительно обязателен.",
  "PHP-приемник включается. Ника должна назвать суперглобальный массив, из которого сервер прочитает параметр GET.",
  "Теперь данные пришли через POST. На панели виден возраст пользователя, но PHP найдет его только через правильный массив.",
  "В форме есть input name=\"age\". Ника связывает это имя с ключом массива, чтобы значение не потерялось при обработке.",
  "Скрипт должен вывести ответ пользователю. Ника соединяет полученные name и age с echo, но не забывает, откуда пришли данные.",
  "Перед аркадным шлюзом Ника проверяет главное: GET и POST доступны в PHP через разные суперглобальные массивы.",
  "Data Storm открывает окно SQL-инъекции. В поле ввода можно подложить не обычный логин, а кусок запроса к базе.",
  "Ника видит кавычки и странный SQL-фрагмент. Если строку не обработать, чужая команда может попасть внутрь запроса.",
  "Защитный модуль просит выбрать функцию экранирования. Она убирает опасную силу специальных символов перед работой с MySQL.",
  "Система напоминает: соединение с базой уже создано. Без него функция защиты не поймет, по каким правилам экранировать строку.",
  "Нужно укрепить форму целиком. Ника выбирает набор мер: проверка пустых полей, экранирование, хеши, сессии и осторожность с URL.",
  "В старой базе лежат обычные пароли. Если базу украдут, все секреты сразу станут видны. Ника меняет правило хранения.",
  "Пароль больше не должен жить в базе как текст. Вместо него портал сохраняет результат преобразования, который нельзя просто прочитать.",
  "Ника объясняет хеширование: на входе пароль, на выходе набор символов. Для одинакового входа система умеет проверить результат.",
  "Слабый пароль остается слабым даже после хеша. Дата рождения легко угадывается, поэтому защита начинается с нормального пароля.",
  "Парольный сектор закрыт финальным протоколом. Нужно выбрать все верные правила хранения паролей и не пропустить опасный вариант.",
  "Ника запускает генератор хешей. В PHP есть специальная функция, которая сразу применяет современный алгоритм.",
  "В коде появляется PASSWORD_DEFAULT. Ника оставляет его как безопасный выбор по умолчанию и не заменяет на случайные костыли.",
  "Пользователь вводит пароль. Ника не сравнивает два новых хеша напрямую, а вызывает функцию проверки с сохраненным хешем.",
  "Два хеша одного пароля выглядят по-разному. Соль усложняет атаку, поэтому проверку выполняет специальная функция.",
  "В условии if пропало имя функции. Если Ника восстановит password_verify, шлюз паролей окончательно закроется.",
  "Финальный блок хранит небольшие следы браузера. Cookies помогают помнить пользователя, настройки и состояние между запросами.",
  "Ника создает временную cookie на один час. В PHP для этого есть функция, которая задает имя, значение и время жизни.",
  "Cookie уже лежит у пользователя. Чтобы прочитать ее на сервере, Ника обращается к отдельному суперглобальному массиву.",
  "Перед чтением cookie портал требует проверку: существует ли значение. Ника использует короткую функцию, которая возвращает true при наличии данных.",
  "Последний сектор показывает базу интернет-магазина. Заказы и комментарии должны ссылаться на пользователей и товары через внешние ключи.",
];

const ARCADES = {
  20: {
    kicker: "Аркадный шлюз 01",
    title: "Нейро-трасса пакетов",
    story: "Половина протокола собрана. Чтобы перейти к SQL-защите и паролям, проведи три импульса через неоновую матрицу в указанном порядке.",
    reward: 250,
    labels: ["GET", "URL", "POST", "FORM", "PHP", "DB", "KEY", "ECHO", "SAFE"],
    rounds: [[0, 3, 4, 7], [2, 4, 5, 8], [6, 3, 2, 4, 5]],
  },
  40: {
    kicker: "Финальный аркадный шлюз",
    title: "Ядро Кодового Щита",
    story: "Все 40 замков вскрыты. Осталось синхронизировать ядро: нажми сигналы в правильном порядке и запусти финальную защиту портала.",
    reward: 500,
    labels: ["HASH", "SALT", "AUTH", "SQL", "COOKIE", "FORM", "USER", "ORDER", "CORE"],
    rounds: [[0, 1, 2, 8], [3, 5, 4, 6], [6, 7, 4, 8, 0]],
  },
};

const els = {
  startScreen: document.querySelector("#startScreen"),
  transmissionScreen: document.querySelector("#transmissionScreen"),
  gameScreen: document.querySelector("#gameScreen"),
  arcadeScreen: document.querySelector("#arcadeScreen"),
  finishScreen: document.querySelector("#finishScreen"),
  startButton: document.querySelector("#startButton"),
  continueButton: document.querySelector("#continueButton"),
  levelBadge: document.querySelector("#levelBadge"),
  scoreBadge: document.querySelector("#scoreBadge"),
  scoreRing: document.querySelector("#scoreRing"),
  shieldBadge: document.querySelector("#shieldBadge"),
  musicButton: document.querySelector("#musicButton"),
  chapterLabel: document.querySelector("#chapterLabel"),
  progressPercent: document.querySelector("#progressPercent"),
  progressBar: document.querySelector("#progressBar"),
  chapterMap: document.querySelector("#chapterMap"),
  questChapter: document.querySelector("#questChapter"),
  questTitle: document.querySelector("#questTitle"),
  questStory: document.querySelector("#questStory"),
  questQuestion: document.querySelector("#questQuestion"),
  answerArea: document.querySelector("#answerArea"),
  answerForm: document.querySelector("#answerForm"),
  hintBox: document.querySelector("#hintBox"),
  feedbackBox: document.querySelector("#feedbackBox"),
  hintButton: document.querySelector("#hintButton"),
  checkButton: document.querySelector("#checkButton"),
  nextButton: document.querySelector("#nextButton"),
  resetButton: document.querySelector("#resetButton"),
  restartButton: document.querySelector("#restartButton"),
  finishText: document.querySelector("#finishText"),
  rankText: document.querySelector("#rankText"),
  finalScoreText: document.querySelector("#finalScoreText"),
  accessDialog: document.querySelector("#accessDialog"),
  accessCode: document.querySelector("#accessCode"),
  accessApply: document.querySelector("#accessApply"),
  brandButton: document.querySelector("#brandButton"),
  canvas: document.querySelector("#stormCanvas"),
  transmissionKicker: document.querySelector("#transmissionKicker"),
  transmissionTitle: document.querySelector("#transmissionTitle"),
  transmissionText: document.querySelector("#transmissionText"),
  transmissionNext: document.querySelector("#transmissionNext"),
  arcadeKicker: document.querySelector("#arcadeKicker"),
  arcadeTitle: document.querySelector("#arcadeTitle"),
  arcadeStory: document.querySelector("#arcadeStory"),
  arcadeSequence: document.querySelector("#arcadeSequence"),
  arcadeBoard: document.querySelector("#arcadeBoard"),
  arcadeFeedback: document.querySelector("#arcadeFeedback"),
  arcadeContinue: document.querySelector("#arcadeContinue"),
  questCard: document.querySelector(".quest-card"),
  arcadePanel: document.querySelector("#arcadeScreen"),
  screenFx: document.querySelector("#screenFx"),
  comboToast: document.querySelector("#comboToast"),
};

let state = loadState();
let currentAnswered = false;
let currentHintUsed = false;
let currentAttempts = 0;
let streak = 0;
let typing = {
  timer: null,
  closeTimer: null,
  text: "",
  index: 0,
  done: null,
  autoClose: false,
};
let arcadeRuntime = null;
let audio = {
  ctx: null,
  timer: null,
  enabled: false,
  step: 0,
  master: null,
};

function defaultState() {
  return {
    started: false,
    index: 0,
    score: 0,
    hints: 0,
    completed: [],
    seenBriefs: [],
    arcadesCompleted: [],
  };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || !Number.isInteger(saved.index)) return defaultState();
    return {
      ...defaultState(),
      ...saved,
      index: Math.max(0, Math.min(saved.index, QUESTS.length)),
      score: Math.max(0, Number(saved.score) || 0),
      hints: Math.max(0, Number(saved.hints) || 0),
      completed: Array.isArray(saved.completed) ? saved.completed : [],
      seenBriefs: Array.isArray(saved.seenBriefs) ? saved.seenBriefs : [],
      arcadesCompleted: Array.isArray(saved.arcadesCompleted) ? saved.arcadesCompleted : [],
    };
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function startGame() {
  state.started = true;
  if (state.index > QUESTS.length) state.index = 0;
  saveState();
  render();
}

function render() {
  renderShell();
  if (!state.started) {
    showOnly("start");
    return;
  }

  const arcadeStage = pendingArcadeStage();
  if (arcadeStage) {
    showOnly("arcade");
    renderArcade(arcadeStage);
    return;
  }

  if (state.index >= QUESTS.length) {
    renderFinish();
    showOnly("finish");
    return;
  }

  showOnly("game");
  renderQuest();
}

function showOnly(screen) {
  els.startScreen.classList.toggle("hidden", screen !== "start");
  els.gameScreen.classList.toggle("hidden", screen !== "game");
  els.arcadeScreen.classList.toggle("hidden", screen !== "arcade");
  els.finishScreen.classList.toggle("hidden", screen !== "finish");
}

function pendingArcadeStage() {
  if (state.index === 20 && !state.arcadesCompleted.includes(20)) return 20;
  if (state.index >= QUESTS.length && !state.arcadesCompleted.includes(40)) return 40;
  return null;
}

function renderShell() {
  const level = Math.min(state.index + 1, QUESTS.length);
  const maxScore = QUESTS.length * 100 + ARCADES[20].reward + ARCADES[40].reward;
  const shield = Math.min(100, Math.round((state.score / maxScore) * 100));
  els.levelBadge.textContent = `${String(level).padStart(2, "0")} / ${QUESTS.length}`;
  els.scoreBadge.textContent = state.score.toLocaleString("ru-RU");
  els.shieldBadge.textContent = `${shield}%`;
  els.scoreRing.style.setProperty("--score-angle", `${Math.round((shield / 100) * 360)}deg`);
  if (renderShell.lastScore !== undefined && renderShell.lastScore !== state.score) {
    replayMotion(els.scoreRing, "score-pulse");
  }
  renderShell.lastScore = state.score;
}

function renderChapters(currentChapter) {
  els.chapterMap.innerHTML = "";
  CHAPTERS.forEach((chapter, i) => {
    const number = i + 1;
    const li = document.createElement("li");
    li.textContent = `${number}. ${chapter}`;
    const firstIndex = QUESTS.findIndex((q) => q.chapter === number);
    const lastIndex = QUESTS.map((q) => q.chapter).lastIndexOf(number);
    if (number === currentChapter) li.classList.add("active");
    if (lastIndex < state.index) li.classList.add("done");
    if (firstIndex > state.index) li.setAttribute("aria-disabled", "true");
    els.chapterMap.append(li);
  });
}

function renderQuest() {
  const quest = QUESTS[state.index];
  currentAnswered = false;
  currentHintUsed = false;
  currentAttempts = 0;
  replayMotion(els.questCard, "panel-flash");

  const progress = Math.round((state.index / QUESTS.length) * 100);
  els.chapterLabel.textContent = `Глава ${quest.chapter}: ${CHAPTERS[quest.chapter - 1]}`;
  els.progressPercent.textContent = `${progress}%`;
  els.progressBar.style.width = `${progress}%`;
  renderChapters(quest.chapter);

  els.questChapter.textContent = `Сектор ${String(state.index + 1).padStart(2, "0")} | ${CHAPTERS[quest.chapter - 1]}`;
  els.questTitle.textContent = quest.title;
  els.questStory.textContent = quest.story;
  els.questQuestion.textContent = quest.question;
  els.hintBox.classList.add("hidden");
  els.hintBox.textContent = "";
  els.feedbackBox.className = "feedback-box hidden";
  els.feedbackBox.textContent = "";
  els.checkButton.classList.remove("hidden");
  els.hintButton.classList.remove("hidden");
  els.nextButton.classList.add("hidden");

  renderAnswerArea(quest);
  maybeShowTransmission();
}

function maybeShowTransmission() {
  const briefId = state.index + 1;
  if (!QUESTS[state.index] || state.seenBriefs.includes(briefId)) return;
  const quest = QUESTS[state.index];
  showTransmission({
    kicker: `Передача Ники / сектор ${String(briefId).padStart(2, "0")}`,
    title: quest.title,
    text: STORY_BEATS[state.index] || quest.story,
    onDone: () => {
      if (!state.seenBriefs.includes(briefId)) {
        state.seenBriefs.push(briefId);
        saveState();
      }
    },
  });
}

function showTransmission({ kicker, title, text, onDone, autoClose = false, celebrate = false }) {
  window.clearInterval(typing.timer);
  window.clearTimeout(typing.closeTimer);
  typing = { timer: null, closeTimer: null, text, index: 0, done: onDone, autoClose };
  els.transmissionKicker.textContent = kicker;
  els.transmissionTitle.textContent = title;
  els.transmissionText.textContent = "";
  els.transmissionNext.textContent = "Расшифровать";
  els.transmissionNext.classList.toggle("hidden", autoClose);
  els.transmissionScreen.classList.toggle("celebration", celebrate);
  els.transmissionScreen.classList.remove("hidden");
  typing.timer = window.setInterval(() => {
    typing.index += 1;
    let display = typing.text.slice(0, typing.index);
    if (typing.index < typing.text.length) {
      display += String.fromCharCode(33 + Math.floor(Math.random() * 94));
      if (typing.index + 1 < typing.text.length) {
        display += String.fromCharCode(33 + Math.floor(Math.random() * 94));
      }
    }
    els.transmissionText.textContent = display;
    if (typing.index >= typing.text.length) finishTyping();
  }, 18);
}

function finishTyping() {
  window.clearInterval(typing.timer);
  typing.timer = null;
  els.transmissionText.textContent = typing.text;
  els.transmissionNext.textContent = "Войти в сектор";
  if (typing.autoClose) {
    typing.closeTimer = window.setTimeout(closeTransmission, 1200);
  }
}

function closeTransmission() {
  if (typing.timer) {
    finishTyping();
    return;
  }
  window.clearTimeout(typing.closeTimer);
  els.transmissionScreen.classList.add("hidden");
  els.transmissionScreen.classList.remove("celebration");
  els.transmissionNext.classList.remove("hidden");
  if (typing.done) typing.done();
  typing.done = null;
  typing.autoClose = false;
}

function renderAnswerArea(quest) {
  els.answerArea.innerHTML = "";
  if (quest.type === "single" || quest.type === "multi") {
    const list = document.createElement("div");
    list.className = "answer-list";
    quest.options.forEach((option, i) => {
      const label = document.createElement("label");
      label.className = "answer-option";
      label.style.setProperty("--i", i);
      const input = document.createElement("input");
      input.type = quest.type === "single" ? "radio" : "checkbox";
      input.name = "answer";
      input.value = String(i);
      const span = document.createElement("span");
      span.textContent = option;
      label.append(input, span);
      list.append(label);
    });
    els.answerArea.append(list);
    return;
  }

  const input = document.createElement("input");
  input.className = "text-answer";
  input.name = "answer";
  input.autocomplete = "off";
  input.placeholder = "Впиши ответ здесь";
  els.answerArea.append(input);
  window.setTimeout(() => input.focus(), 30);
}

function selectedAnswer(quest) {
  if (quest.type === "single") {
    const checked = els.answerArea.querySelector("input:checked");
    return checked ? Number(checked.value) : null;
  }
  if (quest.type === "multi") {
    return [...els.answerArea.querySelectorAll("input:checked")].map((input) => Number(input.value)).sort((a, b) => a - b);
  }
  return normalize(els.answerArea.querySelector("input")?.value || "");
}

function normalize(value) {
  return String(value)
    .trim()
    .replace(/\s+/g, "")
    .replace(/;$/g, "")
    .toLowerCase();
}

function isAccessToken(value) {
  const code = String(value).trim();
  if (!/^\d+$/.test(code) || code.length !== ACCESS_SIZE) return false;
  const signature = [...code].reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 1), 0);
  return signature === ACCESS_SIGNATURE;
}

function isCorrect(quest, answer) {
  if (quest.type === "single") return answer === quest.answer;
  if (quest.type === "multi") return JSON.stringify(answer) === JSON.stringify([...quest.answer].sort((a, b) => a - b));
  return quest.answers.map(normalize).includes(answer);
}

function showHint() {
  if (currentAnswered) return;
  const quest = QUESTS[state.index];
  if (!currentHintUsed) {
    currentHintUsed = true;
    state.hints += 1;
    saveState();
  }
  els.hintBox.textContent = `Подсказка: ${quest.hint}`;
  els.hintBox.classList.remove("hidden");
}

function checkAnswer() {
  if (currentAnswered) return;
  const quest = QUESTS[state.index];
  const answer = selectedAnswer(quest);
  if (answer === null || (Array.isArray(answer) && answer.length === 0) || answer === "") {
    showFeedback("wrong", "Нужно выбрать или вписать ответ.");
    return;
  }

  if (isCorrect(quest, answer)) {
    currentAnswered = true;
    const base = currentHintUsed ? 70 : 100;
    const attemptPenalty = Math.min(currentAttempts * 10, 30);
    const gained = Math.max(40, base - attemptPenalty);
    state.score += gained;
    if (!state.completed.includes(quest.id)) state.completed.push(quest.id);
    saveState();
    renderShell();
    showFeedback("correct", `Верно. +${gained} очков. ${quest.explanation}`);
    streak += 1;
    triggerScreenFx("correct");
    createSparkBurst("correct", 16);
    showComboToast(`+${gained} / серия ${streak}`);
    completeCurrent();
    playBlip("correct");
  } else {
    currentAttempts += 1;
    streak = 0;
    state.score = Math.max(0, state.score - 10);
    saveState();
    renderShell();
    showFeedback("wrong", "Пока нет. -10 очков. Попробуй еще раз или возьми подсказку.");
    triggerScreenFx("wrong");
    createSparkBurst("wrong", 9);
    playBlip("wrong");
  }
}

function showFeedback(type, message) {
  els.feedbackBox.className = `feedback-box ${type}`;
  els.feedbackBox.textContent = message;
}

function triggerScreenFx(type) {
  els.screenFx.className = `screen-fx ${type}`;
  if (type === "wrong") {
    document.body.classList.remove("camera-shake");
    void document.body.offsetWidth;
    document.body.classList.add("camera-shake");
  }
  window.clearTimeout(triggerScreenFx.timer);
  triggerScreenFx.timer = window.setTimeout(() => {
    els.screenFx.className = "screen-fx";
  }, type === "wrong" ? 480 : 760);
}

function createSparkBurst(type = "correct", count = 14) {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const burst = document.createElement("div");
  burst.className = `spark-burst ${type}`;
  for (let i = 0; i < count; i += 1) {
    const spark = document.createElement("span");
    const angle = (360 / count) * i + Math.random() * 18 - 9;
    const distance = 74 + Math.random() * 104;
    const size = 3 + Math.random() * 6;
    const color = type === "wrong"
      ? "var(--red)"
      : i % 5 === 0
        ? "var(--yellow)"
        : i % 3 === 0
          ? "var(--cyan)"
          : "var(--green)";
    spark.style.setProperty("--angle", `${angle}deg`);
    spark.style.setProperty("--distance", `${distance}px`);
    spark.style.setProperty("--spark-size", `${size}px`);
    spark.style.setProperty("--spark-color", color);
    burst.append(spark);
  }
  document.body.append(burst);
  window.setTimeout(() => burst.remove(), type === "wrong" ? 560 : 920);
}

function replayMotion(element, className) {
  if (!element) return;
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function showComboToast(text) {
  els.comboToast.textContent = text;
  els.comboToast.classList.remove("hidden");
  els.comboToast.style.animation = "none";
  void els.comboToast.offsetWidth;
  els.comboToast.style.animation = "";
  window.clearTimeout(showComboToast.timer);
  showComboToast.timer = window.setTimeout(() => {
    els.comboToast.classList.add("hidden");
  }, 1100);
}

function completeCurrent() {
  els.checkButton.classList.add("hidden");
  els.hintButton.classList.add("hidden");
  els.nextButton.classList.remove("hidden");
}

function nextQuest() {
  if (state.index < QUESTS.length) {
    state.index += 1;
    saveState();
  }
  render();
}

function renderArcade(stage) {
  const config = ARCADES[stage];
  if (!arcadeRuntime || arcadeRuntime.stage !== stage) {
    arcadeRuntime = { stage, round: 0, step: 0, locked: false, hits: [] };
  }
  replayMotion(els.arcadePanel, "panel-flash");
  const sequence = config.rounds[arcadeRuntime.round];
  els.levelBadge.textContent = stage === 20 ? "ARCADE 01" : "FINAL";
  els.arcadeKicker.textContent = config.kicker;
  els.arcadeTitle.textContent = config.title;
  els.arcadeStory.textContent = config.story;
  els.arcadeFeedback.className = "feedback-box hidden";
  els.arcadeContinue.classList.add("hidden");
  renderArcadeSequence(config, sequence);
  renderArcadeBoard(config, sequence);
}

function renderArcadeSequence(config, sequence) {
  els.arcadeSequence.innerHTML = "";
  sequence.forEach((cellIndex, i) => {
    const chip = document.createElement("span");
    chip.textContent = config.labels[cellIndex];
    if (i < arcadeRuntime.step) chip.classList.add("done");
    els.arcadeSequence.append(chip);
  });
}

function renderArcadeBoard(config, sequence) {
  els.arcadeBoard.innerHTML = "";
  config.labels.forEach((label, i) => {
    const button = document.createElement("button");
    button.className = "arcade-node";
    button.type = "button";
    button.textContent = label;
    if (i === sequence[arcadeRuntime.step]) button.classList.add("target");
    if (arcadeRuntime.hits.includes(i)) button.classList.add("hit");
    button.addEventListener("click", () => handleArcadeClick(i));
    els.arcadeBoard.append(button);
  });
}

function handleArcadeClick(index) {
  if (!arcadeRuntime || arcadeRuntime.locked) return;
  const config = ARCADES[arcadeRuntime.stage];
  const sequence = config.rounds[arcadeRuntime.round];
  const expected = sequence[arcadeRuntime.step];
  if (index !== expected) {
    state.score = Math.max(0, state.score - 15);
    saveState();
    renderShell();
    arcadeRuntime.step = 0;
    arcadeRuntime.hits = [];
    showArcadeFeedback("wrong", "Импульс ушел не туда. -15 очков. Маршрут сброшен, попробуй эту цепочку еще раз.");
    renderArcadeSequence(config, sequence);
    renderArcadeBoard(config, sequence);
    triggerScreenFx("wrong");
    createSparkBurst("wrong", 9);
    playBlip("wrong");
    return;
  }

  arcadeRuntime.step += 1;
  arcadeRuntime.hits.push(index);
  renderArcadeSequence(config, sequence);
  renderArcadeBoard(config, sequence);
  triggerScreenFx("correct");
  createSparkBurst("correct", 8);
  playBlip("correct");

  if (arcadeRuntime.step < sequence.length) return;
  arcadeRuntime.round += 1;
  arcadeRuntime.step = 0;
  arcadeRuntime.hits = [];

  if (arcadeRuntime.round < config.rounds.length) {
    showArcadeFeedback("correct", `Цепочка ${arcadeRuntime.round} синхронизирована. Следующий импульс готов.`);
    window.setTimeout(() => renderArcade(arcadeRuntime.stage), 650);
    return;
  }

  completeArcade(config.reward);
}

function showArcadeFeedback(type, message) {
  els.arcadeFeedback.className = `feedback-box ${type}`;
  els.arcadeFeedback.textContent = message;
}

function completeArcade(reward = 0) {
  const stage = arcadeRuntime?.stage || pendingArcadeStage();
  if (!stage) return;
  if (!state.arcadesCompleted.includes(stage)) state.arcadesCompleted.push(stage);
  state.score += reward;
  saveState();
  renderShell();
  triggerScreenFx("correct");
  createSparkBurst("correct", 20);
  showComboToast(`Аркада +${reward}`);
  showArcadeFeedback("correct", stage === 40
    ? `Финальное ядро собрано. +${reward} очков. Ника запускает Кодовый Щит.`
    : `Аркадный шлюз пройден. +${reward} очков. Доступ ко второй половине миссии открыт.`);
  els.arcadeContinue.classList.remove("hidden");
  arcadeRuntime.locked = true;
}

function continueAfterArcade() {
  arcadeRuntime = null;
  render();
}

function correctAnswerLabel(quest) {
  if (!quest) return "";
  if (quest.type === "single") return quest.options[quest.answer];
  if (quest.type === "multi") return quest.answer.map((index) => quest.options[index]).join(", ");
  return quest.answers[0];
}

function accessAdvance() {
  if (!isAccessToken(els.accessCode.value)) {
    els.accessCode.value = "";
    els.accessCode.placeholder = "Не принято";
    playBlip("wrong");
    return;
  }
  state.started = true;
  const arcadeStage = pendingArcadeStage();
  const currentQuest = state.index < QUESTS.length ? QUESTS[state.index] : null;
  let transitionText = "";
  if (arcadeStage) {
    if (!state.arcadesCompleted.includes(arcadeStage)) state.arcadesCompleted.push(arcadeStage);
    transitionText = "Правильно. Шлюз синхронизирован, маршрут открыт. Переходим к следующему этапу миссии.";
  } else if (state.index < QUESTS.length) {
    if (!state.completed.includes(currentQuest.id)) state.completed.push(currentQuest.id);
    transitionText = `Правильно. Верный ответ: ${correctAnswerLabel(currentQuest)}. ${currentQuest.explanation} Переходим к следующему сектору.`;
    state.index += 1;
  } else {
    transitionText = "Правильно. Финальный протокол готов к запуску.";
  }
  saveState();
  els.accessCode.value = "";
  els.accessDialog.close();
  arcadeRuntime = null;
  showTransmission({
    kicker: "Сектор пройден",
    title: "Ответ принят",
    text: transitionText,
    autoClose: true,
    celebrate: true,
    onDone: render,
  });
  triggerScreenFx("correct");
  createSparkBurst("correct", 16);
  playBlip("correct");
}

function renderFinish() {
  const max = QUESTS.length * 100 + ARCADES[20].reward + ARCADES[40].reward;
  const percent = Math.round((state.score / max) * 100);
  const rank = percent >= 90
    ? "Архитектор Кодового Щита"
    : percent >= 75
      ? "Неоновый защитник данных"
      : percent >= 55
        ? "Стажер протокола безопасности"
        : "Исследователь веб-форм";
  els.rankText.textContent = rank;
  els.finalScoreText.textContent = `${state.score} из ${max} возможных очков`;
  els.finishText.textContent = "Ника закрывает последний шлюз, и над городом поднимается Кодовый Щит. Теперь ты понимаешь, как формы передают данные, когда выбирать GET или POST, как PHP читает запросы, почему опасна SQL-инъекция, зачем хешировать пароли и как cookies помогают сайту помнить состояние.";
  renderShell();
}

function resetProgress() {
  state = defaultState();
  localStorage.removeItem(STORAGE_KEY);
  arcadeRuntime = null;
  streak = 0;
  render();
}

function createMusic() {
  if (audio.ctx) return;
  audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
  audio.master = audio.ctx.createGain();
  audio.master.gain.value = 0.042;
  audio.master.connect(audio.ctx.destination);
}

function playNote(freq, duration = 0.14, type = "square", gain = 0.75) {
  if (!audio.enabled || !audio.ctx) return;
  const now = audio.ctx.currentTime;
  const osc = audio.ctx.createOscillator();
  const env = audio.ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(gain, now + 0.015);
  env.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(env);
  env.connect(audio.master);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function startMusic() {
  createMusic();
  audio.ctx.resume();
  audio.enabled = true;
  els.musicButton.setAttribute("aria-pressed", "true");
  els.musicButton.title = "Выключить музыку";
  const notes = [196, 246.94, 293.66, 392, 329.63, 293.66, 246.94, 220];
  audio.timer = window.setInterval(() => {
    const note = notes[audio.step % notes.length];
    playNote(note, 0.11, audio.step % 4 === 0 ? "triangle" : "square", 0.64);
    if (audio.step % 4 === 0) playNote(98, 0.08, "sine", 0.9);
    audio.step += 1;
  }, 178);
}

function stopMusic() {
  audio.enabled = false;
  window.clearInterval(audio.timer);
  audio.timer = null;
  els.musicButton.setAttribute("aria-pressed", "false");
  els.musicButton.title = "Музыка";
}

function toggleMusic() {
  if (audio.enabled) stopMusic();
  else startMusic();
}

function playBlip(kind) {
  if (!audio.ctx) return;
  const wasEnabled = audio.enabled;
  audio.enabled = true;
  if (kind === "correct") {
    playNote(704, 0.08, "triangle", 0.52);
    window.setTimeout(() => playNote(968, 0.12, "triangle", 0.52), 70);
  } else {
    playNote(150, 0.12, "sawtooth", 0.42);
  }
  audio.enabled = wasEnabled;
}

function setupCanvas() {
  const ctx = els.canvas.getContext("2d");
  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.0012,
    vy: (Math.random() - 0.5) * 0.0012,
    size: 1 + Math.random() * 2.8,
    pulse: Math.random() * Math.PI * 2,
  }));
  let tick = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    els.canvas.width = Math.floor(window.innerWidth * dpr);
    els.canvas.height = Math.floor(window.innerHeight * dpr);
    els.canvas.style.width = `${window.innerWidth}px`;
    els.canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawGrid(w, h) {
    ctx.strokeStyle = "rgba(44, 255, 208, 0.075)";
    ctx.lineWidth = 1;
    for (let x = (tick % 48); x < w; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = (tick % 48); y < h; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  function frame() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    tick += 0.22;
    ctx.clearRect(0, 0, w, h);
    drawGrid(w, h);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > 1) p.vx *= -1;
      if (p.y < 0 || p.y > 1) p.vy *= -1;
      const x = p.x * w;
      const y = p.y * h;
      const glow = 0.35 + Math.sin(tick * 0.08 + p.pulse) * 0.25;
      ctx.fillStyle = i % 7 === 0 ? `rgba(255, 240, 106, ${glow})` : `rgba(44, 255, 208, ${glow})`;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
      if (i % 9 === 0) {
        ctx.strokeStyle = "rgba(34, 216, 255, 0.12)";
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.sin(tick * 0.03 + i) * 74, y - 42);
        ctx.stroke();
      }
    });
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", resize);
  resize();
  frame();
}

els.startButton.addEventListener("click", () => {
  state = defaultState();
  state.started = true;
  saveState();
  render();
});
els.continueButton.addEventListener("click", startGame);
els.transmissionNext.addEventListener("click", closeTransmission);
els.hintButton.addEventListener("click", showHint);
els.checkButton.addEventListener("click", checkAnswer);
els.nextButton.addEventListener("click", nextQuest);
els.arcadeContinue.addEventListener("click", continueAfterArcade);
els.resetButton.addEventListener("click", resetProgress);
els.restartButton.addEventListener("click", resetProgress);
els.musicButton.addEventListener("click", toggleMusic);
els.accessApply.addEventListener("click", accessAdvance);
els.answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkAnswer();
});

document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "k") {
    event.preventDefault();
    els.accessDialog.showModal();
    window.setTimeout(() => els.accessCode.focus(), 30);
  }
  if (event.key === "Enter" && !els.accessDialog.open && !els.transmissionScreen.classList.contains("hidden")) {
    event.preventDefault();
    closeTransmission();
    return;
  }
  if (event.key === "Enter" && !els.accessDialog.open && state.started && state.index < QUESTS.length) {
    event.preventDefault();
    if (currentAnswered) nextQuest();
    else checkAnswer();
  }
});

let brandClicks = 0;
els.brandButton.addEventListener("click", () => {
  brandClicks += 1;
  window.setTimeout(() => {
    brandClicks = 0;
  }, 1200);
  if (brandClicks >= 5) {
    brandClicks = 0;
    els.accessDialog.showModal();
    window.setTimeout(() => els.accessCode.focus(), 30);
  }
});

document.body.addEventListener("mouseover", (e) => {
  if (e.target.tagName === "BUTTON" || e.target.closest(".answer-option") || e.target.closest(".arcade-node")) {
    if (audio.enabled && audio.ctx) playNote(500 + Math.random() * 100, 0.02, "sine", 0.05);
  }
});

if (state.index === 0 && state.score === 0) {
  els.continueButton.classList.add("hidden");
}

setupCanvas();
render();
