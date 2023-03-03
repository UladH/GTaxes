export const environment = {
    api: {
        nbg: {
            domain: 'https://nbg.gov.ge/gw/api/',
            default_headers: {
                'Accept-Language': 'en'
            },
            currencies: {
                codes: 'ct/monetarypolicy/currencies/codes'
            }
        }
    },
    currencies: {
        nationalCurrency: {
            code: 'GEL',
            name: 'Georgian Lari'
        },
        defaultCurrency: 'USD',
        aviableCurrencies: ['GEL', 'USD', 'EUR']
    }
};
