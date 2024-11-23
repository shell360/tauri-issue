import { useCallback, useState } from 'react'
import { save, open } from '@tauri-apps/plugin-dialog'
import { writeFile, readFile } from '@tauri-apps/plugin-fs'

function App() {
  const onSave = useCallback(async () => {
    const path = await save()
    if (!path) {
      return
    }

    let encoder = new TextEncoder()
    let data = encoder.encode('Hello World')
    await writeFile(path, data) // The content was not successfully written.
  }, [])

  const onOpen = useCallback(async () => {
    const path = await open()
    if (!path) {
      return
    }

    let content = await readFile(path)
    console.log(content)
  }, [])
  
  return (
    <main className="container">
      <button onClick={onSave}>save file</button>
      <button onClick={onOpen}>open file</button>
    </main>
  )
}

export default App
