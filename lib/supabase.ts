import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://btbdqtjbvbeppxuudsbo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0YmRxdGpidmJlcHB4dXVkc2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNDIwNTEsImV4cCI6MjA4NTgxODA1MX0.q6uJQwnXZeOxCpcQdF5CXmH02j5KOQNPqzUUwWnkIFc'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Tipos para o banco de dados
export interface Exercise {
  id: number
  title: string
  type: 'home' | 'gym'
  description: string
  video_url?: string
  created_at?: string
}

export interface Meal {
  id: number
  name: string
  time: string
  calories: number
  ingredients: string[]
  day: string
  created_at?: string
}

export interface Audio {
  id: number
  title: string
  duration: string
  category: string
  thumbnail?: string
  url: string
  created_at?: string
}

export interface Profile {
  id: string
  email: string
  subscription_status: 'free' | 'premium'
  created_at?: string
  updated_at?: string
}
