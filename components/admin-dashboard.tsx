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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  PlusCircle,
  Clock,
  Users,
  Calendar,
  DollarSign,
  Eye,
  Trophy,
} from "lucide-react";

import "../styles/gradients.css";

interface Booking {
  id: string;
  courtId: string;
  memberId: string;
  date: string;
  time: string;
  status: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  membershipType: string;
}

interface Tournament {
  id: string;
  name: string;
  date: string;
  participants: number;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  // State for notifications and actions
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: "Nuevo Registro de Miembro", message: "John Smith se ha registrado como miembro", time: "hace 5 minutos", type: "info" },
    { id: 2, title: "Mantenimiento de Pista", message: "Mantenimiento de Pista 2 programado para mañana", time: "hace 1 hora", type: "warning" },
    { id: 3, title: "Actualización de Torneo", message: "Las inscripciones para el Campeonato de Primavera están abiertas", time: "hace 2 horas", type: "success" }
  ])

  const [members, setMembers] = useState<Member[]>([
    { id: "1", name: "John Smith", email: "john@example.com", membershipType: "Premium" },
    { id: "2", name: "Sarah Johnson", email: "sarah@example.com", membershipType: "Estándar" },
    { id: "3", name: "Mike Wilson", email: "mike@example.com", membershipType: "Premium" }
  ])

  const [tournaments, setTournaments] = useState<Tournament[]>([
    { id: "1", name: "Campeonato de Primavera", date: "20/03/2024", participants: 12 },
    { id: "2", name: "Liga de Verano", date: "15/06/2024", participants: 0 },
    { id: "3", name: "Copa de Dobles", date: "10/04/2024", participants: 8 }
  ])

  const [bookings, setBookings] = useState<Booking[]>([
    { id: "1", courtId: "1", memberId: "1", date: "15/03/2024", time: "10:00", status: "Pendiente" },
    { id: "2", courtId: "2", memberId: "2", date: "15/03/2024", time: "14:00", status: "Pendiente" },
    { id: "3", courtId: "3", memberId: "3", date: "16/03/2024", time: "11:00", status: "Confirmado" }
  ])

  // Add state for modals and selected items
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  // Function to handle booking actions
  const handleBookingAction = (action: string, bookingId: string) => {
    if (action === 'approve') {
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'Confirmado' } : booking
      ));
    } else if (action === 'reject') {
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    }
    console.log(`${action} booking ${bookingId}`);
  };

  // Function to handle member actions
  const handleMemberAction = (action: string, memberId: string) => {
    if (action === 'delete') {
      setMembers(members.filter(member => member.id !== memberId))
    }
  }

  // Function to handle tournament actions
  const handleTournamentAction = (action: string, tournamentId: string) => {
    if (action === 'delete') {
      setTournaments(tournaments.filter(tournament => tournament.id !== tournamentId))
    }
  }

  // Function to clear notification
  const clearNotification = (notificationId: number) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId))
  }

  // Function to view booking details
  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsBookingModalOpen(true);
  };

  // Sample data
  const recentBookings = [
    { id: "1", member: "John Doe", court: "Pista 1", time: "10:00", date: "15/03/2024" },
    { id: "2", member: "Jane Smith", court: "Pista 2", time: "11:30", date: "15/03/2024" },
    { id: "3", member: "Mike Johnson", court: "Pista 3", time: "14:00", date: "15/03/2024" },
  ]

  const upcomingTournaments = [
    { id: "1", name: "Campeonato de Primavera", date: "20/03/2024", participants: 16 },
    { id: "2", name: "Torneo Juvenil", date: "25/03/2024", participants: 8 },
    { id: "3", name: "Liga de Dobles", date: "30/03/2024", participants: 24 },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white gold-glow">Panel de Administración</h1>
            <p className="text-[#ffd700]/80 mt-2">¡Bienvenido de nuevo!</p>
          </div>
          <Button onClick={onLogout} className="bg-[#B08D57] text-white hover:bg-[#8B7142]">
            Cerrar Sesión
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#FFDAB9]">Panel de Administración</h1>
            <p className="text-[#B08D57]">Gestiona tu club de pádel</p>
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
                  <DialogDescription className="text-[#ffd700]/80">Alertas y actualizaciones recientes</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-center justify-between p-4 bg-[#0a192f] rounded-lg border border-[#ffd700]/20">
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
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Agregar Miembro
                </Button>
              </DialogTrigger>
              <DialogContent className="modal-gradient">
                <DialogHeader>
                  <DialogTitle className="text-white">Agregar Nuevo Miembro</DialogTitle>
                  <DialogDescription className="text-[#ffd700]/80">Ingrese los detalles del miembro a continuación</DialogDescription>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Nombre Completo</Label>
                    <Input id="name" placeholder="John Doe" className="bg-[#112240] border-[#ffd700]/20 text-white placeholder:text-white/50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Correo Electrónico</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-[#112240] border-[#ffd700]/20 text-white placeholder:text-white/50" />
                  </div>
                </form>
                <DialogFooter>
                  <Button type="submit" className="bg-[#ffd700] text-[#0a192f] hover:bg-[#ffd700]/90">Agregar Miembro</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-[#112240] border-b border-[#ffd700]/20">
            <TabsTrigger 
              value="overview" 
              className="text-white data-[state=active]:text-[#ffd700]"
            >
              Vista General
            </TabsTrigger>
            <TabsTrigger 
              value="bookings"
              className="text-white data-[state=active]:text-[#ffd700]"
            >
              Reservas
            </TabsTrigger>
            <TabsTrigger 
              value="members"
              className="text-white data-[state=active]:text-[#ffd700]"
            >
              Miembros
            </TabsTrigger>
            <TabsTrigger 
              value="tournaments"
              className="text-white data-[state=active]:text-[#ffd700]"
            >
              Torneos
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="text-white data-[state=active]:text-[#ffd700]"
            >
              Ajustes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="gradient-card card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-white">Estadísticas Generales</CardTitle>
                  <Users className="w-4 h-4 text-[#ffd700]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">1,234</div>
                  <p className="text-xs text-[#ffd700]/60">+12% desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card className="gradient-card card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-white">Reservas Hoy</CardTitle>
                  <Calendar className="w-4 h-4 text-[#ffd700]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">89%</div>
                  <p className="text-xs text-[#ffd700]/60">Uso de pistas hoy</p>
                </CardContent>
              </Card>
              <Card className="gradient-card card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-white">Ingresos Mensuales</CardTitle>
                  <DollarSign className="w-4 h-4 text-[#ffd700]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">$12,450</div>
                  <p className="text-xs text-[#ffd700]/60">+8% desde el mes pasado</p>
                </CardContent>
              </Card>
              <Card className="gradient-card card-hover">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium text-white">Pistas Activas</CardTitle>
                  <Clock className="w-4 h-4 text-[#ffd700]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">6/8</div>
                  <p className="text-xs text-[#ffd700]/60">Pistas en uso actualmente</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="gradient-card card-hover">
                <CardHeader>
                  <CardTitle className="text-white">Reservas Recientes</CardTitle>
                  <CardDescription className="text-[#ffd700]/80">Últimas reservas de pistas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-[#0a192f] rounded-lg border border-[#ffd700]/20">
                        <div>
                          <p className="font-medium text-white">{booking.member}</p>
                          <p className="text-sm text-[#ffd700]/60">{booking.court} - {booking.time}</p>
                        </div>
                        <Button variant="outline" size="sm" className="gold-border gold-text gold-hover">
                          <Eye className="w-4 h-4 mr-2" />
                          Ver
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-card card-hover">
                <CardHeader>
                  <CardTitle className="text-white">Próximos Torneos</CardTitle>
                  <CardDescription className="text-[#ffd700]/80">Torneos programados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTournaments.map((tournament) => (
                      <div key={tournament.id} className="flex items-center justify-between p-4 bg-[#0a192f] rounded-lg border border-[#ffd700]/20">
                        <div>
                          <p className="font-medium text-white">{tournament.name}</p>
                          <p className="text-sm text-[#ffd700]/60">{tournament.date} - {tournament.participants} participantes</p>
                        </div>
                        <Button variant="outline" size="sm" className="gold-border gold-text gold-hover">
                          <Trophy className="w-4 h-4 mr-2" />
                          Detalles
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="gradient-card card-hover">
              <CardHeader>
                <CardTitle className="text-white">Gestión de Reservas</CardTitle>
                <CardDescription className="text-[#ffd700]/80">Ver y gestionar reservas de pistas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-[#0a192f] rounded-lg border border-[#ffd700]/20">
                      <div>
                        <p className="font-medium text-white">{booking.courtId}</p>
                        <p className="text-sm text-[#ffd700]/60">{booking.memberId}</p>
                        <p className="text-xs text-[#ffd700]/40">{booking.date} - {booking.time}</p>
                      </div>
                      <div className="flex space-x-2">
                        {booking.status === 'Pendiente' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="gold-border gold-text gold-hover"
                              onClick={() => handleBookingAction('approve', booking.id)}
                            >
                              Aprobar
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleBookingAction('reject', booking.id)}
                            >
                              Rechazar
                            </Button>
                          </>
                        )}
                        {booking.status === 'Confirmado' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gold-border gold-text gold-hover"
                          >
                            Confirmado
                          </Button>
                        )}
                        <Button
                          onClick={() => handleViewBooking(booking)}
                          variant="outline"
                          size="sm"
                          className="gold-border gold-text gold-hover"
                        >
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members">
            <Card className="gradient-card card-hover">
              <CardHeader>
                <CardTitle className="text-white">Gestión de Miembros</CardTitle>
                <CardDescription className="text-[#ffd700]/80">Ver y gestionar miembros del club</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-[#0a192f] rounded-lg border border-[#ffd700]/20">
                      <div>
                        <p className="font-medium text-white">{member.name}</p>
                        <p className="text-sm text-[#ffd700]/60">{member.email}</p>
                        <p className="text-xs text-[#ffd700]/40">Miembro desde: {member.membershipType}</p>
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
                              <DialogTitle className="text-white">Detalles del Miembro</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-[#ffd700]">Nombre</Label>
                                  <p className="text-white">{member.name}</p>
                                </div>
                                <div>
                                  <Label className="text-[#ffd700]">Email</Label>
                                  <p className="text-white">{member.email}</p>
                                </div>
                                <div>
                                  <Label className="text-[#ffd700]">Membresía</Label>
                                  <p className="text-white">{member.membershipType}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleMemberAction('delete', member.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tournaments">
            <Card className="gradient-card card-hover">
              <CardHeader>
                <CardTitle className="text-white">Gestión de Torneos</CardTitle>
                <CardDescription className="text-[#ffd700]/80">Gestionar próximos torneos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tournaments.map((tournament) => (
                    <div key={tournament.id} className="flex items-center justify-between p-4 bg-[#0a192f] rounded-lg border border-[#ffd700]/20">
                      <div>
                        <p className="font-medium text-white">{tournament.name}</p>
                        <p className="text-sm text-[#ffd700]/60">Inicio: {tournament.date}</p>
                        <p className="text-xs text-[#ffd700]/40">Participantes: {tournament.participants}</p>
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
                              <DialogTitle className="text-white">Detalles del Torneo</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label className="text-[#ffd700]">Nombre</Label>
                                  <p className="text-white">{tournament.name}</p>
                                </div>
                                <div>
                                  <Label className="text-[#ffd700]">Fecha de Inicio</Label>
                                  <p className="text-white">{tournament.date}</p>
                                </div>
                                <div>
                                  <Label className="text-[#ffd700]">Participantes</Label>
                                  <p className="text-white">{tournament.participants}</p>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleTournamentAction('delete', tournament.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="gradient-card card-hover">
              <CardHeader>
                <CardTitle className="text-white">Configuración del Club</CardTitle>
                <CardDescription className="text-[#ffd700]/80">Gestionar la configuración general</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clubName" className="text-white">Nombre del Club</Label>
                    <Input 
                      id="clubName" 
                      defaultValue="Padel Cygnus" 
                      className="bg-[#112240] border-[#ffd700]/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clubEmail" className="text-white">Email de Contacto</Label>
                    <Input 
                      id="clubEmail" 
                      type="email" 
                      defaultValue="info@padelcygnus.com" 
                      className="bg-[#112240] border-[#ffd700]/20 text-white"
                    />
                  </div>
                  <Button type="submit" className="bg-[#ffd700] text-[#0a192f] hover:bg-[#ffd700]/90">
                    Guardar Cambios
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add modals */}
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
                <div>
                  <p className="text-sm text-gray-400">Estado</p>
                  <p className="text-white">{selectedBooking.status}</p>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  variant="destructive"
                  onClick={() => {
                    handleBookingAction('reject', selectedBooking.id)
                    setIsBookingModalOpen(false)
                  }}
                >
                  Cancelar Reserva
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
