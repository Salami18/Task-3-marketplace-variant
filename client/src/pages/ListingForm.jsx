import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'

// TODO: build the Sell an Item page — see README.md "Your task".
// This page is already routed at /listings/new (sell) and /listings/:id (edit),
// and both routes are wrapped in <ProtectedRoute>.

const defaults = { title: '', description: '', price: 0, category: 'other', condition: 'used', status: 'active' }


export default function ListingForm() {
  const nav = useNavigate()
  const { id } = useParams()
  const [form, setForm] = useState(defaults)
  const [error, setError] = useState('')

  // TODO (edit mode): when there is an `id`, load the listing and fill the form.
  useEffect(() => {
    if (!id) return
    // TODO
  }, [id])

  // TODO: update `form` when an input changes (price should be a number).
  function onChange(e) {
    // TODO
  }

  // TODO: POST a new listing, or PATCH the existing one when editing,
  // then go back to /listings. Show the server's error message on failure.
  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    // TODO
  }

  return (
    <div className="max-w-lg mx-auto card">
      <h1 className="text-xl font-semibold mb-4">{id ? 'Edit' : 'New'} Listing</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        {}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="btn" type="submit">Save</button>
      </form>
    </div>
  )
}
