type WindowCardano = Record<string, InitialApi>

declare global {
  interface Window {
    cardano: WindowCardano
  }
}

import { WalletName } from '@cardano-sdk/dapp-connector'
import { useEffect, useMemo, useState } from 'react'
import { InitialApi } from '../types'
import { getCardanoProxy } from '../utils'

type ListableWallet = Pick<InitialApi, 'name' | 'icon'> & { walletName: string }

interface UseCardanoWalletsProps {
  allowlist?: WalletName[]
  restExperimental?: boolean
}

const useCardanoWallets = (props?: UseCardanoWalletsProps) => {
  const [walletsFound, setWalletsFound] = useState<ListableWallet[] | null>(null)
  const [windowCardano, setWindowCardano] = useState<any | null>(null)

  /**
   * Sanitizes wallet props.
   * @param wallet
   */
  const mapWalletProps = (wallet: InitialApi & { walletName: string }): ListableWallet => ({
    walletName: wallet.walletName,
    name: wallet.name,
    icon: wallet.icon
  })

  /**
   * List of available wallets. Respects `allowlist` to restrict.
   */
  const wallets = useMemo(() => {
    if (!props?.allowlist) return walletsFound
    return walletsFound?.filter((wallet) => props?.allowlist?.includes(wallet.walletName))
  }, [walletsFound, props?.allowlist])

  /**
   * Experimental wallets are available once `allowlist` is set.
   * These are the wallets not mentioned in `allowlist`, once `restExperimental` is set to true.
   */
  const experimentalWallets = useMemo(() => {
    if (!props?.restExperimental) return []
    return walletsFound?.filter((wallet) => !props?.allowlist?.includes(wallet.walletName))
  }, [walletsFound, props?.allowlist, props?.restExperimental])

  /**
   * Sanitize wallets inside window.cardano
   */
  useEffect(() => {
    if (!windowCardano) return
    const walletsArray: [WalletName, InitialApi][] = Object.entries(windowCardano || {})
    const cardanoWallets = walletsArray.map(([walletName, initialApi]) => ({
      walletName,
      ...initialApi
    }))
    const validWallets = cardanoWallets.filter((wallet) => wallet.hasOwnProperty('enable')).map(mapWalletProps)
    if (walletsFound?.length === validWallets.length) return
    setWalletsFound(validWallets)
  }, [windowCardano])

  /**
   * Fetch window.cardano through the Proxy when the DOM is ready.
   */
  useEffect(() => {
    const onLoad = () => setWindowCardano(getCardanoProxy())
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return { wallets, experimentalWallets }
}

export default useCardanoWallets
