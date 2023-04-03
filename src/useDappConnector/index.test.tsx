import { renderHook, act } from '@testing-library/react-hooks'
import useDappConnector from '.'
import { mockInitialApi } from '../utils/test'

beforeEach(() => {
  global.window.cardano = {
    lace: mockInitialApi({ walletName: 'lace' }),
    yoroi: mockInitialApi({ walletName: 'yoroi' }),
    eternl: mockInitialApi({ walletName: 'eternl' })
  }
  global.window.addEventListener = (_: string, callback: any) => callback()
})

test('initial state', () => {
  const { result } = renderHook(() => useDappConnector({ walletName: 'lace' }))
  expect(result.current.name).toEqual('lace')
  expect(result.current.icon).toEqual('icon')
  expect(result.current.apiVersion).toEqual('0.1.0')
  expect(result.current.isEnabled).toEqual(false)
  expect(result.current.isEnabling).toEqual(false)
  expect(result.current.isReady).toEqual(false)
  expect(result.current.error).toEqual(null)
  expect(result.current.walletApi).toEqual(null)
})

test('enable()', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useDappConnector({ walletName: 'lace' }))

  act(() => result.current.enable())
  await waitForNextUpdate()

  expect(await result.current.walletApi?.getNetworkId()).toEqual(1)
  expect(await result.current.walletApi?.getRewardAddresses()).toEqual([])
})
