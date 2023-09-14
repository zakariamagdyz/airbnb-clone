import { Suspense } from 'react'

import Await from '@/components/await'

type Props = {
  searchParams: { category: string }
}
const waitFor = (ms: number) => new Promise(r => setTimeout(r, ms))
export const categories = [
  {
    label: 'Beach',
    description: 'This property is close to the beach!',
  },
  {
    label: 'Windmills',
    description: 'This property is has windmills!',
  },
  {
    label: 'Modern',
    description: 'This property is modern!',
  },
  {
    label: 'Countryside',
    description: 'This property is in the countryside!',
  },
  {
    label: 'Pools',
    description: 'This is property has a beautiful pool!',
  },
  {
    label: 'Islands',
    description: 'This property is on an island!',
  },
  {
    label: 'Lake',
    description: 'This property is near a lake!',
  },
  {
    label: 'Skiing',
    description: 'This property has skiing activies!',
  },
  {
    label: 'Castles',
    description: 'This property is an ancient castle!',
  },
  {
    label: 'Caves',
    description: 'This property is in a spooky cave!',
  },
  {
    label: 'Camping',
    description: 'This property offers camping activities!',
  },
  {
    label: 'Arctic',
    description: 'This property is in arctic environment!',
  },
  {
    label: 'Desert',
    description: 'This property is in the desert!',
  },
  {
    label: 'Barns',
    description: 'This property is in a barn!',
  },
  {
    label: 'Lux',
    description: 'This property is brand new and luxurious!',
  },
]

export default async function Home({ searchParams }: Props) {
  const category = categories.find(item => item.label.toLowerCase() === searchParams.category?.toLowerCase())
  return (
    <main key={Math.random()} className='container'>
      <Suspense fallback={<div>Loading...</div>}>
        <Await promise={waitFor(1000)}>
          {() => (
            <>
              <p>hola</p>
              <h1>Hi there Im :{category?.label}</h1>
            </>
          )}
        </Await>
      </Suspense>
    </main>
  )
}
