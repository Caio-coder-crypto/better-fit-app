import { useState, useEffect } from 'react'
import { supabase, type Exercise } from '@/lib/supabase'

export function useExercises(type: 'home' | 'gym') {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadExercises()
  }, [type])

  const loadExercises = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error: err } = await supabase
        .from('exercises')
        .select('*')
        .eq('type', type)
        .order('id', { ascending: true })

      if (err) throw err

      setExercises(data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar exercícios'
      setError(message)
      console.error('Erro ao carregar exercícios:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await loadExercises()
  }

  return { exercises, loading, error, refetch }
}
