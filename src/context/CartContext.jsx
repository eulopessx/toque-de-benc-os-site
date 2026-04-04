import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const CART_STORAGE_KEY = 'toque-de-bencaos-cart'

function generateCartKey(product, selectedSize) {
  return `${product.id}__${selectedSize || 'sem-tamanho'}`
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      return savedCart ? JSON.parse(savedCart) : []
    } catch (error) {
      console.error('Erro ao carregar carrinho do localStorage:', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (error) {
      console.error('Erro ao salvar carrinho no localStorage:', error)
    }
  }, [cartItems])

  function addToCart(product, selectedSize = '') {
    const normalizedSize = selectedSize || ''
    const cartKey = generateCartKey(product, normalizedSize)

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey)

      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...prev,
        {
          ...product,
          cartKey,
          selectedSize: normalizedSize,
          quantity: 1,
        },
      ]
    })
  }

  function removeFromCart(cartKey) {
    setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey))
  }

  function increaseQuantity(cartKey) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartKey === cartKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  function decreaseQuantity(cartKey) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function clearCart() {
    setCartItems([])
  }

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  )

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart precisa ser usado dentro de CartProvider')
  }

  return context
}