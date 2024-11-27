'use client'

import React, { useState, useEffect, createElement } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Calendar, Trophy, MessageSquare } from "lucide-react";
import Image from 'next/image'
import { AdminDashboard } from '../components/admin-dashboard'
import { MemberDashboard } from '../components/member-dashboard'

interface User {
  email: string;
  role: 'admin' | 'member';
}

interface UserData {
  email: string;
  password: string;
  name: string;
}

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

interface MembershipPlan {
  title: string;
  price: string;
  features: string[];
}

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface Plan {
  title: string;
  price: string;
  features: string[];
}

interface PlanFeature {
  icon: LucideIcon;
  content: string;
}

interface ContactFeature {
  icon: LucideIcon;
  content: string;
}

type LucideIcon = React.ComponentType<{ className?: string }>;

const planFeatures: PlanFeature[] = [
  {
    icon: Calendar,
    content: "Acceso ilimitado a reservas"
  },
  {
    icon: Trophy,
    content: "Participación en torneos exclusivos"
  },
  {
    icon: MessageSquare,
    content: "Soporte prioritario"
  }
];

const contactFeatures: ContactFeature[] = [
  {
    icon: MessageSquare,
    content: "Chat en vivo para soporte inmediato"
  },
  {
    icon: Calendar,
    content: "Horario extendido de atención"
  },
  {
    icon: Trophy,
    content: "Equipo profesional dedicado"
  }
];

