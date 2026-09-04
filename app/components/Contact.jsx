'use client';

import { useState } from 'react';
import { siteConfig } from '@/content/site';

const initial = {
  type: '',
  date: '',
  location: '',
  name: '',
  phone: '',
  email: '',
  message: '',
  botcheck: '',
};

const eventTypes = [
  'Festivals & concerts',
  'Événements d’entreprise',
  'Conférences',
  'Événements institutionnels',
  'Mariages',
  'Événements privés',
];

const phoneHref = siteConfig.contact.phone
  ? 'tel:' + siteConfig.contact.phone.replace(/[^+\d]/g, '')
  : null;

const whatsappHref = siteConfig.contact.whatsapp
  ? 'https://wa.me/' + siteConfig.contact.whatsapp.replace(/\D/g, '')
  : null;

const formspreeEndpoint = (() => {
  const configured = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  if (!configured) return null;

  try {
    const url = new URL(configured);
    return url.protocol === 'https:' && url.hostname === 'formspree.io' && url.pathname.startsWith('/f/')
      ? url.toString()
      : null;
  } catch {
    return null;
  }
})();

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const mailto = () => {
    if (!siteConfig.contact.email) return null;

    const subject = encodeURIComponent('Étude de projet — Jawhara Tech');
    const body = encodeURIComponent(
      `Type d’événement : ${form.type}\nDate : ${form.date}\nLieu : ${form.location}\nNom : ${form.name}\nTéléphone : ${form.phone}\nEmail : ${form.email || 'Non renseigné'}\n\n${form.message || 'Aucun message complémentaire.'}`,
    );
    return `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
  };

  const useVerifiedEmailFallback = (message) => {
    const emailFallback = mailto();
    if (!emailFallback) {
      setStatus({
        state: 'error',
        message: 'La transmission en ligne est momentanément indisponible. Merci de réessayer dans quelques instants.',
      });
      return;
    }

    setStatus({ state: 'info', message });
    window.location.href = emailFallback;
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (form.botcheck) {
      setForm(initial);
      setStatus({ state: 'success', message: 'Merci. Votre demande a bien été prise en compte.' });
      return;
    }

    if (!form.type || !form.date || !form.location || !form.name || !form.phone) {
      setStatus({
        state: 'error',
        message: 'Merci de renseigner le type d’événement, la date, le lieu, votre nom et votre téléphone.',
      });
      return;
    }

    if (form.phone.replace(/\D/g, '').length < 8) {
      setStatus({
        state: 'error',
        message: 'Merci de saisir un numéro de téléphone comportant au moins 8 chiffres.',
      });
      return;
    }

    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    const formspree = formspreeEndpoint;

    if (!web3Key && !formspree) {
      useVerifiedEmailFallback('Votre messagerie va s’ouvrir pour finaliser la demande.');
      return;
    }

    try {
      setStatus({ state: 'loading', message: 'Transmission de votre projet…' });
      const endpoint = web3Key ? 'https://api.web3forms.com/submit' : formspree;
      const payload = web3Key
        ? {
            access_key: web3Key,
            subject: 'Étude de projet — Jawhara Tech',
            from_name: form.name,
            replyto: form.email || undefined,
            ...form,
          }
        : { ...form, _subject: 'Étude de projet — Jawhara Tech' };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = web3Key ? await response.json() : null;
      if (!response.ok || (web3Key && !data?.success)) throw new Error('Request failed');

      setForm(initial);
      setStatus({ state: 'success', message: 'Merci. Votre projet a bien été transmis à Jawhara Tech.' });
    } catch {
      useVerifiedEmailFallback('L’envoi direct a échoué. Votre messagerie va s’ouvrir pour finaliser la demande.');
    }
  };

  const hasDirectContact = Boolean(
    siteConfig.contact.phone || siteConfig.contact.whatsapp || siteConfig.contact.email,
  );

  return (
    <section className="lead-conversion-section" id="devis" aria-labelledby="contact-title">
      <div className="shell lead-conversion-layout" id="contact">
        <div className="lead-conversion-intro">
          <p className="section-index">10 — Votre projet</p>
          <h2 id="contact-title">
            <span>Un projet en</span>
            <span>préparation&nbsp;?</span>
          </h2>
          <p className="lead-conversion-prompt">
            <span>Parlons de</span>
            <span>votre événement.</span>
          </p>

          {hasDirectContact && (
            <address className="direct-contact-options" aria-label="Contacts directs vérifiés">
              {siteConfig.contact.phone && (
                <a href={phoneHref}>
                  <span>Appeler</span>
                  <strong>{siteConfig.contact.phone}</strong>
                </a>
              )}
              {siteConfig.contact.whatsapp && (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <span>WhatsApp</span>
                  <strong>{siteConfig.contact.whatsapp}</strong>
                </a>
              )}
              {siteConfig.contact.email && (
                <a href={'mailto:' + siteConfig.contact.email}>
                  <span>Email</span>
                  <strong>{siteConfig.contact.email}</strong>
                </a>
              )}
            </address>
          )}
        </div>

        <form className="lead-qualification-form" onSubmit={onSubmit}>
          <div className="honeypot-field" aria-hidden="true" hidden>
            <label htmlFor="botcheck">Ne pas remplir ce champ</label>
            <input
              id="botcheck"
              name="botcheck"
              value={form.botcheck}
              onChange={onChange}
              tabIndex="-1"
              autoComplete="off"
            />
          </div>

          <div className="field field-wide field-step">
            <span aria-hidden="true">01</span>
            <div>
              <label htmlFor="type">Type d’événement *</label>
              <select id="type" name="type" value={form.type} onChange={onChange} required>
                <option value="">Sélectionner un format</option>
                {eventTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="field field-step">
              <span aria-hidden="true">02</span>
              <div>
                <label htmlFor="date">Date *</label>
                <input id="date" type="date" name="date" value={form.date} onChange={onChange} required />
              </div>
            </div>
            <div className="field field-step">
              <span aria-hidden="true">03</span>
              <div>
                <label htmlFor="location">Lieu *</label>
                <input
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={onChange}
                  autoComplete="address-level2"
                  placeholder="Ville ou lieu"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="field field-step">
              <span aria-hidden="true">04</span>
              <div>
                <label htmlFor="name">Nom *</label>
                <input id="name" name="name" value={form.name} onChange={onChange} autoComplete="name" required />
              </div>
            </div>
            <div className="field field-step">
              <span aria-hidden="true">05</span>
              <div>
                <label htmlFor="phone">Téléphone *</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  autoComplete="tel"
                  inputMode="tel"
                  minLength={8}
                  maxLength={20}
                  pattern="[+0-9 ]{8,20}"
                  title="Utilisez des chiffres, des espaces et, si nécessaire, le signe +."
                  aria-describedby="form-requirements"
                  required
                />
              </div>
            </div>
          </div>

          <div className="field field-wide field-step field-optional">
            <span aria-hidden="true">06</span>
            <div>
              <label htmlFor="email">Email <small>Optionnel</small></label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="field field-wide field-step field-optional">
            <span aria-hidden="true">07</span>
            <div>
              <label htmlFor="message">Message <small>Optionnel</small></label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={onChange}
                placeholder="Contexte, contraintes ou besoins déjà identifiés…"
              />
            </div>
          </div>

          <div className="lead-form-footer">
            <button className="button button-primary" type="submit" disabled={status.state === 'loading'}>
              {status.state === 'loading' ? 'Transmission…' : 'Étudier mon projet'}
            </button>
            <small id="form-requirements">Les cinq premiers champs permettent de qualifier votre demande.</small>
          </div>

          {status.message && (
            <p
              className={'form-status form-status-' + status.state}
              role={status.state === 'error' ? 'alert' : 'status'}
              aria-live={status.state === 'error' ? 'assertive' : 'polite'}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
