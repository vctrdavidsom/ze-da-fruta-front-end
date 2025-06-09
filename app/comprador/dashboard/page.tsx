"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import AddressManager from "@/components/address-manager"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Plus, Minus, Search, Star, MapPin, Package, CreditCard, Trash2, X } from "lucide-react"
import Image from "next/image"
import type { Product, Address, Order } from "@/lib/api"

interface CartItem extends Product {
  quantity: number
}

const categories = [
  { id: "frutas", name: "Frutas", icon: "🍎" },
  { id: "verduras", name: "Verduras", icon: "🥬" },
  { id: "legumes", name: "Legumes", icon: "🥕" },
  { id: "organicos", name: "Orgânicos", icon: "🌱" },
  { id: "promocoes", name: "Promoções", icon: "🏷️" },
]

export default function CompradorDashboard() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("todos")
  const [sortBy, setSortBy] = useState<string>("relevancia")
  const [showAddressManager, setShowAddressManager] = useState(false)

  useEffect(() => {
    loadProducts()
    loadOrders()
  }, [])

  const loadProducts = async () => {
    setIsLoading(true)
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Maçã Gala",
        price: 6.99,
        unit: "kg",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EtRjUQmMOxDLnfsD4ojq3isVTz2h1Q.png",
        rating: 4.8,
        vendor: "Hortifruti São João",
        category: "frutas",
        stock: 50,
        description: "Maçãs frescas e crocantes, ideais para lanches saudáveis",
      },
      {
        id: 2,
        name: "Banana Prata",
        price: 4.5,
        unit: "kg",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LLfqmN8MZdSvhJVSckWB1YKoQnR1uv.png",
        rating: 4.9,
        vendor: "Frutaria Central",
        category: "frutas",
        stock: 30,
        description: "Bananas doces e nutritivas, ricas em potássio",
      },
      {
        id: 3,
        name: "Alface Americana",
        price: 3.2,
        unit: "unidade",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1fWkqSrEPiIZzuc8XCzcFKBsl4vtNA.png",
        rating: 4.7,
        vendor: "Verduras & Cia",
        category: "verduras",
        stock: 25,
        description: "Alface fresca e crocante para suas saladas",
      },
      {
        id: 4,
        name: "Tomate Italiano",
        price: 8.9,
        unit: "kg",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jjpN3VnRW6hMiVX9O4wc2qoE3lhVBq.png",
        rating: 4.6,
        vendor: "Hortifruti São João",
        category: "legumes",
        stock: 40,
        description: "Tomates saborosos e suculentos",
      },
      {
        id: 5,
        name: "Cenoura Orgânica",
        price: 7.5,
        unit: "kg",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6BF9mr3OjCQ3ilJBk1mewR4xlukrf3.png",
        rating: 4.9,
        vendor: "Orgânicos da Terra",
        category: "organicos",
        stock: 15,
        description: "Cenouras orgânicas, livres de agrotóxicos",
      },
      {
        id: 6,
        name: "Laranja Lima",
        price: 5.99,
        unit: "kg",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7QfPoQfM6npnXZIuT4GG86Q9A0eBrG.png",
        rating: 4.5,
        vendor: "Frutaria Central",
        category: "frutas",
        stock: 60,
        description: "Laranjas doces e suculentas",
      },
      {
        id: 7,
        name: "Abacate",
        price: 9.9,
        unit: "kg",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XJbZrIGhkHLgFxf70K4lg05WXbg81y.png",
        rating: 4.7,
        vendor: "Frutaria Central",
        category: "frutas",
        stock: 20,
        description: "Abacates cremosos e nutritivos",
      },
      {
        id: 8,
        name: "Brócolis",
        price: 4.5,
        unit: "unidade",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1UJvSaVRugjwtmniZddo4cvJULJla5.png",
        rating: 4.6,
        vendor: "Verduras & Cia",
        category: "verduras",
        stock: 15,
        description: "Brócolis frescos, ricos em vitaminas",
      },
      {
        id: 9,
        name: "Manga Tommy",
        price: 8.9,
        unit: "kg",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LIs52UomVsHegYl6U2UUBAHW9McYWp.png",
        rating: 4.8,
        vendor: "Frutaria Central",
        category: "frutas",
        stock: 35,
        description: "Mangas doces e suculentas, colhidas no ponto ideal",
      },
      {
        id: 10,
        name: "Tomate Cereja",
        price: 12.5,
        unit: "kg",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-F1NKMTM7riBhXnDNLAdKv1YP4Bgfyj.png",
        rating: 4.6,
        vendor: "Verduras & Cia",
        category: "legumes",
        stock: 25,
        description: "Tomates cereja frescos, ideais para saladas",
      },
    ]

    const savedProducts = localStorage.getItem("marketplace_products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      setProducts(mockProducts)
      localStorage.setItem("marketplace_products", JSON.stringify(mockProducts))
    }
    setIsLoading(false)
  }

  const loadOrders = async () => {
    const savedOrders = localStorage.getItem("user_orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => {
      return prev
        .map((item) => (item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
        .filter((item) => item.quantity > 0)
    })
  }

  const removeProductFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = async () => {
    if (!selectedAddress || cart.length === 0) return

    const newOrder: Order = {
      id: Date.now(),
      userId: 1,
      enderecoId: selectedAddress.id,
      itens: cart.map((item) => ({
        produtoId: item.id,
        quantidade: item.quantity,
        produto: item,
      })),
      total: getCartTotal(),
      status: "Preparando",
      createdAt: new Date().toISOString(),
    }

    const updatedOrders = [newOrder, ...orders]
    setOrders(updatedOrders)
    localStorage.setItem("user_orders", JSON.stringify(updatedOrders))

    setCart([])
    setIsCheckoutOpen(false)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "preco-menor":
        return a.price - b.price
      case "preco-maior":
        return b.price - a.price
      case "avaliacao":
        return b.rating - a.rating
      case "nome":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <DashboardLayout title="Zé da Manga" userType="comprador">
      <div className="min-h-screen bg-gray-50">
        {/* Header Fixo */}
        <div className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            {/* Endereço e Busca */}
            <div className="flex items-center justify-between gap-6 mb-4">
              {/* Endereço */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-[#FE9A04]" />
                  </div>
                </div>
                <div className="min-w-0">
                  {selectedAddress ? (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Entregar em</p>
                      <button
                        onClick={() => setShowAddressManager(true)}
                        className="text-sm font-medium text-gray-900 hover:text-[#FE9A04] transition-colors truncate block max-w-48"
                      >
                        {selectedAddress.rua}, {selectedAddress.numero}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddressManager(true)}
                      className="text-sm font-medium text-[#FE9A04] hover:text-[#E8890B]"
                    >
                      + Adicionar endereço
                    </button>
                  )}
                </div>
              </div>

              {/* Busca */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-gray-200 focus:border-[#FE9A04] focus:ring-[#FE9A04] rounded-lg"
                  />
                </div>
              </div>

              {/* Carrinho */}
              {cart.length > 0 && (
                <Button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="bg-[#FE9A04] hover:bg-[#E8890B] h-12 px-6 rounded-lg font-medium relative shadow-sm"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Carrinho
                  <Badge className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs">
                    {getCartItemCount()}
                  </Badge>
                </Button>
              )}
            </div>

            {/* Categorias */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <Button
                variant={selectedCategory === "todos" ? "default" : "outline"}
                onClick={() => setSelectedCategory("todos")}
                className={`rounded-full whitespace-nowrap h-9 px-4 text-sm font-medium ${
                  selectedCategory === "todos"
                    ? "bg-[#FE9A04] hover:bg-[#E8890B] text-white"
                    : "border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-[#FE9A04]"
                }`}
              >
                Todos
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full whitespace-nowrap h-9 px-4 text-sm font-medium ${
                    selectedCategory === category.id
                      ? "bg-[#FE9A04] hover:bg-[#E8890B] text-white"
                      : "border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-[#FE9A04]"
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Header da Seção */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "todos"
                  ? "Todos os produtos"
                  : categories.find((c) => c.id === selectedCategory)?.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{sortedProducts.length} produtos disponíveis</p>
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 h-10 border-gray-200 focus:border-[#FE9A04] focus:ring-[#FE9A04]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Mais relevantes</SelectItem>
                <SelectItem value="preco-menor">Menor preço</SelectItem>
                <SelectItem value="preco-maior">Maior preço</SelectItem>
                <SelectItem value="avaliacao">Melhor avaliados</SelectItem>
                <SelectItem value="nome">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Grid de Produtos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Card key={i} className="animate-pulse border-gray-200">
                    <CardContent className="p-0">
                      <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                      <div className="p-4 space-y-3">
                        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                        <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                        <div className="bg-gray-200 h-8 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : sortedProducts.map((product) => {
                  const cartItem = cart.find((item) => item.id === product.id)
                  const quantity = cartItem?.quantity || 0

                  return (
                    <Card
                      key={product.id}
                      className="group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-[#FE9A04] bg-white"
                    >
                      <CardContent className="p-0">
                        {/* Imagem do Produto */}
                        <div className="relative overflow-hidden rounded-t-lg">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={200}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                          />

                          {/* Badge de Estoque Baixo */}
                          {product.stock && product.stock < 10 && (
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-orange-500 text-white text-xs font-medium">Últimas unidades</Badge>
                            </div>
                          )}

                          {/* Rating */}
                          <div className="absolute top-3 right-3">
                            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-medium text-gray-700">{product.rating}</span>
                            </div>
                          </div>
                        </div>

                        {/* Informações do Produto */}
                        <div className="p-4">
                          <div className="mb-3">
                            <h3 className="font-semibold text-gray-900 text-base leading-tight mb-1 line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-gray-500">{product.vendor}</p>
                            {product.description && (
                              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{product.description}</p>
                            )}
                          </div>

                          {/* Preço */}
                          <div className="mb-4">
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl font-bold text-gray-900">R$ {product.price.toFixed(2)}</span>
                              <span className="text-sm text-gray-500">/ {product.unit}</span>
                            </div>
                          </div>

                          {/* Botões de Ação */}
                          <div className="flex items-center gap-2">
                            {quantity === 0 ? (
                              <Button
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-[#FE9A04] hover:bg-[#E8890B] text-white font-medium h-10 rounded-lg"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Adicionar
                              </Button>
                            ) : (
                              <div className="flex items-center justify-between flex-1 bg-orange-50 rounded-lg p-1 border border-[#FE9A04]">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFromCart(product.id)}
                                  className="h-8 w-8 rounded-md bg-white shadow-sm hover:bg-orange-100 border"
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="font-semibold text-gray-900 px-3">{quantity}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => addToCart(product)}
                                  className="h-8 w-8 rounded-md bg-white shadow-sm hover:bg-orange-100 border"
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
          </div>

          {/* Estado Vazio */}
          {sortedProducts.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-12 h-12 text-[#FE9A04]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Tente ajustar sua busca ou navegar pelas categorias disponíveis
              </p>
            </div>
          )}
        </div>

        {/* Modal de Endereços */}
        <Dialog open={showAddressManager} onOpenChange={setShowAddressManager}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Endereços de entrega</DialogTitle>
            </DialogHeader>
            <AddressManager
              selectedAddress={selectedAddress}
              onAddressSelect={(address) => {
                setSelectedAddress(address)
                setShowAddressManager(false)
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Modal do Carrinho */}
        <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#FE9A04]" />
                  <span>Carrinho ({getCartItemCount()} itens)</span>
                </div>
                {cart.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-[#FE9A04] hover:text-[#E8890B] hover:bg-orange-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Limpar
                  </Button>
                )}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Endereço de Entrega */}
              {selectedAddress && (
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[#FE9A04]" />
                    </div>
                    <div>
                      <p className="font-medium text-orange-900 text-sm">Entregar em:</p>
                      <p className="text-sm text-orange-800">
                        {selectedAddress.rua}, {selectedAddress.numero}
                      </p>
                      <p className="text-sm text-orange-800">
                        {selectedAddress.cidade}, {selectedAddress.estado}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Itens do Carrinho */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Itens do pedido</h4>
                <div className="max-h-60 overflow-y-auto space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.vendor}</p>
                        <p className="text-sm font-medium text-[#FE9A04]">
                          R$ {item.price.toFixed(2)} / {item.unit}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 rounded-md bg-white shadow-sm hover:bg-orange-50"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="font-semibold text-sm px-2 min-w-[2rem] text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addToCart(item)}
                          className="h-8 w-8 rounded-md bg-white shadow-sm hover:bg-orange-50"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">R$ {(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeProductFromCart(item.id)}
                          className="text-[#FE9A04] hover:text-[#E8890B] hover:bg-orange-50 p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumo do Pedido */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">R$ {getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Taxa de entrega</span>
                    <span className="font-medium text-green-600">Grátis</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total</span>
                    <span className="text-[#FE9A04]">R$ {getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCheckoutOpen(false)}
                  className="flex-1 border-gray-200 hover:bg-orange-50 hover:border-[#FE9A04]"
                >
                  Continuar comprando
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="flex-1 bg-[#FE9A04] hover:bg-[#E8890B]"
                  disabled={!selectedAddress}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Finalizar pedido
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
