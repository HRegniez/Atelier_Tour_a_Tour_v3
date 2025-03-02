import { createClient } from '@supabase/supabase-js'
import { useCallback, useMemo } from 'react'

export const useSupabase = () => {
  const supabase = useMemo(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    return createClient(supabaseUrl, supabaseKey)
  }, [])

  const getMarchesLocaux = useCallback(async () => {
    const { data, error } = await supabase
      .from('marches_locaux')
      .select('*')

    if (error) {
      console.error('Error fetching marches locaux:', error)
      return { data: null, error }
    }

    return { data, error: null }
  }, [])

  const getTarifs = useCallback(async () => {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        prices (
          id,
          name,
          price
        )
      `)
      .order('created_at')

    if (error) {
      console.error('Error fetching tarifs:', error)
      return []
    }

    return data
  }, [])

  const getImages = useCallback(async () => {
    const { data, error } = await supabase
      .storage
      .from('images_small')
      .list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      })

    if (error) {
      console.error('Error fetching images:', error)
      return { data: null, error }
    }

    // Transform the data to include public URLs
    const imagesWithUrls = data.map(file => ({
      id: file.id,
      url: supabase.storage.from('images_small').getPublicUrl(file.name).data.publicUrl,
      alt: file.name.split('.')[0] // Use filename as alt text
    }))

    return { data: imagesWithUrls, error: null }
  }, [])

  const updateMarchesLocaux = useCallback(async (markets) => {
    // Separate existing records and new records
    const existingMarkets = markets.filter(market => !String(market.id).startsWith('temp-'))
    const newMarkets = markets.filter(market => String(market.id).startsWith('temp-'))

    try {
      // Handle updates for existing records
      if (existingMarkets.length > 0) {
        const { data: updatedData, error: updateError } = await supabase
          .from('marches_locaux')
          .upsert(existingMarkets)
          .select()

        if (updateError) {
          console.error('Error updating existing markets:', updateError)
          return { data: null, error: updateError }
        }
      }

      // Handle insertions for new records
      if (newMarkets.length > 0) {
        // Remove the temporary IDs before insertion
        const marketsToInsert = newMarkets.map(({ id, ...rest }) => rest)
        
        const { data: insertedData, error: insertError } = await supabase
          .from('marches_locaux')
          .insert(marketsToInsert)
          .select()

        if (insertError) {
          console.error('Error inserting new markets:', insertError)
          return { data: null, error: insertError }
        }
      }

      // Fetch all updated records
      const { data: finalData, error: fetchError } = await supabase
        .from('marches_locaux')
        .select('*')
        .order('id')

      if (fetchError) {
        console.error('Error fetching updated markets:', fetchError)
        return { data: null, error: fetchError }
      }

      return { data: finalData, error: null }
    } catch (error) {
      console.error('Error in updateMarchesLocaux:', error)
      return { data: null, error }
    }
  }, [])

  return useMemo(() => ({
    getMarchesLocaux,
    getTarifs,
    getImages,
    updateMarchesLocaux,
  }), [getMarchesLocaux, getTarifs, getImages, updateMarchesLocaux])
} 