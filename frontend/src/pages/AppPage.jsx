import { useState } from 'react'

export default function AppPage() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>App Page</h1>
      <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>
    </div>
  )
}
