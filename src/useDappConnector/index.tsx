import { useEffect, useMemo, useState } from 'react'
import { WalletApi } from '@cardano-sdk/dapp-connector'
import { InternalEnable, UseDappConnectorProps, UseDappConnectorReturns } from '../types'
import { getCardanoProxy } from '../utils'

const Errors = {
  INITIAL_API_NOT_AVAILABE: 'InitialApiNotAvailable',
  WALLET_API_NOT_FOUND: 'WalletApiNotFound'
}

const useDappConnector = ({ walletName }: UseDappConnectorProps): UseDappConnectorReturns => {
  const [walletApi, setWalletApi] = useState<WalletApi | null>(null)
  const [isReady, setIsReady] = useState<boolean>(false)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isEnabling, setIsEnabling] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [windowCardano, setWindowCardano] = useState<any | null>(null)

  /**
   * Get specific Initial API from window.cardano
   */
  const initialApi = useMemo(() => {
    if (!windowCardano) return null
    try {
      const initialApiFound = windowCardano?.[walletName]
      if (!initialApiFound) throw new Error('InitialApiNotAvailable')
      return initialApiFound
    } catch (error) {
      setError(error as Error)
    }
  }, [windowCardano, walletName])

  /**
   * Fetch wallet meta data
   */
  const apiVersion = useMemo(() => (!!initialApi && initialApi?.apiVersion) || '', [initialApi])
  const name = useMemo(() => (!!initialApi && initialApi?.name) || '', [initialApi])
  const icon = useMemo(() => (!!initialApi && initialApi?.icon) || '', [initialApi])

  /**
   * Fetch isEnabled from Initial API.
   */
  useEffect(() => {
    const fetchIsEnabled = async () => {
      if (!initialApi) return false
      const nextState = (initialApi && (await initialApi.isEnabled())) || false
      setIsEnabled(nextState)
    }
    fetchIsEnabled()
  }, [initialApi, isEnabling])

  /**
   * Enable specific wallet from within Initial API.
   */
  const enable: InternalEnable = async () => {
    setIsReady(false)
    setIsEnabling(true)
    try {
      if (!initialApi) throw new Error(Errors.INITIAL_API_NOT_AVAILABE)
      const walletApi = await initialApi.enable()
      if (!walletApi) throw new Error(Errors.WALLET_API_NOT_FOUND)
      setWalletApi(walletApi)
      setIsReady(true)
    } catch (error: unknown) {
      setError(error as Error)
    } finally {
      setIsEnabling(false)
    }
  }

  /**
   * Fetch window.cardano through the Proxy when the DOM is ready.
   */
  useEffect(() => {
    const onLoad = () => setWindowCardano(getCardanoProxy())
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  /**
   * Clean up the local state on walletName change.
   */
  useEffect(() => {
    setIsReady(false)
    setWalletApi(null)
    setIsEnabled(false)
  }, [walletName])

  /**
   * Initialize WalletAPI.
   */
  useEffect(() => {
    setError(null)
    try {
      if (!initialApi) throw new Error(Errors.INITIAL_API_NOT_AVAILABE)
      if (isEnabled && !walletApi) enable()
    } catch (error: unknown) {
      setError(error as Error)
    }
  }, [initialApi, isEnabled, walletApi])

  return { walletApi, enable, isEnabled, isEnabling, error, isReady, apiVersion, name, icon }
}

export default useDappConnector
