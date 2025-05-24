
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TimeSlot {
  time: string;
  available: boolean;
}

const ConsultationWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [userTimezone, setUserTimezone] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    serviceType: '',
  });
  const { toast } = useToast();

  // Detect user timezone
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
  }, []);

  // Generate available time slots
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    
    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        available: Math.random() > 0.3, // Simulate availability
      });
      slots.push({
        time: `${hour.toString().padStart(2, '0')}:30`,
        available: Math.random() > 0.3,
      });
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Generate next 7 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          }),
        });
      }
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      // Here you would integrate with your calendar system (Calendly, etc.)
      const bookingData = {
        ...formData,
        date: selectedDate,
        time: selectedTime,
        timezone: userTimezone,
        timestamp: new Date().toISOString(),
      };

      // Simulate API call
      console.log('Booking data:', bookingData);
      
      toast({
        title: "Consultation Booked!",
        description: `Your consultation is scheduled for ${new Date(selectedDate).toLocaleDateString()} at ${selectedTime}`,
      });

      setIsOpen(false);
      setStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        serviceType: '',
      });
      setSelectedDate('');
      setSelectedTime('');
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error booking your consultation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return selectedDate && selectedTime;
      case 2:
        return formData.name && formData.email && formData.serviceType;
      default:
        return false;
    }
  };

  return (
    <>
      {/* Quick Booking Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg animate-pulse"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Quick Consultation
      </Button>

      {/* Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Book Free Consultation</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </Button>
              </CardTitle>
              <div className="text-sm text-gray-500">
                Your timezone: {userTimezone}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {step === 1 && (
                <>
                  <div>
                    <Label className="text-base font-medium">Select Date</Label>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      {availableDates.map((date) => (
                        <Button
                          key={date.value}
                          variant={selectedDate === date.value ? "default" : "outline"}
                          className="justify-start"
                          onClick={() => setSelectedDate(date.value)}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          {date.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div>
                      <Label className="text-base font-medium">Select Time</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot.time}
                            variant={selectedTime === slot.time ? "default" : "outline"}
                            size="sm"
                            disabled={!slot.available}
                            onClick={() => setSelectedTime(slot.time)}
                            className="text-xs"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Your phone number"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        placeholder="Your company name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="serviceType">Service Interest *</Label>
                      <select
                        id="serviceType"
                        value={formData.serviceType}
                        onChange={(e) => handleInputChange('serviceType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select a service</option>
                        <option value="ai-automation">AI Automation</option>
                        <option value="ai-tools">AI Tool Development</option>
                        <option value="web3">Web3 Development</option>
                        <option value="web-development">Web Development</option>
                        <option value="growth-hacking">Growth Hacking</option>
                        <option value="devops">DevOps</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message">Project Details</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your project..."
                        rows={3}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex space-x-2 pt-4">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                
                {step < 2 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!isStepValid()}
                    className="flex-1"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={!isStepValid()}
                    className="flex-1"
                  >
                    Book Consultation
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ConsultationWidget;
