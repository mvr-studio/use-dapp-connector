type WindowCardano = Record<string, InitialApi>

declare global {
  interface Window {
    cardano: WindowCardano
  }
}

import { WalletName } from '@cardano-sdk/dapp-connector'
import { useMemo, useState } from 'react'
import { InitialApi } from '../types'

export type ListableWallet = Pick<InitialApi, 'name' | 'icon'> & { walletName: string }

interface UseCardanoWalletsProps {
  allowlist?: WalletName[]
  restExperimental?: boolean
}

const useCardanoWallets = (props?: UseCardanoWalletsProps) => {
  const [walletsFound, setWalletsFound] = useState<ListableWallet[]>([])

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
   * Fetch wallets programmatically. Some wallets like Nami load a little slower than the rest.
   * If you want to fetch wallets on load, wrap this inside setTimeout and set the delay to 1000ms.
   */
  const fetchWallets = async () => {
    if (typeof window === 'undefined') return
    const windowCardano = window.cardano
    const walletsArray: [WalletName, InitialApi][] = Object.entries(windowCardano || {})
    const cardanoWallets = walletsArray.map(([walletName, initialApi]) => ({
      walletName,
      ...initialApi
    }))
    const validWallets = cardanoWallets.filter((wallet) => wallet.hasOwnProperty('enable')).map(mapWalletProps)
    if (walletsFound?.length === validWallets.length) return
    return setWalletsFound(validWallets)
  }

  return { fetchWallets, wallets, experimentalWallets }
}

export default useCardanoWallets
