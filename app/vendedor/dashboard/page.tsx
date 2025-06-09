"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Package, Edit, Trash2, DollarSign, Star, Search, ShoppingBag, BarChart3 } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  unit: string
  stock: number
  image: string
  category: string
  description: string
  vendor: string
  rating: number
}

export default function VendedorDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("produtos")
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [isEditingProduct, setIsEditingProduct] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    unit: "kg",
    stock: "",
    category: "",
    description: "",
    imageUrl: "",
  })

  useEffect(() => {
    // Carregar produtos do localStorage
    const savedProducts = localStorage.getItem("marketplace_products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      // Produtos iniciais apenas se não houver nada salvo
      const initialProducts = [
        {
          id: 1,
          name: "Manga Tommy",
          price: 8.9,
          unit: "kg",
          stock: 50,
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LIs52UomVsHegYl6U2UUBAHW9McYWp.png",
          category: "Frutas",
          description: "Mangas doces e suculentas, colhidas no ponto ideal",
          vendor: "Frutas do João",
          rating: 4.8,
        },
        {
          id: 2,
          name: "Tomate Cereja",
          price: 12.5,
          unit: "kg",
          stock: 25,
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-F1NKMTM7riBhXnDNLAdKv1YP4Bgfyj.png",
          category: "Verduras",
          description: "Tomates cereja frescos, ideais para saladas",
          vendor: "Frutas do João",
          rating: 4.6,
        },
        {
          id: 5,
          name: "Cenoura Orgânica",
          price: 7.5,
          unit: "kg",
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6BF9mr3OjCQ3ilJBk1mewR4xlukrf3.png",
          stock: 15,
          category: "Orgânicos",
          description: "Cenouras orgânicas, livres de agrotóxicos",
          vendor: "Frutas do João",
          rating: 4.9,
        },
        {
          id: 6,
          name: "Laranja Lima",
          price: 5.99,
          unit: "kg",
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-7QfPoQfM6npnXZIuT4GG86Q9A0eBrG.png",
          stock: 60,
          category: "Frutas",
          description: "Laranjas doces e suculentas",
          vendor: "Frutas do João",
          rating: 4.5,
        },
        {
          id: 7,
          name: "Abacate",
          price: 9.9,
          unit: "kg",
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XJbZrIGhkHLgFxf70K4lg05WXbg81y.png",
          stock: 20,
          category: "Frutas",
          description: "Abacates cremosos e nutritivos",
          vendor: "Frutas do João",
          rating: 4.7,
        },
        {
          id: 8,
          name: "Brócolis",
          price: 4.5,
          unit: "unidade",
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1UJvSaVRugjwtmniZddo4cvJULJla5.png",
          stock: 15,
          category: "Verduras",
          description: "Brócolis frescos, ricos em vitaminas",
          vendor: "Frutas do João",
          rating: 4.6,
        },
      ]
      setProducts(initialProducts)
      localStorage.setItem("marketplace_products", JSON.stringify(initialProducts))
    }
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("marketplace_products", JSON.stringify(products))
    }
  }, [products])

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock) {
      const product: Product = {
        id: Date.now(),
        name: newProduct.name,
        price: Number.parseFloat(newProduct.price),
        unit: newProduct.unit,
        stock: Number.parseInt(newProduct.stock),
        image: newProduct.imageUrl || "/placeholder.svg?height=200&width=200&text=" + newProduct.name,
        category: newProduct.category,
        description: newProduct.description,
        vendor: "Frutas do João", // Nome do vendedor logado
        rating: 4.5, // Rating inicial
      }

      setProducts((prev) => [...prev, product])
      resetProductForm()
      setIsAddingProduct(false)
    }
  }

  const handleEditProduct = () => {
    if (selectedProduct && newProduct.name && newProduct.price && newProduct.stock) {
      const updatedProduct: Product = {
        ...selectedProduct,
        name: newProduct.name,
        price: Number.parseFloat(newProduct.price),
        unit: newProduct.unit,
        stock: Number.parseInt(newProduct.stock),
        image: newProduct.imageUrl || selectedProduct.image,
        category: newProduct.category,
        description: newProduct.description,
      }

      setProducts((prev) => prev.map((p) => (p.id === selectedProduct.id ? updatedProduct : p)))
      resetProductForm()
      setIsEditingProduct(false)
      setSelectedProduct(null)
    }
  }

  const startEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      unit: product.unit,
      stock: product.stock.toString(),
      category: product.category,
      description: product.description,
      imageUrl: product.image,
    })
    setIsEditingProduct(true)
  }

  const resetProductForm = () => {
    setNewProduct({
      name: "",
      price: "",
      unit: "kg",
      stock: "",
      category: "",
      description: "",
      imageUrl: "",
    })
  }

  const deleteProduct = (id: number) => {
    const updatedProducts = products.filter((p) => p.id !== id)
    setProducts(updatedProducts)
    localStorage.setItem("marketplace_products", JSON.stringify(updatedProducts))
  }

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalProducts = products.length
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)

  // Dados simulados para pedidos recentes
  const recentOrders = [
    {
      id: "#001",
      product: "Manga Tommy",
      quantity: "2 kg",
      value: 17.8,
      buyer: "João Silva",
      status: "Entregue",
      date: "Hoje, 14:30",
    },
    {
      id: "#002",
      product: "Tomate Cereja",
      quantity: "1 kg",
      value: 12.5,
      buyer: "Maria Santos",
      status: "Preparando",
      date: "Hoje, 13:15",
    },
    {
      id: "#003",
      product: "Manga Tommy",
      quantity: "3 kg",
      value: 26.7,
      buyer: "Pedro Costa",
      status: "A caminho",
      date: "Hoje, 11:45",
    },
    {
      id: "#004",
      product: "Alface Americana",
      quantity: "2 unidades",
      value: 6.4,
      buyer: "Ana Oliveira",
      status: "Entregue",
      date: "Ontem, 18:20",
    },
    {
      id: "#005",
      product: "Banana Prata",
      quantity: "1.5 kg",
      value: 7.5,
      buyer: "Carlos Mendes",
      status: "Entregue",
      date: "Ontem, 15:10",
    },
  ]

  // Dados simulados para o gráfico de vendas
  const salesData = [
    { day: "Seg", sales: 120 },
    { day: "Ter", sales: 150 },
    { day: "Qua", sales: 180 },
    { day: "Qui", sales: 140 },
    { day: "Sex", sales: 200 },
    { day: "Sáb", sales: 250 },
    { day: "Dom", sales: 190 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Entregue":
        return <Badge className="bg-green-500 text-white">Entregue</Badge>
      case "Preparando":
        return <Badge className="bg-[#FE9A04] text-white">Preparando</Badge>
      case "A caminho":
        return <Badge className="bg-blue-500 text-white">A caminho</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <DashboardLayout title="Dashboard do Vendedor" userType="vendedor">
      <div className="space-y-6">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-md border-l-4 border-l-[#FE9A04]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Produtos</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
                    <p className="text-xs text-[#FE9A04] font-medium">+2 esta semana</p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#FE9A04]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Estoque</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-gray-900">{totalStock}</p>
                    <p className="text-xs text-green-600 font-medium">+15 esta semana</p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Vendas (R$)</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-gray-900">{totalValue.toFixed(2)}</p>
                    <p className="text-xs text-green-600 font-medium">+8% este mês</p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md border-l-4 border-l-yellow-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Avaliação</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-gray-900">4.8</p>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    </div>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Navegação */}
        <Tabs defaultValue="produtos" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-orange-50">
            <TabsTrigger
              value="produtos"
              className="text-sm data-[state=active]:bg-[#FE9A04] data-[state=active]:text-white"
            >
              <Package className="w-4 h-4 mr-2" />
              Produtos
            </TabsTrigger>
            <TabsTrigger
              value="pedidos"
              className="text-sm data-[state=active]:bg-[#FE9A04] data-[state=active]:text-white"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Pedidos
            </TabsTrigger>
            <TabsTrigger
              value="desempenho"
              className="text-sm data-[state=active]:bg-[#FE9A04] data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Desempenho
            </TabsTrigger>
          </TabsList>

          {/* Tab de Produtos */}
          <TabsContent value="produtos" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 h-10 focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                />
              </div>
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button className="bg-[#FE9A04] hover:bg-[#E8890B]">
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-[#FE9A04]">Novo Produto</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome do Produto</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Ex: Manga Tommy"
                        className="focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">Imagem do Produto</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="imageUrl"
                          value={newProduct.imageUrl}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, imageUrl: e.target.value }))}
                          placeholder="URL da imagem ou deixe em branco para imagem padrão"
                          className="flex-1 focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-shrink-0 border-[#FE9A04] text-[#FE9A04] hover:bg-orange-50"
                          onClick={() => {
                            // Aqui poderia abrir um seletor de arquivos em uma implementação real
                            alert("Em uma implementação completa, isso abriria um seletor de arquivos")
                          }}
                        >
                          Procurar
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Formatos aceitos: JPG, PNG. Tamanho máximo: 5MB</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Preço</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                          placeholder="0.00"
                          className="focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unidade</Label>
                        <select
                          id="unit"
                          value={newProduct.unit}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, unit: e.target.value }))}
                          className="w-full p-2 border rounded-md focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                        >
                          <option value="kg">kg</option>
                          <option value="unidade">unidade</option>
                          <option value="maço">maço</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="stock">Estoque</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: e.target.value }))}
                          placeholder="0"
                          className="focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Categoria</Label>
                        <Input
                          id="category"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value }))}
                          placeholder="Ex: Frutas"
                          className="focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Descreva seu produto..."
                        className="focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                      />
                    </div>

                    <Button onClick={handleAddProduct} className="w-full bg-[#FE9A04] hover:bg-[#E8890B]">
                      Adicionar Produto
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Modal de Edição */}
              <Dialog open={isEditingProduct} onOpenChange={setIsEditingProduct}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-[#FE9A04]">Editar Produto</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-name">Nome do Produto</Label>
                      <Input
                        id="edit-name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                        className="focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="edit-image">Imagem do Produto</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="edit-imageUrl"
                          value={newProduct.imageUrl}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, imageUrl: e.target.value }))}
                          className="flex-1 focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-shrink-0 border-[#FE9A04] text-[#FE9A04] hover:bg-orange-50"
                        >
                          Procurar
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-price">Preço</Label>
                        <Input
                          id="edit-price"
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, price: e.target.value }))}
                          className="focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-unit">Unidade</Label>
                        <select
                          id="edit-unit"
                          value={newProduct.unit}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, unit: e.target.value }))}
                          className="w-full p-2 border rounded-md focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                        >
                          <option value="kg">kg</option>
                          <option value="unidade">unidade</option>
                          <option value="maço">maço</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-stock">Estoque</Label>
                        <Input
                          id="edit-stock"
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: e.target.value }))}
                          className="focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-category">Categoria</Label>
                        <Input
                          id="edit-category"
                          value={newProduct.category}
                          onChange={(e) => setNewProduct((prev) => ({ ...prev, category: e.target.value }))}
                          className="focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="edit-description">Descrição</Label>
                      <Textarea
                        id="edit-description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, description: e.target.value }))}
                        className="focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                      />
                    </div>

                    <Button onClick={handleEditProduct} className="w-full bg-[#FE9A04] hover:bg-[#E8890B]">
                      Salvar Alterações
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Lista de Produtos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow hover:border-[#FE9A04]"
                >
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white text-gray-800 shadow-sm border border-[#FE9A04]">
                        {product.stock} {product.unit}
                      </Badge>
                    </div>
                    <div className="absolute top-3 left-3">
                      <div className="w-3 h-3 bg-[#FE9A04] rounded-full"></div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                      <p className="text-lg font-bold text-[#FE9A04]">R$ {product.price.toFixed(2)}</p>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startEditProduct(product)}
                          className="h-9 px-3 border-[#FE9A04] text-[#FE9A04] hover:bg-orange-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
                          className="h-9 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-orange-100">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-[#FE9A04]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-500 mb-6">Adicione seu primeiro produto para começar a vender</p>
                <Button onClick={() => setIsAddingProduct(true)} className="bg-[#FE9A04] hover:bg-[#E8890B]">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Produto
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Tab de Pedidos */}
          <TabsContent value="pedidos" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Pedidos Recentes</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-9 border-[#FE9A04] text-[#FE9A04] hover:bg-orange-50\">
