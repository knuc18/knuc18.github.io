import { useState } from 'react'

/**
 * Set this to your Formspree form URL (https://formspree.io -> new form -> copy the
 * endpoint). Until it is set, the form stays disabled and shows the mailto instead,
 * so a half-configured form can never silently swallow an enquiry.
 */
const FORM_ENDPOINT = 'https://formspree.io/f/mkjnejkb'

const EMAIL = 'kjnucum@gmail.com'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

function validate(values: { name: string; email: string; message: string }): Errors {
  const errors: Errors = {}
  if (!values.name.trim()) errors.name = 'Please add your name.'
  if (!values.email.trim()) {
    errors.email = 'Please add an email so I can reply.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'That email address looks incomplete.'
  }
  if (values.message.trim().length < 10) {
    errors.message = 'A sentence or two is enough — what are you trying to build?'
  }
  return errors
}

export function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  // Bots fill every field they find; humans never see this one.
  const [honeypot, setHoneypot] = useState('')

  const set = (field: keyof typeof values) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    // Clear a field's error as soon as the user starts fixing it.
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (honeypot) return // silently drop bots

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(`cf-${Object.keys(found)[0]}`)?.focus()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      // Deliberately keep every value on failure — retyping is how a ready
      // enquiry gets abandoned. The mailto fallback shows alongside the error.
      setStatus('error')
    }
  }

  if (!FORM_ENDPOINT) {
    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <a href={`mailto:${EMAIL}`} className="op-btn">
          {EMAIL}
        </a>
      </div>
    )
  }

  if (status === 'sent') {
    return (
      <div className="op-card" role="status" style={{ maxWidth: 560 }}>
        <p className="op-body" style={{ margin: 0 }}>
          <strong>Thanks — that reached me.</strong> I read everything myself and reply
          within a working day. If it is urgent, email {EMAIL} directly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 560 }}>
      <div style={{ display: 'grid', gap: 20 }}>
        <Field
          id="cf-name"
          label="Your name"
          error={errors.name}
          value={values.name}
          onChange={set('name')}
          autoComplete="name"
        />
        <Field
          id="cf-email"
          label="Email"
          type="email"
          error={errors.email}
          value={values.email}
          onChange={set('email')}
          autoComplete="email"
        />
        <Field
          id="cf-message"
          label="What are you trying to build?"
          error={errors.message}
          value={values.message}
          onChange={set('message')}
          textarea
        />

        {/* Honeypot: off-screen rather than display:none, so bots still find it.
            The name must stay `_gotcha` — Formspree silently drops any submission
            with that field filled, so this is caught here AND server-side. */}
        <div aria-hidden="true" className="op-honeypot">
          <label htmlFor="cf-gotcha">Company (leave blank)</label>
          <input
            id="cf-gotcha"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <button type="submit" className="op-btn" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send enquiry'}
          </button>
          <a href={`mailto:${EMAIL}`} style={{ fontSize: 15 }}>
            or email {EMAIL}
          </a>
        </div>

        {status === 'error' && (
          <p className="op-formerror" role="alert" style={{ margin: 0 }}>
            That did not send — nothing was lost, your message is still here. Try again,
            or email {EMAIL} directly.
          </p>
        )}
      </div>
    </form>
  )
}

function Field({
  id,
  label,
  error,
  textarea,
  ...props
}: {
  id: string
  label: string
  error?: string
  textarea?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  autoComplete?: string
}) {
  const errorId = `${id}-error`
  const shared = {
    id,
    name: id.replace('cf-', ''),
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: 'op-input',
    ...props,
  }

  return (
    <div className="op-field">
      <label className="op-label" htmlFor={id}>
        {label}
      </label>
      {textarea ? (
        <textarea {...shared} className="op-input op-textarea" rows={4} />
      ) : (
        <input {...shared} />
      )}
      {error && (
        <span className="op-fielderror" id={errorId}>
          {error}
        </span>
      )}
    </div>
  )
}
