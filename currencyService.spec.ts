import { getCurrencyUrl, getValueName } from './currencyService'

describe('currencyService', () => {
    describe('getCurrencyUrl', () => {
        it('should render the right url', () => {
            expect(getCurrencyUrl('EUR-BRL')).toBe(
                'https://economia.awesomeapi.com.br/last/EUR-BRL'
            )
        })
    })

    describe('getValueName', () => {
        it('should render the right string', () => {
            expect(getValueName('EUR-BRL')).toBe('EURBRL')
        })
    })
})
