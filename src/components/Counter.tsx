import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <button className="counter-button" onClick={() => setCount((value) => value + 1)}>
      Count is {count}
    </button>
  )
}
