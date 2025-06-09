"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import DeliveryApprovalStatus from "@/components/delivery-approval-status"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  DollarSign,
  Package,
  User,
  Filter,
  RefreshCw,
  Bike,
  Zap,
  Navigation,
} from "lucide-react"
import type { Delivery, DeliveryProfile } from "@/lib/api"

export default function EntregadorDashboard() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [myDeliveries, setMyDeliveries] = useState<Delivery[]>([])
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [deliveryProfile, setDeliveryProfile] = useState<DeliveryProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [filterDistance, setFilterDistance] = useState("")
  const [filterValue, setFilterValue] = useState("")
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    loadDeliveryProfile()
    loadAvailableDeliveries()
    loadMyDeliveries()
  }, [])

  const loadDeliveryProfile = async () => {
    // Simular carregamento do perfil
    const mockProfile: DeliveryProfile = {
      id: 1,
      userId: 1,
      status_aprovacao: "aprovado", // pode ser "pendente", "aprovado", "rejeitado"
      veiculo: "Moto Honda CG 160",
      cnh: "12345678901",
      createdAt: new Date().toISOString(),
    }
    setDeliveryProfile(mockProfile)
  }

  const loadAvailableDeliveries = async () => {
    setIsLoading(true)

    // Simular dados da API
    const mockDeliveries: Delivery[] = [
      {
        id: 1,
        pedidoId: 101,
        status: "AGUARDANDO_COLETA",
        endereco: {
          rua: "Rua das Flores",
          numero: "123",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01234-567",
        },
        cliente: {
          nome: "João Silva",
          telefone: "(11) 99999-9999",
        },
        itens: [
          { nome: "Manga Tommy", quantidade: 2, preco: 8.9 },
          { nome: "Tomate Cereja", quantidade: 1, preco: 12.5 },
        ],
        valorTotal: 30.3,
        distancia: "2.5 km",
        tempoEstimado: "15 min",
        observacoes: "Apartamento 45, interfone 123",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 2,
        pedidoId: 102,
        status: "AGUARDANDO_COLETA",
        endereco: {
          rua: "Av. Principal",
          numero: "456",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01234-890",
        },
        cliente: {
          nome: "Maria Santos",
          telefone: "(11) 88888-8888",
        },
        itens: [{ nome: "Banana Prata", quantidade: 3, preco: 6.0 }],
        valorTotal: 18.0,
        distancia: "1.8 km",
        tempoEstimado: "12 min",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 3,
        pedidoId: 103,
        status: "AGUARDANDO_COLETA",
        endereco: {
          rua: "Rua do Comércio",
          numero: "789",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01234-123",
        },
        cliente: {
          nome: "Pedro Costa",
        },
        itens: [
          { nome: "Alface", quantidade: 1, preco: 4.5 },
          { nome: "Manga Tommy", quantidade: 2, preco: 8.9 },
        ],
        valorTotal: 22.3,
        distancia: "3.2 km",
        tempoEstimado: "20 min",
        observacoes: "Casa amarela com portão preto",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    setDeliveries(mockDeliveries)
    setIsLoading(false)
  }

  const loadMyDeliveries = async () => {
    // Simular entregas do entregador
    const mockMyDeliveries: Delivery[] = [
      {
        id: 4,
        pedidoId: 104,
        entregadorId: 1,
        status: "EM_TRANSITO",
        endereco: {
          rua: "Rua Nova",
          numero: "321",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01234-456",
        },
        cliente: {
          nome: "Ana Costa",
          telefone: "(11) 77777-7777",
        },
        itens: [{ nome: "Tomate", quantidade: 2, preco: 8.0 }],
        valorTotal: 16.0,
        distancia: "1.5 km",
        tempoEstimado: "10 min",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: 5,
        pedidoId: 105,
        entregadorId: 1,
        status: "ENTREGUE",
        endereco: {
          rua: "Rua Antiga",
          numero: "654",
          cidade: "São Paulo",
          estado: "SP",
          cep: "01234-789",
        },
        cliente: {
          nome: "Carlos Lima",
        },
        itens: [
          { nome: "Manga Tommy", quantidade: 1, preco: 8.9 },
          { nome: "Banana", quantidade: 2, preco: 6.0 },
        ],
        valorTotal: 20.9,
        distancia: "2.1 km",
        tempoEstimado: "15 min",
        createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 dia atrás
        updatedAt: new Date().toISOString(),
      },
    ]

    setMyDeliveries(mockMyDeliveries)
  }

  const acceptDelivery = async (deliveryId: number) => {
    // Simular aceitar entrega
    const delivery = deliveries.find((d) => d.id === deliveryId)
    if (delivery) {
      const updatedDelivery = { ...delivery, status: "EM_TRANSITO" as const, entregadorId: 1 }
      setDeliveries((prev) => prev.filter((d) => d.id !== deliveryId))
      setMyDeliveries((prev) => [updatedDelivery, ...prev])
      setIsDetailsOpen(false)
    }
  }

  const completeDelivery = async (deliveryId: number) => {
    // Simular finalizar entrega
    setMyDeliveries((prev) =>
      prev.map((d) =>
        d.id === deliveryId ? { ...d, status: "ENTREGUE" as const, updatedAt: new Date().toISOString() } : d,
      ),
    )
    setIsDetailsOpen(false)
  }

  const openDeliveryDetails = (delivery: Delivery) => {
    setSelectedDelivery(delivery)
    setIsDetailsOpen(true)
  }

  const refreshDeliveries = () => {
    loadAvailableDeliveries()
    loadMyDeliveries()
  }

  // Filtros
  const filteredDeliveries = deliveries.filter((delivery) => {
    if (filterDistance && delivery.distancia) {
      const distance = Number.parseFloat(delivery.distancia.replace(" km", ""))
      const maxDistance = Number.parseFloat(filterDistance)
      if (distance > maxDistance) return false
    }

    if (filterValue) {
      const minValue = Number.parseFloat(filterValue)
      if (delivery.valorTotal < minValue) return false
    }

    return true
  })

  // Estatísticas
  const activeDeliveries = myDeliveries.filter((d) => d.status === "EM_TRANSITO")
  const completedToday = myDeliveries.filter((d) => {
    const today = new Date().toDateString()
    const deliveryDate = new Date(d.updatedAt).toDateString()
    return d.status === "ENTREGUE" && deliveryDate === today
  })
  const totalEarningsToday = completedToday.reduce((sum, d) => {
    // Simular taxa de entrega (10% do valor do pedido)
    return sum + d.valorTotal * 0.1
  }, 0)

  // Se o perfil não está aprovado, mostrar status
  if (deliveryProfile && deliveryProfile.status_aprovacao !== "aprovado") {
    return (
      <DashboardLayout title="Dashboard do Entregador" userType="entregador">
        <div className="max-w-2xl mx-auto mt-8">
          <DeliveryApprovalStatus profile={deliveryProfile} onRetry={loadDeliveryProfile} />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Dashboard do Entregador" userType="entregador">
      <div className="space-y-6">
        {/* Status Online/Offline */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between border-l-4 border-l-[#FE9A04]">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${isOnline ? "bg-[#FE9A04]" : "bg-gray-400"} animate-pulse`}></div>
            <span className="font-medium text-gray-900">{isOnline ? "Online" : "Offline"}</span>
            <Badge className={`${isOnline ? "bg-orange-100 text-[#FE9A04]" : "bg-gray-100 text-gray-500"}`}>
              {isOnline ? "Disponível" : "Indisponível"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="online-mode" className="text-sm text-gray-600">
              Disponível para entregas
            </Label>
            <Switch
              id="online-mode"
              checked={isOnline}
              onCheckedChange={setIsOnline}
              className="data-[state=checked]:bg-[#FE9A04]"
            />
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-none shadow-sm border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Disponíveis</p>
                  <p className="text-2xl font-bold text-gray-900">{filteredDeliveries.length}</p>
                </div>
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm border-l-4 border-l-[#FE9A04]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Em Andamento</p>
                  <p className="text-2xl font-bold text-gray-900">{activeDeliveries.length}</p>
                </div>
                <div className="w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[#FE9A04]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Entregues Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">{completedToday.length}</p>
                </div>
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm border-l-4 border-l-yellow-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Ganhos Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">R$ {totalEarningsToday.toFixed(2)}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Navegação */}
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-orange-50">
            <TabsTrigger
              value="available"
              className="text-sm data-[state=active]:bg-[#FE9A04] data-[state=active]:text-white"
            >
              <Package className="w-4 h-4 mr-2" />
              Disponíveis
            </TabsTrigger>
            <TabsTrigger
              value="active"
              className="text-sm data-[state=active]:bg-[#FE9A04] data-[state=active]:text-white"
            >
              <Truck className="w-4 h-4 mr-2" />
              Em Andamento
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="text-sm data-[state=active]:bg-[#FE9A04] data-[state=active]:text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Concluídas
            </TabsTrigger>
          </TabsList>

          {/* Tab de Entregas Disponíveis */}
          <TabsContent value="available" className="space-y-6">
            {/* Filtros */}
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#FE9A04]" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="distance" className="text-sm">
                      Distância máxima (km)
                    </Label>
                    <Input
                      id="distance"
                      type="number"
                      placeholder="Ex: 5"
                      value={filterDistance}
                      onChange={(e) => setFilterDistance(e.target.value)}
                      className="h-9 focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="value" className="text-sm">
                      Valor mínimo (R$)
                    </Label>
                    <Input
                      id="value"
                      type="number"
                      placeholder="Ex: 20"
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                      className="h-9 focus:border-[#FE9A04] focus:ring-[#FE9A04]"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={refreshDeliveries}
                      variant="outline"
                      className="h-9 border-[#FE9A04] text-[#FE9A04] hover:bg-orange-50"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Atualizar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Entregas Disponíveis */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="animate-pulse border-none shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="bg-gray-200 h-4 rounded w-1/3"></div>
                            <div className="bg-gray-200 h-3 rounded w-2/3"></div>
                            <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                          </div>
                          <div className="bg-gray-200 h-10 w-24 rounded"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredDeliveries.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-orange-100">
                  <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-[#FE9A04]" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhuma entrega disponível</h3>
                  <p className="text-gray-500 mb-6">Fique online para receber novas entregas</p>
                  <Button onClick={refreshDeliveries} className="bg-[#FE9A04] hover:bg-[#E8890B]">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Atualizar Lista
                  </Button>
                </div>
              ) : (
                filteredDeliveries.map((delivery) => (
                  <Card
                    key={delivery.id}
                    className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-[#FE9A04] border-l-4 border-l-[#FE9A04]"
                    onClick={() => openDeliveryDetails(delivery)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-blue-500 text-white">Nova Entrega</Badge>
                            <p className="text-sm text-gray-500">#{delivery.id}</p>
                            <div className="w-2 h-2 bg-[#FE9A04] rounded-full animate-pulse"></div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-[#FE9A04] mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                  {delivery.endereco.rua}, {delivery.endereco.numero}
                                </p>
                                <p className="text-xs text-gray-500">{delivery.endereco.cidade}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <User className="w-4 h-4 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{delivery.cliente.nome}</p>
                                {delivery.cliente.telefone && (
                                  <p className="text-xs text-gray-500">{delivery.cliente.telefone}</p>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">{delivery.tempoEstimado}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Bike className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">{delivery.distancia}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Package className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">{delivery.itens.length} itens</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-[#FE9A04] mb-1">
                            +R$ {(delivery.valorTotal * 0.1).toFixed(2)}
                          </p>
                          <Button
                            size="sm"
                            className="bg-[#FE9A04] hover:bg-[#E8890B] h-9"
                            onClick={(e) => {
                              e.stopPropagation()
                              acceptDelivery(delivery.id)
                            }}
                          >
                            <Zap className="w-4 h-4 mr-1" />
                            Aceitar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Tab de Entregas em Andamento */}
          <TabsContent value="active" className="space-y-4">
            {activeDeliveries.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-orange-100">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-[#FE9A04]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhuma entrega em andamento</h3>
                <p className="text-gray-500">Aceite uma entrega para começar</p>
              </div>
            ) : (
              activeDeliveries.map((delivery) => (
                <Card
                  key={delivery.id}
                  className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-[#FE9A04] bg-orange-50"
                  onClick={() => openDeliveryDetails(delivery)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-[#FE9A04] text-white">Em Trânsito</Badge>
                          <p className="text-sm text-gray-500">#{delivery.id}</p>
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-[#FE9A04] mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                {delivery.endereco.rua}, {delivery.endereco.numero}
                              </p>
                              <p className="text-xs text-gray-500">{delivery.endereco.cidade}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <User className="w-4 h-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{delivery.cliente.nome}</p>
                              {delivery.cliente.telefone && (
                                <p className="text-xs text-gray-500">{delivery.cliente.telefone}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{delivery.tempoEstimado}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bike className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">{delivery.distancia}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#FE9A04] text-[#FE9A04] hover:bg-orange-50"
                          onClick={(e) => {
                            e.stopPropagation()
                            const address = `${delivery.endereco.rua}, ${delivery.endereco.numero}, ${delivery.endereco.cidade}, ${delivery.endereco.estado}`
                            const encodedAddress = encodeURIComponent(address)
                            window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, "_blank")
                          }}
                        >
                          <Navigation className="w-4 h-4 mr-1" />
                          Maps
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={(e) => {
                            e.stopPropagation()
                            completeDelivery(delivery.id)
                          }}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Finalizar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Tab de Entregas Concluídas */}
          <TabsContent value="completed" className="space-y-4">
            {myDeliveries.filter((d) => d.status === "ENTREGUE").length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-orange-100">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#FE9A04]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhuma entrega concluída ainda</h3>
                <p className="text-gray-500">Suas entregas finalizadas aparecerão aqui</p>
              </div>
            ) : (
              myDeliveries
                .filter((d) => d.status === "ENTREGUE")
                .map((delivery) => (
                  <Card
                    key={delivery.id}
                    className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500 bg-green-50"
                    onClick={() => openDeliveryDetails(delivery)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-green-500 text-white">Entregue</Badge>
                            <p className="text-sm text-gray-500">#{delivery.id}</p>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-3">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                                  {delivery.endereco.rua}, {delivery.endereco.numero}
                                </p>
                                <p className="text-xs text-gray-500">{delivery.endereco.cidade}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <User className="w-4 h-4 text-gray-500 mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{delivery.cliente.nome}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(delivery.updatedAt).toLocaleDateString("pt-BR")}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-700">{delivery.distancia}</span>
                            <span>•</span>
                            <span className="text-gray-700">R$ {delivery.valorTotal.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-green-600 text-lg">
                            + R$ {(delivery.valorTotal * 0.1).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">Ganho</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
