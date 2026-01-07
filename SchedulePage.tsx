import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Calendar: React.FC<{ selectedDate: Date; onDateSelect: (date: Date) => void; }> = ({ selectedDate, onDateSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (currentMonth === today.getMonth() && currentYear === today.getFullYear()) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < today;
  };

  return (
    <div className="bg-dark-neutral p-6 rounded-lg shadow-md border border-light-neutral/50">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} disabled={currentMonth === today.getMonth() && currentYear === today.getFullYear()} className="text-light-text/70 hover:text-light-text disabled:opacity-50 transition-colors duration-300">&larr;</button>
        <h3 className="text-xl font-semibold text-light-text">{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <button onClick={handleNextMonth} className="text-light-text/70 hover:text-light-text transition-colors duration-300">&rarr;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center text-light-text/60 text-sm">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
        {Array.from({ length: daysInMonth }).map((_, day) => {
          const dayNumber = day + 1;
          const isSelected = selectedDate.getDate() === dayNumber && selectedDate.getMonth() === currentMonth && selectedDate.getFullYear() === currentYear;
          const isToday = today.getDate() === dayNumber && today.getMonth() === currentMonth && today.getFullYear() === currentYear;
          const dateIsPast = isPast(dayNumber);
          
          return (
            <button
              key={dayNumber}
              onClick={() => onDateSelect(new Date(currentYear, currentMonth, dayNumber))}
              disabled={dateIsPast}
              className={`w-10 h-10 rounded-full transition-colors duration-200 ${
                dateIsPast ? 'text-light-neutral cursor-not-allowed' : 
                isSelected ? 'bg-primary text-dark-bg font-bold' : 
                isToday ? 'bg-light-neutral text-primary' : 'hover:bg-light-neutral text-light-text'
              }`}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const TimeSlots: React.FC<{ selectedDate: Date; selectedTime: string; onTimeSelect: (time: string) => void }> = ({ selectedDate, selectedTime, onTimeSelect }) => {
    const generateTimeSlots = (date: Date): string[] => {
        const seed = date.getDate() * (date.getMonth() + 1);
        const dayOfWeek = date.getDay();
        const baseSlots = [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
            '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'
        ];

        // Fewer slots on weekends
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            return []; // No slots on weekends
        }

        // Simulate random availability
        return baseSlots.filter((_, i) => (seed + i) % (i % 3 + 2) !== 0);
    };

    const availableTimes = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);

    if (availableTimes.length === 0) {
        return (
            <div className="text-center text-light-text/60 p-8 bg-dark-neutral rounded-lg shadow-md border border-light-neutral/50">
                No available sessions on this day. Please select another date.
            </div>
        );
    }
    
    return (
        <div className="bg-dark-neutral p-6 rounded-lg shadow-md border border-light-neutral/50">
            <h3 className="text-xl font-semibold text-light-text mb-4 text-center">Available Times</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableTimes.map(time => (
                    <button
                        key={time}
                        onClick={() => onTimeSelect(time)}
                        className={`p-3 rounded-lg text-lg transition-colors duration-300 ${selectedTime === time ? 'bg-primary text-dark-bg ring-2 ring-primary-light' : 'bg-dark-bg text-light-text hover:bg-light-neutral'}`}
                    >
                        {time}
                    </button>
                ))}
            </div>
        </div>
    );
};


const SchedulePage: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
    const [isBooked, setIsBooked] = useState(false);
    
    // Ensure selected date is not in the past
    useEffect(() => {
        const today = new Date();
        today.setHours(0,0,0,0);
        if (selectedDate < today) {
            setSelectedDate(today);
        }
    }, []);

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setSelectedTime(''); // Reset time when date changes
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedTime && name) {
            setIsBooked(true);
        }
    };
    
    if (isBooked) {
        return (
             <div className="container mx-auto px-6 py-12 md:py-20 text-center animate-fade-in-up">
                <div className="bg-dark-neutral p-12 rounded-xl max-w-lg mx-auto shadow-lg border border-light-neutral/50">
                    <h1 className="text-3xl font-bold text-primary mb-4">Session Confirmed!</h1>
                    <p className="text-light-text/90 mb-6">Your confidential session has been booked. You will receive a (simulated) confirmation email shortly.</p>
                    <div className="text-left bg-dark-bg p-4 rounded-lg mb-8">
                        <p><strong className="text-light-text/60">Name/Alias:</strong> {name}</p>
                        <p><strong className="text-light-text/60">Date:</strong> {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><strong className="text-light-text/60">Time:</strong> {selectedTime}</p>
                    </div>
                    <button onClick={() => setIsBooked(false)} className="bg-primary hover:bg-primary-dark text-dark-bg font-bold py-2 px-6 rounded-lg transition-colors duration-300 mr-4">
                        Book Another
                    </button>
                    <Link to="/" className="text-light-text/70 hover:text-light-text transition-colors duration-300">
                        Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-6 py-12 md:py-20">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-light-text">Schedule a Confidential Session</h1>
                <p className="max-w-2xl mx-auto text-light-text/70 mt-4">Take the next step. Book a free, private session with a university counselor. We're here to listen.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold text-light-text mb-4">1. Select a Date</h2>
                        <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />
                    </div>
                    <div>
                         <h2 className="text-2xl font-bold text-light-text mb-4">2. Choose a Time</h2>
                         <TimeSlots selectedDate={selectedDate} selectedTime={selectedTime} onTimeSelect={setSelectedTime}/>
                    </div>
                </div>

                <div className="bg-dark-neutral p-8 rounded-xl shadow-lg border border-light-neutral/50">
                    <h2 className="text-2xl font-bold text-light-text mb-6">3. Confirm Your Session</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-light-text/80">Name or Alias</label>
                             <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full bg-dark-bg border border-light-neutral/80 rounded-md shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-primary focus:border-primary" />
                            <p className="text-xs text-light-text/50 mt-1">Your privacy is respected. Feel free to use a name you're comfortable with.</p>
                        </div>
                         <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-light-text/80">Reason for session (optional)</label>
                            <textarea id="reason" rows={4} value={reason} onChange={e => setReason(e.target.value)} className="mt-1 block w-full bg-dark-bg border border-light-neutral/80 rounded-md shadow-sm py-2 px-3 text-light-text focus:outline-none focus:ring-primary focus:border-primary" placeholder="e.g., Academic stress, feeling anxious, etc."></textarea>
                        </div>
                        <div className="bg-dark-bg p-4 rounded-lg">
                           <p className="font-semibold text-light-text">Your Selection:</p>
                           {selectedTime ? (
                            <p className="text-primary">{selectedDate.toLocaleDateString(undefined, {weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}</p>
                           ) : (
                            <p className="text-light-text/70">Please select a date and time.</p>
                           )}
                        </div>
                        <div>
                            <button type="submit" disabled={!selectedTime || !name} className="w-full bg-primary hover:bg-primary-dark text-dark-bg font-bold py-3 px-4 rounded-md transition-colors duration-300 disabled:bg-light-neutral disabled:cursor-not-allowed">
                                Book Session
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;
