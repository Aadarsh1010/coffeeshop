/**
 * Contact form submission helper.
 *
 * Tries the following providers in order, based on which
 * environment variables are set:
 *   1. Formspree         (VITE_FORMSPREE_ID)
 *   2. Web3Forms         (VITE_WEB3FORMS_KEY)
 *   3. Custom endpoint   (VITE_CONTACT_API_URL)
 *
 * If none are configured, returns a successful simulated
 * response after a short delay (useful for local dev).
 *
 * @param {Record<string, string>} payload  form data
 * @returns {Promise<{ ok: true } | { ok: false, error: string }>}
 */
export async function sendContact(payload) {
  const formspreeId   = import.meta.env.VITE_FORMSPREE_ID
  const web3formsKey  = import.meta.env.VITE_WEB3FORMS_KEY
  const customUrl     = import.meta.env.VITE_CONTACT_API_URL

  try {
    // ----- Formspree -----
    if (formspreeId) {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`)
      return { ok: true }
    }

    // ----- Web3Forms -----
    if (web3formsKey) {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: web3formsKey, ...payload }),
      })
      if (!res.ok) throw new Error(`Web3Forms responded ${res.status}`)
      return { ok: true }
    }

    // ----- Custom endpoint -----
    if (customUrl) {
      const res = await fetch(customUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Custom endpoint responded ${res.status}`)
      return { ok: true }
    }

    // ----- Fallback: simulated send -----
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info('[contactApi] No provider configured; simulating send.', payload)
    }
    await new Promise((r) => setTimeout(r, 900))
    return { ok: true }
  } catch (err) {
    return {
      ok: false,
      error: err?.message || 'Something went wrong sending your message.',
    }
  }
}
