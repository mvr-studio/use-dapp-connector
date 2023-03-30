declare global {
  interface Window {
    cardano: Record<string, InitialApi>
  }
}

import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { WalletApi } from '@cardano-sdk/dapp-connector'
import { InitialApi, InternalEnable, UseDappConnectorProps, UseDappConnectorReturns } from '../types'

const useDappConnector = ({ walletName }: UseDappConnectorProps): UseDappConnectorReturns => {
  const [api, setApi] = useState<WalletApi | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEnabled, setIsEnabled] = useState(false)

  const isWalletAvailable = useMemo(() => {
    if (isLoading) return false
    return !!window.cardano?.[walletName]
  }, [isLoading, walletName])

  const initialApi = useMemo(() => {
    if (!isWalletAvailable) return
    return window.cardano?.[walletName]
  }, [isWalletAvailable, walletName])

  const apiVersion = useMemo(() => (isWalletAvailable && initialApi?.apiVersion) || '', [isWalletAvailable])
  const name = useMemo(() => (isWalletAvailable && initialApi?.name) || '', [isWalletAvailable])
  const icon = useMemo(() => (isWalletAvailable && initialApi?.icon) || '', [isWalletAvailable])

  useEffect(() => {
    const fetchIsEnabled = async () => {
      if (!isWalletAvailable) return false
      const nextState = (initialApi && (await initialApi.isEnabled())) || false
      setIsEnabled(nextState)
    }
    fetchIsEnabled()
  }, [isWalletAvailable, initialApi])

  const loadHandler = () => {
    setIsLoading(false)
  }

  useLayoutEffect(() => {
    window.addEventListener('load', loadHandler)
    return () => window.removeEventListener('load', loadHandler)
  })

  const enable: InternalEnable = async () => {
    if (!initialApi) return
    const api = await initialApi.enable()
    setApi(api)
  }

  useEffect(() => {
    if (!isWalletAvailable) return
    if (isEnabled && !api) enable()
  }, [isWalletAvailable, isEnabled, api])

  return { api, enable, isEnabled, apiVersion, name, icon }
}

export default useDappConnector