export function BlockPage() {
  const [user, setUser] = useState<User | null>(null)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showSignUpDialog, setShowSignUpDialog] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [currentMessage, setCurrentMessage] = useState('')
  const [selectedMembership, setSelectedMembership] = useState<MembershipPlan | null>(null)
  const [showMembershipDialog, setShowMembershipDialog] = useState(false)
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogin = (email: string, password: string) => {
    if (email === 'admin@padelcygnus.com' && password === 'adminpass123') {
      setUser({ email, role: 'admin' });
    } else {
      setUser({ email, role: 'member' });
    }
    localStorage.setItem('user', JSON.stringify({ email, role: email === 'admin@padelcygnus.com' ? 'admin' : 'member' }));
    setShowLoginDialog(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const handleSignUp = (userData: UserData) => {
    console.log('New user signed up:', userData)
    setUser({ email: userData.email, role: 'member' })
    setShowSignUpDialog(false)
  }

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = currentMessage.trim()
    if (message) {
      setChatMessages([...chatMessages, { text: message, sender: 'user' }])
      setCurrentMessage('')
      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          text: "¡Gracias por tu mensaje! Un representante te contactará pronto.", 
          sender: 'bot' 
        }]);
      }, 1000)
    }
  }

  const handleMembershipSelection = (plan: MembershipPlan) => {
    setSelectedMembership(plan)
    setShowMembershipDialog(true)
  }

  const handleMembershipConfirmation = () => {
    console.log(`Membership plan confirmed: ${selectedMembership?.title}`)
    setShowMembershipDialog(false)
    // Implement membership confirmation logic here
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (user) {
    if (user.role === 'admin') {
      return <AdminDashboard onLogout={handleLogout} />
    } else {
      return <MemberDashboard onLogout={handleLogout} />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#050a0f] via-[#0d1620] to-[#050a0f]">
      <header className={`px-4 lg:px-6 h-16 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050a0f]/80 backdrop-blur-md' : ''}`}>
        <div className="flex items-center">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="PadelCygnus Logo"
            width={32}
            height={32}
            className="rounded-lg transition-transform duration-300 hover:scale-110"
          />
          <span className="ml-2 text-xl md:text-2xl font-bold text-[#FFDAB9]">PadelCygnus</span>
        </div>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          {['features', 'pricing', 'about', 'contact'].map((section) => (
            <button
              key={section}
              className="text-sm font-medium text-white hover:text-[#FFDAB9] transition-colors duration-300 relative group"
              onClick={() => scrollToSection(section)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#FFDAB9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button
            className="bg-[#B08D57] text-white hover:bg-[#8B7142] transition-colors duration-300"
            onClick={() => setShowLoginDialog(true)}
          >
            <User className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Iniciar Sesión</span>
          </Button>
          <Button
            variant="outline"
            className="border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-white transition-colors duration-300 hidden sm:flex"
            onClick={() => setShowSignUpDialog(true)}
          >
            Registrarse
          </Button>
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <User className="h-6 w-6" /> : <User className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d1620] p-4 fixed top-16 left-0 right-0 z-40 transition-all duration-300 ease-in-out transform">
          <nav className="flex flex-col gap-4">
            {['features', 'pricing', 'about', 'contact'].map((section) => (
              <button
                key={section}
                className="text-sm font-medium text-white hover:text-[#FFDAB9] transition-colors duration-300"
                onClick={() => { scrollToSection(section); setMobileMenuOpen(false); }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <Button
              variant="outline"
              className="border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-white transition-colors duration-300 w-full"
              onClick={() => { setShowSignUpDialog(true); setMobileMenuOpen(false); }}
            >
              Registrarse
            </Button>
          </nav>
        </div>
      )}
      <main className="flex-1 mt-16">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#FFDAB9] animate-fade-in-down">
                  Bienvenido a PadelCygnus
                </h1>
                <p className="mx-auto max-w-[700px] text-white text-sm md:text-base lg:text-xl animate-fade-in-up">
                  Descubre la experiencia definitiva de pádel. Reserva canchas, únete a torneos y mejora tu juego con nosotros.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                <Button className="bg-[#B08D57] text-white hover:bg-[#8B7142] transition-all duration-300 transform hover:scale-105 w-full sm:w-auto" onClick={() => setShowSignUpDialog(true)}>
                  Empieza Ahora
                </Button>
                <Button variant="outline" className="border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-white transition-all duration-300 transform hover:scale-105 w-full sm:w-auto" onClick={() => setShowInfoDialog(true)}>
                  Saber Más
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-[#FFDAB9] animate-fade-in-down">Características</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Gestión de Reservas", description: "Sistema intuitivo para reservar pistas y gestionar horarios", icon: Calendar },
                { title: "Torneos y Eventos", description: "Organiza y participa en torneos y eventos especiales", icon: Trophy },
                { title: "Comunicación Directa", description: "Chat integrado para comunicación con el equipo", icon: MessageSquare },
              ].map((feature: Feature, index: number) => (
                <Card key={index} className="bg-gradient-to-br from-[#1a2a3a] to-[#0d1620] border-[#B08D57] border-opacity-30 transition-all duration-300 hover:shadow-lg hover:shadow-[#B08D57]/20 transform hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-[#FFDAB9] flex items-center">
                      {createElement(feature.icon, { className: "w-6 h-6 mr-2 text-[#B08D57]" })}
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-[#FFDAB9]">Planes de Membresía</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Básico", price: "$50/mes", features: ["Acceso a canchas en horario estándar", "Participación en torneos mensuales", "Descuentos en la tienda del club"] },
                { title: "Premium", price: "$100/mes", features: ["Acceso ilimitado a canchas", "Clases grupales semanales", "Acceso prioritario a torneos", "Descuentos exclusivos en equipamiento"] },
                { title: "VIP", price: "$200/mes", features: ["Acceso ilimitado a todas las instalaciones", "Entrenamiento personal semanal", "Acceso exclusivo a eventos especiales", "Equipamiento personalizado"] },
              ].map((plan: Plan, index: number) => (
                <Card key={index} className="bg-gradient-to-br from-[#1a2a3a] to-[#0d1620] border-[#B08D57] border-opacity-30 transition-all duration-300 hover:shadow-lg hover:shadow-[#B08D57]/20">
                  <CardHeader>
                    <CardTitle className="text-[#FFDAB9]">{plan.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl md:text-3xl font-bold text-[#B08D57]">{plan.price}</p>
                    <ul className="mt-4 space-y-2 text-white text-sm md:text-base">
                      {planFeatures.map((item: PlanFeature, featureIndex: number) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          {createElement(item.icon, { className: "text-[#B08D57] transition-transform duration-300 group-hover:scale-110" })}
                          <span>{item.content}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-[#B08D57] text-white hover:bg-[#8B7142] transition-all duration-300 transform hover:scale-105" onClick={() => handleMembershipSelection(plan)}>Elegir Plan</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-[#FFDAB9] ">Sobre Nosotros</h2>
            <p className="max-w-[700px] text-white text-sm md:text-base lg:text-xl mx-auto text-center">
              PadelCygnus nació de la pasión por el pádel y el deseo de crear una comunidad vibrante de jugadores. Nuestro objetivo es proporcionar las mejores instalaciones y experiencias para todos los amantes de este deporte.
            </p>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 px-4 md:px-6">
          <div className="container mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-8 text-[#FFDAB9]">Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-[#1a2a3a] to-[#0d1620] border-[#B08D57] border-opacity-30 transition-all duration-300 hover:shadow-lg hover:shadow-[#B08D57]/20">
                <CardHeader>
                  <CardTitle className="text-[#FFDAB9]">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactFeatures.map((item: ContactFeature, index: number) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      {createElement(item.icon, { className: "text-[#B08D57] transition-transform duration-300 group-hover:scale-110" })}
                      <span className="text-white group-hover:text-[#FFDAB9] transition-colors duration-300">{item.content}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-[#1a2a3a] to-[#0d1620] border-[#B08D57] border-opacity-30 transition-all duration-300 hover:shadow-lg hover:shadow-[#B08D57]/20">
                <CardHeader>
                  <CardTitle className="text-[#FFDAB9]">Envíanos un Mensaje</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    {[
                      { id: "name", label: "Nombre", type: "text" },
                      { id: "email", label: "Email", type: "email" },
                      { id: "message", label: "Mensaje", type: "textarea" },
                    ].map((field: { id: string, label: string, type: string }, index: number) => (
                      <div key={index}>
                        <label htmlFor={field.id} className="text-white">{field.label}</label>
                        {field.type === "textarea" ? (
                          <textarea id={field.id} className="w-full h-32 bg-[#0d1620] border-[#B08D57] border-opacity-50 text-white rounded-md p-2 focus:ring-2 focus:ring-[#B08D57] transition-all duration-300" />
                        ) : (
                          <input id={field.id} type={field.type} className="bg-[#0d1620] border-[#B08D57] border-opacity-50 text-white focus:ring-2 focus:ring-[#B08D57] transition-all duration-300" />
                        )}
                      </div>
                    ))}
                    <Button className="w-full bg-[#B08D57] text-white hover:bg-[#8B7142] transition-all duration-300 transform hover:scale-105">Enviar Mensaje</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#B08D57]">
        <p className="text-xs text-white"> 2024 PadelCygnus. Todos los derechos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4 text-white hover:text-[#FFDAB9] transition-colors duration-300" href="#">
            Términos de Servicio
          </a>
          <a className="text-xs hover:underline underline-offset-4 text-white hover:text-[#FFDAB9] transition-colors duration-300" href="#">
            Privacidad
          </a>
        </nav>
      </footer>
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-gradient-to-br from-[#1a2a3a] to-[#0d1620] border-[#B08D57] border-opacity-30 w-[90%] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-center text-[#FFDAB9]">Iniciar Sesión</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            handleLogin(formData.get('email') as string, formData.get('password') as string);
          }} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-white">Email</label>
              <input id="email" name="email" type="email" required className="bg-[#0d1620] border-[#B08D57] border-opacity-50 text-white focus:ring-2 focus:ring-[#B08D57] transition-all duration-300" />
            </div>
            <div>
              <label htmlFor="password" className="text-white">Contraseña</label>
              <input id="password" name="password" type="password" required className="bg-[#0d1620] border-[#B08D57] border-opacity-50 text-white focus:ring-2 focus:ring-[#B08D57] transition-all duration-300" />
            </div>
            <Button type="submit" className="w-full bg-[#B08D57] text-white hover:bg-[#8B7142] transition-all duration-300 transform hover:scale-105">
              Iniciar Sesión
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={showSignUpDialog} onOpenChange={setShowSignUpDialog}>
        <DialogContent className="bg-gradient-to-br from-[#1a2a3a] to-[#0d1620] border-[#B08D57] border-opacity-30 w-[90%] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-center text-[#FFDAB9]">Registrarse</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            handleSignUp({
              email: formData.get('email') as string,
              password: formData.get('password') as string,
              name: formData.get('name') as string,
            });
          }} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-white">Nombre</label>
              <input id="name" name="name" required className="bg-[#0d1620] border-[#B08D57] border-opacity-50 text-white focus:ring-2 focus:ring-[#B08D57] transition-all duration-300" />
            </div>
            <div>
              <label htmlFor="email" className="text-white">Email</label>
              <input id="email" name="email" type="email" required className="bg-[#0d1620] border-[#B08D57] border-opacity-50 text-white focus:ring-2 focus:ring-[#B08D57] transition-all duration-300" />
            </div>
            <div>
              <label htmlFor="password" className="text-white">Contraseña</label>
              <input id="password" name="password" type="password" required className="bg-[#0d1620] border-[#B08D57] border-opacity-50 text-white focus:ring-2 focus:ring-[#B08D57] transition-all duration-300" />
            </div>
            <Button type="submit" className="w-full bg-[#B08D57] text-white hover:bg-[#8B7142] transition-all duration-300 transform hover:scale-105">
              Registrarse
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={showMembershipDialog} onOpenChange={setShowMembershipDialog}>
        <DialogContent className="bg-gradient-to-br from-[#1a2a3a] to-[#0d1620] border-[#B08D57] border-opacity-30 w-[90%] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-center text-[#FFDAB9]">Confirmar Membresía</DialogTitle>
          </DialogHeader>
          <div className="text-white">
            <p>Has seleccionado el plan de membresía: <strong>{selectedMembership?.title}</strong></p>
            <p>¿Estás seguro de que deseas continuar con este plan?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMembershipDialog(false)} className="border-[#B08D57] text-[#B08D57] hover:bg-[#B08D57] hover:text-white transition-all duration-300">Cancelar</Button>
            <Button className="bg-[#B08D57] text-white hover:bg-[#8B7142] transition-all duration-300 transform hover:scale-105" onClick={handleMembershipConfirmation}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent className="bg-gradient-to-br from-[#1a2a3a] to-[#0d1620] border-[#B08D57] border-opacity-30 w-[90%] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl font-bold text-center text-[#FFDAB9]">Sobre PadelCygnus</DialogTitle>
          </DialogHeader>
          <div className="text-white space-y-4">
            <p>PadelCygnus es tu destino definitivo para el pádel en Madrid. Ofrecemos:</p>
            <ul className="list-disc list-inside space-y-2">
              {[
                "Canchas de última generación",
                "Clases para todos los niveles",
                "Torneos regulares",
                "Comunidad activa de jugadores",
                "Equipamiento de alta calidad",
              ].map((item: string, index: number) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-[#B08D57]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>Únete a nosotros y lleva tu juego al siguiente nivel.</p>
          </div>
          <DialogFooter>
            <Button className="bg-[#B08D57] text-white hover:bg-[#8B7142] transition-all duration-300 transform hover:scale-105" onClick={() => setShowInfoDialog(false)}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        className="fixed bottom-4 right-4 bg-[#B08D57] text-white hover:bg-[#8B7142] rounded-full p-4 transition-all duration-300 transform hover:scale-110 z-50"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        <User className="h-6 w-6" />
      </Button>
      {showChatbot && (
        <Card className="fixed bottom-20 right-4 w-80 max-w-[calc(100%-2rem)] bg-gradient-to-br from-[#1a2a3a] to-[#0d1620] border-[#B08D57] border-opacity-30 z-50 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-[#FFDAB9] flex justify-between items-center">
              <span>Chat con nosotros</span>
              <Button variant="ghost" size="icon" onClick={() => setShowChatbot(false)}>
                <User className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 overflow-y-auto mb-4 space-y-4">
              {chatMessages.map((message: ChatMessage, index: number) => (
                <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-2 rounded-lg ${message.sender === 'user' ? 'bg-[#B08D57] text-white' : 'bg-gray-700 text-white'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="flex">
              <input
                value={currentMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentMessage(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-grow mr-2 bg-[#0d1620] border-[#B08D57] border-opacity-50 text-white focus:ring-2 focus:ring-[#B08D57] transition-all duration-300"
              />
              <Button type="submit" className="bg-[#B08D57] text-white hover:bg-[#8B7142] transition-all duration-300 transform hover:scale-105">
                <User className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}