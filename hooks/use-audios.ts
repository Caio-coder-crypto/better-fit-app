import { useState, useEffect } from 'react'
import { supabase, type Audio } from '@/lib/supabase'

export function useAudios(category?: string) {
  const [audios, setAudios] = useState<Audio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadAudios()
  }, [category])

  const loadAudios = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase.from('audios').select('*')

      if (category) {
        query = query.eq('category', category)
      }

      const { data, error: err } = await query.order('id', { ascending: true })

      if (err) throw err

      setAudios(data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao carregar áudios'
      setError(message)
      console.error('Erro ao carregar áudios:', err)
    } finally {
      setLoading(false)
    }
  }

  const refetch = async () => {
    await loadAudios()
  }

  return { audios, loading, error, refetch }
}
