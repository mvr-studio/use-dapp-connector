import { act, renderHook } from '@testing-library/react-hooks'
import useCardanoWallets from '.'
import { mockInitialApi } from '../utils/test'

beforeEach(() => {
  global.window.cardano = {
    lace: mockInitialApi({ walletName: 'lace' }),
    yoroi: mockInitialApi({ walletName: 'yoroi' }),
    eternl: mockInitialApi({ walletName: 'eternl' })
  }
  global.window.addEventListener = (_: string, callback: any) => callback()
})

test('initial state with no additional props', () => {
  const { result } = renderHook(() => useCardanoWallets())
  act(() => result.current.fetchWallets())
  expect(result.current.experimentalWallets?.length).toEqual(0)
  expect(result.current.wallets?.length).toEqual(3)
})

test('initial state with allowlist', () => {
  const { result } = renderHook(() => useCardanoWallets({ allowlist: ['lace'] }))
  act(() => result.current.fetchWallets())
  expect(result.current.experimentalWallets?.length).toEqual(0)
  expect(result.current.wallets?.length).toEqual(1)
})

test('initial state with allowlist and restExperimental', () => {
  const { result } = renderHook(() => useCardanoWallets({ allowlist: ['lace'], restExperimental: true }))
  act(() => result.current.fetchWallets())
  expect(result.current.experimentalWallets?.length).toEqual(2)
  expect(result.current.wallets?.length).toEqual(1)
})
