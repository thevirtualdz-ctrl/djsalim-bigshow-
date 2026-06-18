'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react';

interface AvailabilityCalendarProps {
  onSelectDate: (date: string) => void;
}

const STATIC_BOOKED_DATES = [
  '2026-06-20',
  '2026-06-27',
  '2026-07-04',
  '2026-07-18',
  '2026-08-08',
  '2026-08-15',
  '2026-09-12',
  '2026-09-26',
];

export function AvailabilityCalendar({ onSelectDate }: AvailabilityCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // Commence en Juin 2026 pour la démo
  const [selectedDateStr, setSelectedDateStr] = useState('');
  const [bookedDates, setBookedDates] = useState<string[]>(STATIC_BOOKED_DATES);

  useEffect(() => {
    // Charger aussi les dates du localStorage pour cohérence totale
    const stored = localStorage.getItem('dj_salim_reservations');
    if (stored) {
      try {
        const list = JSON.parse(stored);
        const dates = list.map((item: any) => item.eventDate).filter(Boolean);
        setBookedDates([...STATIC_BOOKED_DATES, ...dates]);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Obtenir le nombre de jours dans le mois
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Obtenir le premier jour du mois (0 = Dimanche, 1 = Lundi, etc.)
  let firstDayIndex = new Date(year, month, 1).getDay();
  // Ajuster pour commencer par le lundi (0 = Lundi, 6 = Dimanche)
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    if (bookedDates.includes(dateStr)) return; // Indisponible
    
    setSelectedDateStr(dateStr);
    onSelectDate(dateStr);
  };

  const days = [];
  // Remplir les jours vides du début de mois
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  // Remplir les jours du mois
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="select-none">
      {/* Header du Calendrier */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-white tracking-wide">
          {monthNames[month]} {year}
        </h4>
        <div className="flex gap-2">
          <button 
            type="button"
            onClick={prevMonth}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-500 mb-2">
        <div>Lu</div>
        <div>Ma</div>
        <div>Me</div>
        <div>Je</div>
        <div>Ve</div>
        <div>Sa</div>
        <div>Di</div>
      </div>

      {/* Jours du mois */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isBooked = bookedDates.includes(dateStr);
          const isSelected = selectedDateStr === dateStr;

          return (
            <button
              key={`day-${day}`}
              type="button"
              disabled={isBooked}
              onClick={() => handleDayClick(day)}
              className={`aspect-square rounded-lg text-xs font-medium flex items-center justify-center transition-all ${
                isBooked 
                  ? 'bg-primary/5 text-primary/30 border border-primary/10 cursor-not-allowed' 
                  : isSelected
                    ? 'bg-primary text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-green-500/10 text-green-400 border border-green-500/10 hover:bg-green-500/30 hover:border-green-500/30'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Légende */}
      <div className="flex gap-4 justify-center mt-6 pt-4 border-t border-white/5 text-xs">
        <div className="flex items-center gap-1.5 text-green-400">
          <span className="w-2.5 h-2.5 rounded bg-green-500/20 border border-green-500/30" />
          <span>Libre</span>
        </div>
        <div className="flex items-center gap-1.5 text-primary/50">
          <span className="w-2.5 h-2.5 rounded bg-primary/10 border border-primary/20" />
          <span>Réservé</span>
        </div>
        <div className="flex items-center gap-1.5 text-white">
          <span className="w-2.5 h-2.5 rounded bg-primary" />
          <span>Sélectionné</span>
        </div>
      </div>
    </div>
  );
}
