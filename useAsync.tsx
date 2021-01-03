mport { useEffect, useState, useCallback, useRef } from 'react'

export default (asyncFunction, immediate = true) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // Track a reference to whether the useAsync is actually on a mounted component.
  // useEffect below returns a cleanup that sets this to false. Before setting
  // any state, we check if the cleanup has run. If it has, don't update the state.
  const mounted = useRef(true)

  useEffect(() => {
    return () => {
      mounted.current = false
    }
  }, [])

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const r = await asyncFunction(...args)
      if (mounted.current) {
        setResult(r)
      }
      return r
    } catch (e) {
      if (mounted.current) {
        setError(e)
      }
    } finally {
      if (mounted.current) {
        setLoading(false)
      }
    }
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, loading, result, error }
}
