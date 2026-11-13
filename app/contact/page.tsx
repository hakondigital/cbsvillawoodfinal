'use client'

import { Fragment, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { PRIMARY_STORE, SECONDARY_STORE } from '@/lib/utils'

type FD = { name: string; company: string; email: string; phone: string; projectType: string; message: string }
type FS = 'idle' | 'submitting' | 'success' | 'error'
const PTS = ['Residential – New Build', 'Residential – Renovation', 'Commercial – New Build', 'Commercial – Remedial', 'Industrial', 'Other']
// Primary store first — it takes the left-hand map and the top phone line.
const STORES = [PRIMARY_STORE, SECONDARY_STORE]

export default function ContactPage() {
  const [form, setForm] = useState<FD>({ name: '', company: '', email: '', phone: '', projectType: '', message: '' })
  const [state, setState] = useState<FS>('idle')
  const [errors, setErrors] = useState<Partial<FD>>({})

  function validate() {
    const e: Partial<FD> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim()) e.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid'
    if (!form.message.trim()) e.message = 'Required'
    setErrors(e); return Object.keys(e).length === 0
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!validate()) return
    setState('submitting')
    try {
      const r = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '',
          subject: `CBS Trade Enquiry from ${form.name}${form.company ? ` (${form.company})` : ''}`,
          from_name: 'CBS Website',
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          company: form.company || 'Not provided',
          project_type: form.projectType || 'Not specified',
          message: form.message,
        }),
      })
      const data = await r.json()
      setState(data.success ? 'success' : 'error')
    } catch { setState('error') }
  }

  function ch(ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = ev.target
    setForm((p) => ({ ...p, [name]: value }))
    if (errors[name as keyof FD]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  const inputStyle = (f: keyof FD): React.CSSProperties => ({
    width: '100%', background: '#fff', border: errors[f] ? '2px solid #014BAD' : '1px solid #1a1a18',
    padding: 16, fontSize: 16, color: '#1a1a18', fontFamily: 'var(--font-barlow), Barlow, sans-serif', outline: 'none', borderRadius: 0,
  })

  return (
    <>
      <section className="bg-ink" style={{ padding: '60px 0 50px' }}>
        <div className="container-site">
          <h1 className="text-white">Two locations. Open early.</h1>
        </div>
      </section>

      {/* Stores — both maps side by side, primary store on the left */}
      <section className="bg-white py-12 md:py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
            {STORES.map((s) => (
              <div key={s.name}>
                <div className="overflow-hidden mb-5" style={{ height: 'clamp(200px, 35vw, 360px)' }}>
                  <iframe
                    src={s.googleMapsEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${s.name} location`}
                  />
                </div>
                <h3 className="text-ink mb-3" style={{ fontSize: 24, fontWeight: 700 }}>{s.name}</h3>
                <div style={{ fontSize: 15, lineHeight: 2, color: '#666' }}>
                  <p>{s.address}</p>
                  {s.mobile && <p><a href={`tel:${s.mobile}`} className="text-ink font-semibold">{s.mobile}</a> (mobile)</p>}
                  <p><a href={`tel:${s.phone}`} className="text-ink font-semibold">{s.phone}</a>{s.mobile ? ' (landline)' : ''}</p>
                  <p>{s.email}</p>
                  <p>Mon&ndash;Fri {s.hours.weekdays}</p>
                  <p>Sat {s.hours.saturday}</p>
                  <p>Sun {s.hours.sunday}</p>
                </div>
                <a href={s.mapEmbedUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark mt-5 inline-flex text-[13px]">Get Directions &rarr;</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section style={{ backgroundColor: '#f5f2ee' }} className="py-12 md:py-20" id="enquiry">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div>
              <h2 className="text-ink mb-6">Trade enquiry.</h2>
              <p className="text-body-text mb-8" style={{ fontSize: 16, lineHeight: 1.8 }}>
                Tell us what you&rsquo;re working on. We respond within one business day.
              </p>
              <div className="space-y-2">
                {STORES.map((s) => (
                  <Fragment key={s.name}>
                    <a href={`tel:${s.phone}`} className="block text-ink font-body font-semibold" style={{ fontSize: 18 }}>{s.suburb}: {s.phone}{s.mobile ? ' (landline)' : ''}</a>
                    {s.mobile && <a href={`tel:${s.mobile}`} className="block text-ink font-body font-semibold" style={{ fontSize: 18 }}>{s.suburb}: {s.mobile} (mobile)</a>}
                  </Fragment>
                ))}
              </div>
            </div>

            <div>
              {state === 'success' ? (
                <div className="text-center py-16" style={{ border: '1px solid #1a1a18' }}>
                  <CheckCircle size={36} className="mx-auto mb-4 text-ink" />
                  <h3 className="text-ink mb-2">Enquiry received.</h3>
                  <p className="text-body-text" style={{ fontSize: 14 }}>For urgent orders, call <a href={`tel:${PRIMARY_STORE.phone}`} className="text-ink font-semibold">{PRIMARY_STORE.phone}</a></p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[['name', 'Name *', 'text'], ['company', 'Company', 'text'], ['email', 'Email *', 'email'], ['phone', 'Phone', 'tel']].map(([n, l, t]) => (
                      <div key={n}>
                        <label htmlFor={n} className="block font-heading text-ink/40 mb-1" style={{ fontSize: 13, letterSpacing: '0.1em' }}>{l}</label>
                        <input id={n} name={n} type={t} value={form[n as keyof FD]} onChange={ch} style={inputStyle(n as keyof FD)} />
                        {errors[n as keyof FD] && <p className="text-cbs text-xs mt-1">{errors[n as keyof FD]}</p>}
                      </div>
                    ))}
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block font-heading text-ink/40 mb-1" style={{ fontSize: 13, letterSpacing: '0.1em' }}>PROJECT TYPE</label>
                    <select id="projectType" name="projectType" value={form.projectType} onChange={ch} style={{ ...inputStyle('projectType'), appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select&hellip;</option>
                      {PTS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block font-heading text-ink/40 mb-1" style={{ fontSize: 13, letterSpacing: '0.1em' }}>MESSAGE *</label>
                    <textarea id="message" name="message" value={form.message} onChange={ch} rows={4} style={{ ...inputStyle('message'), resize: 'none' }} />
                    {errors.message && <p className="text-cbs text-xs mt-1">{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={state === 'submitting'} className="w-full font-heading" style={{ background: '#1a1a18', color: '#f5f2ee', height: 56, fontWeight: 700, fontSize: 15, letterSpacing: '0.1em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', borderRadius: 0, opacity: state === 'submitting' ? 0.5 : 1 }}>
                    {state === 'submitting' ? 'Sending…' : 'Send Enquiry'}
                  </button>
                  {state === 'error' && <p className="text-cbs text-sm">Something went wrong. Call us directly.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
