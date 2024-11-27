'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Bell,
  Calendar,
  Clock,
  User,
  CalendarDays,
} from "lucide-react";
import "../styles/gradients.css";

interface Booking {
  id: string;
  courtId: string;
  date: string;
  time: string;
  status: string;
}

interface Tournament {
  id: string;
  name: string;
  date: string;
  participants: number;
  status: string;
}

interface AvailableCourt {
  id: string;
  name: string;
  availability: string[];
}

interface UserNotification {
  id: string;
  title: string;
  message: string;
  time: string;
}

interface MemberDashboardProps {
  onLogout: () => void;
}

export function MemberDashboard({ onLogout }: MemberDashboardProps) {
  // State management
  const [myBookings, setMyBookings] = useState<Booking[]>([
    { id: "1", courtId: "Pista 1", date: "15/03/2024", time: "10:00", status: "Confirmado" },
    { id: "2", courtId: "Pista 3", date: "17/03/2024", time: "14:00", status: "Pendiente" }
  ])

  const [availableCourts] = useState<AvailableCourt[]>([
    { id: "1", name: "Pista 1", availability: ["09:00", "10:00", "11:00"] },
    { id: "2", name: "Pista 2", availability: ["14:00", "15:00", "16:00"] },
    { id: "3", name: "Pista 3", availability: ["09:00", "10:00", "11:00"] }
  ])

  const [myTournaments, setMyTournaments] = useState<Tournament[]>([
    { id: "1", name: "Campeonato de Primavera", date: "20/03/2024", participants: 10, status: "" },
    { id: "2", name: "Liga de Dobles", date: "30/03/2024", participants: 20, status: "" }
  ])

  const [notifications, setNotifications] = useState<UserNotification[]>([
    { id: "1", title: "Reserva Confirmada", message: "Tu reserva de pista para mañana ha sido confirmada", time: "hace 5 minutos" },
    { id: "2", title: "Registro en Torneo", message: "Registro exitoso en el Campeonato de Primavera", time: "hace 1 hora" },
    { id: "3", title: "Actualización de Membresía", message: "Tu membresía premium ha sido renovada", time: "hace 2 horas" }
  ])

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isTournamentModalOpen, setIsTournamentModalOpen] = useState(false);

  // Function to handle booking actions
  const handleBooking = (courtId: string, time: string) => {
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      courtId,
      date: "17/03/2024",
      time,
      status: "Pendiente"
    }
    setMyBookings([...myBookings, newBooking])
  }

  // Function to handle tournament registration
  const handleTournamentRegistration = (tournamentId: string) => {
    setMyTournaments(myTournaments.map(tournament =>
      tournament.id === tournamentId
        ? { ...tournament, participants: tournament.participants + 1 }
        : tournament
    ))
  }

  // Function to clear notification
  const clearNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId))
  }

  // Function to cancel booking
  const cancelBooking = (bookingId: string) => {
    setMyBookings(myBookings.filter(booking => booking.id !== bookingId))
  }

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsBookingModalOpen(true)
  }

  const handleViewTournament = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setIsTournamentModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white gold-glow">Panel de Miembro</h1>
            <p className="text-[#ffd700]/80 mt-2">¡Bienvenido de nuevo!</p>
          </div>
          <Button onClick={onLogout} className="bg-[#B08D57] text-white hover:bg-[#8B7142]">
            Cerrar Sesión
          </Button>
        </div>

        <div className="flex space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gold-border gold-text gold-hover">
                <Bell className="w-4 h-4 mr-2" />
                Notificaciones ({notifications.length})
              </Button>
            </DialogTrigger>
            <DialogContent className="modal-gradient">
              <DialogHeader>
                <DialogTitle className="text-white">Notificaciones</DialogTitle>
                <DialogDescription className="text-[#ffd700]/80">Tus alertas recientes</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between p-4 bg-[#112240] rounded-lg border border-[#ffd700]/20">
                    <div className="flex-1">
                      <p className="font-medium text-white">{notification.title}</p>
                      <p className="text-sm text-[#ffd700]/60">{notification.message}</p>
                      <p className="text-xs text-[#ffd700]/40 mt-1">{notification.time}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#ffd700] hover:bg-[#ffd700]/10"
                      onClick={() => clearNotification(notification.id)}
                    >
                      Borrar
                    </Button>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#ffd700] text-[#0a192f] hover:bg-[#ffd700]/90">
                <Calendar className="w-4 h-4 mr-2" />
                Reservar Pista
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a192f] border-[#ffd700]">
              <DialogHeader>
                <DialogTitle className="text-white">Reservar una Pista</DialogTitle>
                <DialogDescription className="text-[#ffd700]/80">Selecciona tu horario preferido</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {availableCourts.map((court) => (
                  <div key={court.id} className="p-4 bg-[#112240] rounded-lg border border-[#ffd700]/20">
                    <h3 className="text-white font-medium mb-2">{court.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {court.availability.map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          size="sm"
                          className="gold-border gold-text gold-hover"
                          onClick={() => handleBooking(court.name, time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="gradient-card card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-white">Próxima Reserva</CardTitle>
                <Clock className="w-4 h-4 text-[#ffd700]" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">Pista {myBookings[0].courtId}</p>
                <p className="text-sm text-gray-400">{myBookings[0].date} a las {myBookings[0].time}</p>
                <Button 
                  onClick={() => handleViewBooking(myBookings[0])}
                  className="mt-4 w-full bg-[#1a2744] text-[#ffd700] hover:bg-[#243555] border border-[#ffd700]/20"
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>

            <Card className="gradient-card card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-white">Partidos Mensuales</CardTitle>
                <CalendarDays className="w-4 h-4 text-[#ffd700]" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">12 Partidos</p>
                <p className="text-sm text-gray-400">Este mes</p>
                <Button 
                  className="mt-4 w-full bg-[#1a2744] text-[#ffd700] hover:bg-[#243555] border border-[#ffd700]/20"
                >
                  Ver Historial
                </Button>
              </CardContent>
            </Card>

            <Card className="gradient-card card-hover">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-white">Estado de Membresía</CardTitle>
                <User className="w-4 h-4 text-[#ffd700]" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-white">Activa</p>
                <p className="text-sm text-gray-400">Hasta 31/12/2024</p>
                <Button 
                  className="mt-4 w-full bg-[#1a2744] text-[#ffd700] hover:bg-[#243555] border border-[#ffd700]/20"
                >
                  Ver Perfil
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="gradient-card card-hover">
              <CardHeader>
                <CardTitle className="text-white">Próximas Reservas</CardTitle>
                <CardDescription className="text-gray-400">Tus reservas programadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-white">Pista {booking.courtId}</p>
                        <p className="text-sm text-gray-400">{booking.date} - {booking.time}</p>
                      </div>
                      <Button
                        onClick={() => handleViewBooking(booking)}
                        variant="outline"
                        size="sm"
                        className="gold-border gold-text gold-hover"
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="gradient-card card-hover">
              <CardHeader>
                <CardTitle className="text-white">Torneos</CardTitle>
                <CardDescription className="text-gray-400">Competencias próximas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myTournaments.slice(0, 3).map((tournament) => (
                    <div key={tournament.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-white">{tournament.name}</p>
                        <p className="text-sm text-gray-400">{tournament.date}</p>
                      </div>
                      <Button
                        onClick={() => handleViewTournament(tournament)}
                        variant="outline"
                        size="sm"
                        className="gold-border gold-text gold-hover"
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="gradient-card card-hover">
            <CardHeader>
              <CardTitle className="text-white">Mis Reservas</CardTitle>
              <CardDescription className="text-gray-400">Ver y gestionar tus reservas de pistas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-[#0f1729] rounded-lg border border-[#1a2744]">
                    <div>
                      <p className="font-medium text-white">{booking.courtId}</p>
                      <p className="text-sm text-gray-400">{booking.date} a las {booking.time}</p>
                      <p className="text-xs text-gray-400">Estado: {booking.status}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gold-border gold-text gold-hover">
                            Ver Detalles
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="modal-gradient">
                          <DialogHeader>
                            <DialogTitle className="text-white">Detalles de la Reserva</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-gray-400">Pista</Label>
                                <p className="text-white">{booking.courtId}</p>
                              </div>
                              <div>
                                <Label className="text-gray-400">Fecha</Label>
                                <p className="text-white">{booking.date}</p>
                              </div>
                              <div>
                                <Label className="text-gray-400">Hora</Label>
                                <p className="text-white">{booking.time}</p>
                              </div>
                              <div>
                                <Label className="text-gray-400">Estado</Label>
                                <p className="text-white">{booking.status}</p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button 
                              variant="destructive"
                              onClick={() => cancelBooking(booking.id)}
                            >
                              Cancelar Reserva
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="gradient-card card-hover">
            <CardHeader>
              <CardTitle className="text-white">Centro de Torneos</CardTitle>
              <CardDescription className="text-gray-400">Ver y registrarse en torneos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myTournaments.map((tournament) => (
                  <div key={tournament.id} className="flex items-center justify-between p-4 bg-[#0f1729] rounded-lg border border-[#1a2744]">
                    <div>
                      <p className="font-medium text-white">{tournament.name}</p>
                      <p className="text-sm text-gray-400">Comienza: {tournament.date}</p>
                      <p className="text-xs text-gray-400">Estado: {tournament.participants} participantes</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gold-border gold-text gold-hover"
                        onClick={() => handleTournamentRegistration(tournament.id)}
                      >
                        Registrarse
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="gradient-card card-hover">
            <CardHeader>
              <CardTitle className="text-white">Mi Perfil</CardTitle>
              <CardDescription className="text-gray-400">Gestionar información personal</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Nombre Completo</Label>
                  <Input 
                    defaultValue="John Doe" 
                    className="bg-[#0f1729] border-[#1a2744] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Correo Electrónico</Label>
                  <Input 
                    type="email" 
                    defaultValue="john@example.com" 
                    className="bg-[#0f1729] border-[#1a2744] text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Teléfono</Label>
                  <Input 
                    defaultValue="+1 234 567 890" 
                    className="bg-[#0f1729] border-[#1a2744] text-white"
                  />
                </div>
                <Button type="submit" className="bg-[#ffd700] text-[#0a192f] hover:bg-[#ffd700]/90">
                  Guardar Cambios
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Add modals for bookings and tournaments */}
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogContent className="modal-gradient">
            <DialogHeader>
              <DialogTitle className="text-white">Detalles de la Reserva</DialogTitle>
            </DialogHeader>
            {selectedBooking && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Pista</p>
                    <p className="text-white">{selectedBooking.courtId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Fecha</p>
                    <p className="text-white">{selectedBooking.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Hora</p>
                    <p className="text-white">{selectedBooking.time}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Dialog open={isTournamentModalOpen} onOpenChange={setIsTournamentModalOpen}>
          <DialogContent className="modal-gradient">
            <DialogHeader>
              <DialogTitle className="text-white">Detalles del Torneo</DialogTitle>
            </DialogHeader>
            {selectedTournament && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Nombre</p>
                    <p className="text-white">{selectedTournament.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Fecha</p>
                    <p className="text-white">{selectedTournament.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Participantes</p>
                    <p className="text-white">{selectedTournament.participants}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
