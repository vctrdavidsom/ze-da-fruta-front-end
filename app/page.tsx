"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Store, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const router = useRouter()

  const handleUserTypeSelection = (type: string) => {
    setSelectedType(type)
    localStorage.setItem("userType", type)
    router.push("/auth")
  }

  const userTypes = [
    {
      id: "comprador",
      title: "Comprar",
      description: "Encontre frutas e verduras frescas",
      icon: ShoppingCart,
      color: "bg-[#FE9A04]",
      hoverColor: "hover:bg-[#E8890B]",
    },
    {
      id: "vendedor",
      title: "Vender",
      description: "Venda seus produtos para milhares de clientes",
      icon: Store,
      color: "bg-[#FE9A04]",
      hoverColor: "hover:bg-[#E8890B]",
    },
    {
      id: "entregador",
      title: "Entregar",
      description: "Faça entregas e aumente sua renda",
      icon: Truck,
      color: "bg-[#FE9A04]",
      hoverColor: "hover:bg-[#E8890B]",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="mb-8">
          <Image src="/logo.png" alt="Zé da Manga" width={400} height={150} className="mx-auto" priority />
        </div>

        {/* Título Principal */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800">O que vou fazer hoje?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Escolha como você quer participar do maior marketplace de hortifruti da região
          </p>
        </div>

        {/* Botões de Seleção */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {userTypes.map((type) => {
            const IconComponent = type.icon
            return (
              <Card
                key={type.id}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 hover:border-[#FE9A04] group"
                onClick={() => handleUserTypeSelection(type.id)}
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div
                    className={`w-20 h-20 ${type.color} rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{type.title}</h3>
                  <p className="text-gray-600">{type.description}</p>
                  <Button
                    className={`w-full ${type.color} ${type.hoverColor} text-white font-semibold py-3 border-none shadow-lg`}
                    size="lg"
                  >
                    Escolher {type.title}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Rodapé */}
        <div className="mt-16 text-center text-gray-500">
          <p>Conectando produtores, consumidores e entregadores</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-2 h-2 bg-[#FE9A04] rounded-full"></div>
            <div className="w-2 h-2 bg-[#FE9A04] rounded-full opacity-60"></div>
            <div className="w-2 h-2 bg-[#FE9A04] rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
