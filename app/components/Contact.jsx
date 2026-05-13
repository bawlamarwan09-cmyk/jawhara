'use client';

import { useState } from 'react';

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  type: '',
  message: '',
};

const FACEBOOK_URL = 'https://www.facebook.com/jowharevent.sud';

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const buildMailto = () => {
    const subject = encodeURIComponent('Contact Jowharatech');
    const body = encodeURIComponent(
      `Prénom: ${form.firstName}\nNom: ${form.lastName}\nEmail: ${form.email}\nTéléphone: ${form.phone}\nType: ${form.type}\n\n${form.message}`,
    );
    return `mailto:jowharatech@gmail.com?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.message) {
      setStatus({
        state: 'error',
        message: 'Merci de renseigner au moins prénom, email et message.',
      });
      return;
    }

    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    const formspree = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

    // Web3Forms: zero-account email delivery. Get a key at https://web3forms.com
    if (web3Key) {
      try {
        setStatus({ state: 'loading', message: 'Envoi en cours…' });
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: 'Nouveau message — Jowharatech',
            from_name: `${form.firstName} ${form.lastName}`.trim(),
            replyto: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            type: form.type,
            message: form.message,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setStatus({
            state: 'success',
            message: 'Merci ! Votre message a bien été envoyé.',
          });
          setForm(initial);
          return;
        }
        throw new Error(data.message || 'Request failed');
      } catch (err) {
        setStatus({
          state: 'error',
          message:
            "Échec de l'envoi. Ouverture de votre messagerie en secours…",
        });
        window.location.href = buildMailto();
        return;
      }
    }

    // Optional Formspree path (kept for flexibility)
    if (formspree) {
      try {
        setStatus({ state: 'loading', message: 'Envoi en cours…' });
        const res = await fetch(formspree, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form, _subject: 'Nouveau message — Jowharatech' }),
        });
        if (res.ok) {
          setStatus({ state: 'success', message: 'Merci ! Votre message a bien été envoyé.' });
          setForm(initial);
          return;
        }
        throw new Error('Request failed');
      } catch (err) {
        setStatus({ state: 'error', message: "Échec de l'envoi. Ouverture de votre messagerie en secours…" });
        window.location.href = buildMailto();
        return;
      }
    }

    // No backend configured → fallback to user's mail client.
    window.location.href = buildMailto();
    setStatus({
      state: 'success',
      message: 'Votre messagerie va s\u2019ouvrir pour finaliser l\u2019envoi.',
    });
  };

  return (
    <section id="contact">
      <div className="contact-grid">
        <div className="reveal">
          <div className="section-badge">
            <div className="divider" />
            <span className="badge-label">Contact</span>
            <span className="badge-ar">اتصل بنا</span>
          </div>
          <h2 className="contact-h2">
            Travaillons <span className="accent">ensemble.</span>
          </h2>
          <p className="contact-ar-sub">لنعمل معاً على تحقيق رؤيتك</p>
          <p className="body-p" style={{ maxWidth: 360 }}>
            Prêt à créer un événement inoubliable ? Contactez notre équipe pour
            discuter de votre projet et bénéficier de notre expertise.
          </p>
          <div className="contact-info-list">
            <div className="info-row">
              <div className="info-ico">✉</div>
              <div>
                <div className="info-lbl">Email</div>
                <div className="info-val">jowharatech@gmail.com</div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-ico">☏</div>
              <div>
                <div className="info-lbl">Téléphone</div>
                <div className="info-val">+212 6 61 43 77 60</div>
                <div className="info-val2">+212 6 57 87 44 90</div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-ico">⊕</div>
              <div>
                <div className="info-lbl">Localisation</div>
                <div className="info-val">Agadir · Aït Melloul · Agdal</div>
                <div className="info-val2">Maroc — Sahara</div>
              </div>
            </div>
            <div className="info-row">
              <a
                className="info-ico social-ico"
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Page Facebook Jowharatech"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12.07C22 6.51 17.52 2 12 2S2 6.51 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.75 8.44-4.91 8.44-9.93z"/>
                </svg>
              </a>
              <div>
                <div className="info-lbl">Facebook</div>
                <a
                  className="info-val info-link"
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  jowharevent.sud
                </a>
                <div className="info-val2">Suivez nos événements</div>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal" style={{ transitionDelay: '.2s' }}>
          <form className="form-wrap" onSubmit={onSubmit}>
            <div className="form-title display">Envoyez-nous un message</div>
            <div className="form-title-ar">أرسل لنا رسالة</div>
            <div className="form-row2">
              <div className="field">
                <label>Prénom</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={onChange}
                  placeholder="Votre prénom"
                />
              </div>
              <div className="field">
                <label>Nom</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={onChange}
                  placeholder="Votre nom"
                />
              </div>
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="votre@email.com"
              />
            </div>
            <div className="field">
              <label>Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="+212 6 XX XX XX XX"
              />
            </div>
            <div className="field">
              <label>Type d&apos;événement</label>
              <select name="type" value={form.type} onChange={onChange}>
                <option value="">Sélectionner...</option>
                <option>Festival culturel</option>
                <option>Événement corporate</option>
                <option>Concert / Spectacle</option>
                <option>Événement en plein air / Désert</option>
                <option>Autre</option>
              </select>
            </div>
            <div className="field">
              <label>Message</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={onChange}
                placeholder="Décrivez votre projet..."
              />
            </div>
            <button
              type="submit"
              className="btn-gold form-submit"
              disabled={status.state === 'loading'}
            >
              {status.state === 'loading' ? 'Envoi…' : 'Envoyer le message'}
            </button>
            {status.message && (
              <div className={`form-status form-status-${status.state}`} role="status">
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
