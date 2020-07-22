import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n.use(LanguageDetector).init({
    resources: {
        en: {
            translations: {
                countdown_text: "left until the registration starts!",
                week: '{{count}} week',
                week_plural: '{{count}} weeks',
                day: '{{count}} day',
                day_plural: '{{count}} days',
                hour: '{{count}} hour',
                hour_plural: '{{count}} hours',
                minute: '{{count}} minute',
                minute_plural: '{{count}} minutes',
                second: '{{count}} second',
                second_plural: '{{count}} seconds',
                how_to_register: 'How to register',
                important_information: 'Important information',
                name: 'Name',
                email: 'E-mail',
                phone_number: 'Phone number',
                address: 'Address',
                post_code: 'Post code',
                city: 'City',
                street: 'Street',
                gender: 'Gender',
                male: 'Male',
                female: 'Female',
                student_id: 'Student ID (erre kell valami jobb)',
                birth_date: 'Birth date',
                birth_place: 'Birth place',
                mother_name: 'Mother\'s maiden name',
                allergies: 'Allergies',
                food_sensitivities: 'Food Sensitivities',
                major: 'Major',
                please_select: 'Please select',
                tshirt_size: 'T-Shirt Size',
                days_select: 'Which days will you come?',
                all: 'All of them!',
                monday: 'Monday',
                tuesday: 'Tuesday',
                wednesday: 'Wednesday',
                thursday: 'Thursday',
                friday: 'Friday',
                other: 'Other message',
                agree: 'I agree to the',
                regulations: 'regulations',
                privacy_policy: 'privacy policy',
                registration: 'Registration',
                congratulations: 'Congratulations',
                success: 'Your registration was successful!',
                unfortunately: 'Unfortunately, your registration was unsuccessful',
                try_later: 'Try again later',
                duplicate: 'Someone already registered with these data'
            }
        },
        hu: {
            translations: {
                countdown_text: "van még hátra a regisztráció kezdetéig!",
                week: '{{count}} hét',
                day: '{{count}} nap',
                hour: '{{count}} óra',
                minute: '{{count}} perc',
                second: '{{count}} másodperc',
                how_to_register: 'Regisztráció menete',
                important_information: 'Fontos információk',
                name: 'Név',
                email: 'E-mail',
                phone_number: 'Telefonszám',
                address: 'Lakcím',
                post_code: 'Irányítószám',
                city: 'Város',
                street: 'Utca',
                gender: 'Nem',
                male: 'Férfi',
                female: 'Nő',
                student_id: 'Oktatási azonosító',
                birth_date: 'Születési dátum',
                birth_place: 'Születési hely',
                mother_name: 'Anya leánykori neve',
                allergies: 'Allergia',
                food_sensitivities: 'Ételérzékenység',
                major: 'Szak',
                please_select: 'Kérlek válasz',
                tshirt_size: 'Póló méret',
                days_select: 'Melyik napokra jössz?',
                all: 'Mindegyikre!',
                monday: 'Hétfő',
                tuesday: 'Kedd',
                wednesday: 'Szerda',
                thursday: 'Csütörtök',
                friday: 'Péntek',
                other: 'Egyéb üzenet',
                agree: 'Elfogadom a',
                regulations: 'házirendet',
                privacy_policy: 'adatkezelési nyilatkozatot',
                registration: 'Regisztráció',
                congratulations: 'Gratulálunk',
                success: 'A regisztráció sikeres volt',
                unfortunately: 'Sajnos nem sikerült regisztrálni',
                try_later: 'Próbáld meg kicsit később',
                duplicate: 'Ezekkel az adatokkal már regisztráltak'
            }
        }
    },
    fallbackLng: "hu",
    debug: true,

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },

    react: {
        wait: true
    }
});

export default i18n;