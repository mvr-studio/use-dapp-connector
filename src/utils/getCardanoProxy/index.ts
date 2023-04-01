const getCardanoProxy = () => new Proxy(window.cardano, {})

export default getCardanoProxy
