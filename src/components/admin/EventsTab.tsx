import { useState } from "react";
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Filter, Download, MapPin, Clock, Users, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { format, isToday, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths, startOfWeek, endOfWeek } from "date-fns";

const demoEvents: Event[] = [
  {
    id: "1",
    title: "Monthly Board Meeting",
    description: "Regular monthly meeting to discuss community matters and upcoming projects.",
    date: new Date(2024, 1, 15, 19, 0), // Feb 15, 2024 at 7:00 PM
    location: "Community Center",
    type: "Meeting" as const,
    rsvpEnabled: false,
  },
  {
    id: "2", 
    title: "Community BBQ",
    description: "Annual community barbecue and social gathering. Bring your family and friends!",
    date: new Date(2024, 2, 23, 17, 0), // Mar 23, 2024 at 5:00 PM
    location: "Community Pool Area",
    type: "Social" as const,
    rsvpEnabled: true,
  },
  {
    id: "3",
    title: "Landscaping Maintenance",
    description: "Scheduled maintenance of common area landscaping and garden beds.",
    date: new Date(2024, 2, 10, 8, 0), // Mar 10, 2024 at 8:00 AM
    location: "Common Areas",
    type: "Maintenance" as const,
    rsvpEnabled: false,
  },
  {
    id: "4",
    title: "Pool Opening Preparation",
    description: "Community volunteers needed to help prepare the pool for summer season.",
    date: new Date(2024, 3, 5, 9, 0), // Apr 5, 2024 at 9:00 AM
    location: "Community Pool",
    type: "Maintenance" as const,
    rsvpEnabled: true,
  },
];

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  type: "Meeting" | "Social" | "Maintenance";
  rsvpEnabled: boolean;
}

type CalendarView = "month" | "week" | "day";

