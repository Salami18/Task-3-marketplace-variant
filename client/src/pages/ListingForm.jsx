import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api'

const defaults = { title: '', description: '', price: 0, category: 'other', condition: 'used', status: 'active' }


export default function ListingForm() {
  const nav = useNavigate()
  const { id } = useParams()
  const [form, setForm] = useState(defaults)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    let cancelled = false
    api.get(`/listings/${id}`)
      .then(({ data }) => {
        if (!cancelled) setForm({
          title: data.listing.title ?? '',
          description: data.listing.description ?? '',
          price: data.listing.price ?? 0,
          category: data.listing.category ?? 'other',
          condition: data.listing.condition ?? 'used',
          status: data.listing.status ?? 'active',
        })
      })
      .catch(err => {
        if (!cancelled) setError(err?.response?.data?.message || 'Could not load listing')
      })
    return () => { cancelled = true }
  }, [id])

  function onChange(e) {
    const { name, value } = e.target
    setForm(current => ({ ...current, [name]: name === 'price' ? Number(value) : value }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      if (id) await api.patch(`/listings/${id}`, form)
      else await api.post('/listings', form)
      nav('/listings')
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not save listing')
    }
  }

  return (
    <div className="max-w-lg mx-auto card">
      <h1 className="text-xl font-semibold mb-4">{id ? 'Edit' : 'New'} Listing</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="input" name="title" value={form.title} onChange={onChange} placeholder="Title" required />
        <input className="input" name="price" type="number" min="0" step="0.01" value={form.price} onChange={onChange} placeholder="Price" required />
        <select className="input" name="category" value={form.category} onChange={onChange}>
          {['textbooks', 'electronics', 'furniture', 'clothing', 'other'].map(value => <option key={value} value={value}>{value}</option>)}
        </select>
        <select className="input" name="condition" value={form.condition} onChange={onChange}>
          {['new', 'like-new', 'used', 'worn'].map(value => <option key={value} value={value}>{value}</option>)}
        </select>
        {id && <select className="input" name="status" value={form.status} onChange={onChange}>
          {['active', 'sold'].map(value => <option key={value} value={value}>{value}</option>)}
        </select>}
        <textarea className="input" name="description" value={form.description} onChange={onChange} placeholder="Description (optional)" rows="4" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button className="btn" type="submit">Save</button>
      </form>
    </div>
  )
}
