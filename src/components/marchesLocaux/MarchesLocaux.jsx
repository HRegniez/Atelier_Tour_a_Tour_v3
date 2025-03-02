import {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import { useSupabase } from '../../hooks/useSupabase'


export default function MarchesLocaux() {
  const [agendaData, setAgendaData] = useState([])
  const supabase = useSupabase()

  useEffect(() => {
    const fetchAgendaData = async () => {
      const { data, error } = await supabase.getMarchesLocaux()
      
      if (error) {
        console.error('Error fetching agenda data:', error)
      } else {
        const sortedData = data.sort((a, b) => a.id - b.id)
        setAgendaData(sortedData)
      }
    }
    fetchAgendaData()
  }, [])

  return (
    <article>
      <ul>

      {
        Array.isArray(agendaData) && agendaData.map(data => (
          <li key={data.id}>
            <div className='meTrouver_flex'>
              <span>
                {data.dates}
              </span>
              <a className='meTrouver_details' href={data.maps_link} target='blank'>
                <h4>
                  {data.adresse}
                </h4>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </a>
            </div>
            <div className='meTrouver_nextDates'>
              {data.next_dates}
            </div>
          </li>
        ))
      }
      </ul>
    </article>
  )
}