const EventsTab = () => {
  const [events, setEvents] = useState<Event[]>(demoEvents);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<CalendarView>("month");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    location: "",
    type: "Meeting" as Event["type"],
    rsvpEnabled: false,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: new Date(),
      location: "",
      type: "Meeting",
      rsvpEnabled: false,
    });
    setEditingEvent(null);
  };

  const handleCreateEvent = () => {
    if (!formData.title || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and location.",
        variant: "destructive",
      });
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      ...formData,
    };

    setEvents([...events, newEvent]);
    setIsCreateModalOpen(false);
    resetForm();
    
    toast({
      title: "Event Created",
      description: `${newEvent.title} has been scheduled.`,
    });
  };

  const handleEditEvent = () => {
    if (!editingEvent || !formData.title || !formData.location) {
      toast({
        title: "Missing Information", 
        description: "Please fill in title and location.",
        variant: "destructive",
      });
      return;
    }

    const updatedEvents = events.map(event =>
      event.id === editingEvent.id
        ? { ...event, ...formData }
        : event
    );
    
    setEvents(updatedEvents);
    setEditingEvent(null);
    resetForm();
    
    toast({
      title: "Event Updated",
      description: `${formData.title} has been updated.`,
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "Event has been removed from the calendar.",
    });
  };

  const openEditModal = (event: Event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      location: event.location,
      type: event.type,
      rsvpEnabled: event.rsvpEnabled,
    });
    setEditingEvent(event);
  };

  const filteredEvents = events.filter(event => {
    if (typeFilter === "all") return true;
    return event.type.toLowerCase() === typeFilter.toLowerCase();
  });

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => 
      format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  const getTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "Meeting": return "bg-primary text-primary-foreground";
      case "Social": return "bg-secondary text-secondary-foreground";
      case "Maintenance": return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // Calendar navigation
  const navigateMonth = (direction: "prev" | "next") => {
    setSelectedDate(direction === "prev" 
      ? subMonths(selectedDate, 1) 
      : addMonths(selectedDate, 1)
    );
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events & Calendar</h1>
          <p className="text-muted-foreground">Manage community events and activities</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Dialog 
            open={isCreateModalOpen} 
            onOpenChange={(open) => {
              setIsCreateModalOpen(open);
              if (!open) resetForm();
            }}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </DialogTrigger>
            <EventModal
              isEdit={false}
              formData={formData}
              setFormData={setFormData}
              onSave={handleCreateEvent}
              onCancel={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}
            />
          </Dialog>
          
          <Button variant="outline" onClick={() => {
            // TODO: Export functionality
            toast({
              title: "Export Coming Soon",
              description: "Calendar export functionality will be available soon.",
            });
          }}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Calendar Section */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2" />
              Calendar
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <Tabs value={calendarView} onValueChange={(v) => setCalendarView(v as CalendarView)} className="w-auto">
                <TabsList>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="day">Day</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold min-w-[200px] text-center">
                {format(selectedDate, 'MMMM yyyy')}
              </h3>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          {calendarView === "month" && (
            <div className="hidden sm:block">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                month={selectedDate}
                className="rounded-md"
                components={{
                  Day: ({ date, ...props }) => {
                    const dayEvents = getEventsForDate(date);
                    return (
                      <div className="relative">
                        <button
                          {...props}
                          className={`w-full h-12 p-1 text-sm rounded-md transition-colors
                            ${isToday(date) ? 'bg-primary text-primary-foreground' : 
                              isSameMonth(date, selectedDate) ? 'hover:bg-accent' : 'text-muted-foreground'}
                            ${dayEvents.length > 0 ? 'font-semibold' : ''}
                          `}
                        >
                          <div>{format(date, 'd')}</div>
                          {dayEvents.length > 0 && (
                            <div className="flex gap-1 justify-center mt-1">
                              {dayEvents.slice(0, 3).map((event, idx) => (
                                <div
                                  key={idx}
                                  className={`w-1.5 h-1.5 rounded-full ${getTypeColor(event.type).split(' ')[0]}`}
                                />
                              ))}
                              {dayEvents.length > 3 && (
                                <div className="text-xs">+{dayEvents.length - 3}</div>
                              )}
                            </div>
                          )}
                        </button>
                      </div>
                    );
                  }
                }}
              />
            </div>
          )}
          
          {/* Mobile Calendar - Simplified List View */}
          <div className="sm:hidden space-y-2">
            {eachDayOfInterval({
              start: startOfMonth(selectedDate),
              end: endOfMonth(selectedDate)
            }).map(date => {
              const dayEvents = getEventsForDate(date);
              if (dayEvents.length === 0) return null;
              
              return (
                <div key={format(date, 'yyyy-MM-dd')} className="border rounded-lg p-3">
                  <div className="font-semibold text-sm text-foreground mb-2">
                    {format(date, 'EEEE, MMMM d')}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map(event => (
                      <div key={event.id} className="text-sm text-muted-foreground">
                        • {event.title} at {format(event.date, 'h:mm a')}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Events List</CardTitle>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No events found. Create your first event to get started.
              </div>
            ) : (
              filteredEvents.map(event => (
                <article 
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  role="article"
                  aria-label={`Event: ${event.title}`}
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                      <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                      {event.rsvpEnabled && (
                        <Badge variant="outline">RSVP Required</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {format(event.date, 'MMM d, yyyy')} at {format(event.date, 'h:mm a')}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.location}
                      </div>
                      {event.rsvpEnabled && (
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          RSVP Integration TODO
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 sm:mt-0 sm:ml-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditModal(event)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <EventModal
                        isEdit={true}
                        formData={formData}
                        setFormData={setFormData}
                        onSave={handleEditEvent}
                        onCancel={() => {
                          setEditingEvent(null);
                          resetForm();
                        }}
                      />
                    </Dialog>
                    
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Event</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{event.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteEvent(event.id)}>
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </article>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface EventModalProps {
  isEdit: boolean;
  formData: {
    title: string;
    description: string;
    date: Date;
    location: string;
    type: Event["type"];
    rsvpEnabled: boolean;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    date: Date;
    location: string;
    type: Event["type"];
    rsvpEnabled: boolean;
  }>>;
  onSave: () => void;
  onCancel: () => void;
}

const EventModal = ({ isEdit, formData, setFormData, onSave, onCancel }: EventModalProps) => {
  return (
    <DialogContent className="sm:max-w-[500px]" aria-describedby="event-modal-description">
      <DialogHeader>
        <DialogTitle>{isEdit ? 'Edit Event' : 'Create New Event'}</DialogTitle>
        <DialogDescription id="event-modal-description">
          {isEdit ? 'Update the event details below.' : 'Fill in the details for your new event.'}
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="event-title">Title *</Label>
          <Input
            id="event-title"
            placeholder="Event title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            aria-required="true"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="event-description">Description</Label>
          <Textarea
            id="event-description"
            placeholder="Event description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="event-date">Date & Time *</Label>
            <Input
              id="event-date"
              type="datetime-local"
              value={format(formData.date, "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value) })}
              aria-required="true"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="event-type">Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value: Event["type"]) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger id="event-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Meeting">Meeting</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="event-location">Location *</Label>
          <Input
            id="event-location"
            placeholder="Event location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            aria-required="true"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="rsvp-toggle" className="text-sm font-medium">
            Require RSVP
          </Label>
          <Switch
            id="rsvp-toggle"
            checked={formData.rsvpEnabled}
            onCheckedChange={(checked) => setFormData({ ...formData, rsvpEnabled: checked })}
            aria-describedby="rsvp-description"
          />
        </div>
        <p id="rsvp-description" className="text-sm text-muted-foreground -mt-2">
          {formData.rsvpEnabled 
            ? "Residents will need to RSVP for this event (Integration TODO)"
            : "No RSVP required for this event"
          }
        </p>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>
          {isEdit ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </DialogContent>
  );
};

export default EventsTab;