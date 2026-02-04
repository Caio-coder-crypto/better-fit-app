import { useState, useEffect } from 'react'
import { supabase, type Meal } from '@/lib/supabase'

export function useMeals(day: string) {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadMeals()
  }, [day])

  const loadMeals = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: err } = await supabase
        .from('meals')
        .select('*')
        .eq('day', day)
        .order('time', { ascending: true })

      if (err) throw err

      setMeals(data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar refeições'
      setError(message)
      console.error('Erro ao carregar refeições:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await loadMeals()
  }

  return { meals, loading, error, refetch }
}
