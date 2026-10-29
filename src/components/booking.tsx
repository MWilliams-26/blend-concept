import { createContext, useContext } from 'react'
import type { Barber } from '../data/blend'

export const BookingContext = createContext<(barber?: Barber) => void>(() => {})
export const useBooking = () => useContext(BookingContext)
