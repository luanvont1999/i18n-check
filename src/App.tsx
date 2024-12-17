import { useMemo, useState } from 'react'
import './App.css'
import JsonFileImporter from './components/JsonImporter'

function App() {
  const [base, setBase] = useState<object | undefined>()
  const [child, setChild] = useState<object | undefined>()

  const Missingkeys = useMemo(() => {
    if (!child) return []
    const results = []

    for(const i in base) {
      const _child = child[i as keyof typeof child] || undefined
      if (_child === undefined) {
        results.push({ key: i, base: base[i as keyof typeof base]})
      }
    }
    return results
  }, [base, child])

  return (
    <>
    <div className='flex'>
      <JsonFileImporter onChange={setBase} />
      <JsonFileImporter onChange={(setChild)} />

      <p>Missing keys: {Missingkeys.length}</p>
      <table>
        {Missingkeys.map(x => <tr>
          <td>{x.key}</td>
          <td>{x.base}</td>
        </tr>)}
      </table>
    </div>
    </>
  )
}

export default App
