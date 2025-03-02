import { Suspense, lazy, useState, useEffect } from 'react'
import './styles.sass'
import { useSupabase } from '../../hooks/useSupabase'

const LazyPrices = lazy(() => import('../prices/Prices'))

const Tarifs = () => {
  const [tarifsData, setTarifsData] = useState([])
  const supabase = useSupabase()

  useEffect(() => {
    const fetchTarifs = async () => {
      const data = await supabase.getTarifs()
      setTarifsData(data)
    }
    fetchTarifs()
  }, [])

  return (
    <section id='tarifs' className='tarifs'>
      <div className='tarifs_contain'>
        <h2>Tarifs </h2>
        <div className='tarifs_list'>
          <Suspense fallback={<div>Loading prices...</div>}>
            {Array.isArray(tarifsData) && tarifsData.map(tarif => (
              <LazyPrices key={tarif.id} tarif={tarif} />
            ))}
          </Suspense>
          <aside>
            Restauration / Polissage etc... <span>sur devis selon l&apos;état</span>
            <p>Prix indicatif selon état / tarifs dégressifs selon quantité.<br/>
            Pour tous autres types d&apos;outil merci de me contacter.</p>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Tarifs