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

export default function Contact() {
  const [form, setForm] = useState(initial);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent('Contact Jowharatech');
    const body = encodeURIComponent(
      `Prénom: ${form.firstName}\nNom: ${form.lastName}\nEmail: ${form.email}\nTéléphone: ${form.phone}\nType: ${form.type}\n\n${form.message}`,
    );
    window.location.href = `mailto:jowharatech@gmail.com?subject=${subject}&body=${body}`;
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
            <button type="submit" className="btn-gold form-submit">
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
