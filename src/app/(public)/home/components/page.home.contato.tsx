import { TipoContato } from '@/types/app/home'
import { MapPin, Mail, Instagram, Facebook, Phone } from 'lucide-react'

const formatInstagram = (url: string) => {
  if (!url) return ''
  const match = url.match(/instagram\.com\/([^/?]+)/)
  if (match) return '@' + match[1]
  return url.startsWith('@') ? url : '@' + url
}

const getInstagramUrl = (url: string) => {
  if (!url) return ''
  let finalUrl = url
  if (!url.includes('instagram.com')) {
    finalUrl = `instagram.com/${url.replace('@', '')}`
  }
  return finalUrl.startsWith('http') ? finalUrl : `https://${finalUrl}`
}

const formatFacebook = (url: string) => {
  if (!url) return ''
  const match = url.match(/facebook\.com\/([^/?]+)/)
  return match ? match[1] : url
}

const getFacebookUrl = (url: string) => {
  if (!url) return ''
  let finalUrl = url
  if (!url.includes('facebook.com')) {
    finalUrl = `facebook.com/${url}`
  }
  return finalUrl.startsWith('http') ? finalUrl : `https://${finalUrl}`
}

const getWhatsappUrl = (phone: string) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  return `https://wa.me/55${cleaned}`
}

export default function Contato({
  badge,
  titulo,
  descricao,
  email,
  endereco,
  celular,
  facebook,
  instagram,
  imagemFundo,
}: TipoContato) {
  return (
    <section id="contato" className="bg-light-cream relative overflow-hidden py-32">
      {/* Decorative Orbs */}
      <div className="bg-accent-blue/10 absolute top-10 left-10 h-32 w-32 rounded-full blur-2xl" />
      <div className="bg-accent-rose/10 absolute right-10 bottom-10 h-40 w-40 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="to-light-cream border-deep-charcoal/5 shadow-deep-charcoal/5 relative overflow-hidden rounded-[3.5rem] border bg-gradient-to-br from-white via-white p-12 text-center shadow-2xl md:p-24">
          {imagemFundo && (
            <div className="absolute inset-0 z-0">
              <img
                src={imagemFundo}
                alt="Background"
                className="h-full w-full object-cover opacity-20 mix-blend-multiply"
              />
            </div>
          )}
          <div className="bg-primary-yellow/20 group-hover:bg-primary-yellow/30 absolute -top-32 -left-32 h-64 w-64 rounded-full blur-3xl transition-all" />
          <div className="bg-accent-teal/10 absolute -right-32 -bottom-32 h-64 w-64 rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl">
            <span className="text-deep-charcoal bg-primary-yellow mb-6 inline-block rounded-full px-6 py-2 text-sm font-black tracking-widest uppercase shadow-sm">
              {badge}
            </span>
            <h2 className="text-deep-charcoal mb-8 text-3xl leading-tight font-black break-words drop-shadow-sm sm:text-4xl md:text-5xl">
              {titulo}
            </h2>
            {descricao && (
              <p className="text-grey-accent mb-12 text-xl leading-relaxed font-medium">
                {descricao}
              </p>
            )}

            <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-2">
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="group border-deep-charcoal/5 flex flex-col justify-center rounded-2xl border bg-white/60 p-6 backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  <div className="text-accent-blue mb-2 flex items-center space-x-2 text-xs font-black tracking-wider uppercase">
                    <Mail size={16} /> <span>E-mail</span>
                  </div>
                  <div className="text-deep-charcoal/80 group-hover:text-accent-blue text-sm font-semibold break-words transition-colors md:text-base">
                    {email}
                  </div>
                </a>
              )}

              {endereco && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(endereco)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group border-deep-charcoal/5 flex flex-col justify-center rounded-2xl border bg-white/60 p-6 backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-lg md:col-span-2 lg:col-span-1"
                >
                  <div className="text-accent-blue mb-2 flex items-center space-x-2 text-xs font-black tracking-wider uppercase">
                    <MapPin size={16} /> <span>Sede Administrativa</span>
                  </div>
                  <div className="text-deep-charcoal/80 group-hover:text-accent-blue text-sm font-semibold break-words transition-colors md:text-base">
                    {endereco}
                  </div>
                </a>
              )}

              {celular && (
                <a
                  href={getWhatsappUrl(celular)}
                  target="_blank"
                  rel="noreferrer"
                  className="group border-deep-charcoal/5 flex flex-col justify-center rounded-2xl border bg-white/60 p-6 backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  <div className="text-accent-blue mb-2 flex items-center space-x-2 text-xs font-black tracking-wider uppercase">
                    <Phone size={16} /> <span>Celular / WhatsApp</span>
                  </div>
                  <div className="text-deep-charcoal/80 group-hover:text-accent-blue text-sm font-semibold break-words transition-colors md:text-base">
                    {celular}
                  </div>
                </a>
              )}

              {instagram && (
                <a
                  href={getInstagramUrl(instagram)}
                  target="_blank"
                  rel="noreferrer"
                  className="group border-deep-charcoal/5 flex flex-col justify-center rounded-2xl border bg-white/60 p-6 backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  <div className="text-accent-blue mb-2 flex items-center space-x-2 text-xs font-black tracking-wider uppercase">
                    <Instagram size={16} /> <span>Instagram</span>
                  </div>
                  <div className="text-deep-charcoal/80 group-hover:text-accent-blue text-sm font-semibold break-words transition-colors md:text-base">
                    {formatInstagram(instagram)}
                  </div>
                </a>
              )}

              {facebook && (
                <a
                  href={getFacebookUrl(facebook)}
                  target="_blank"
                  rel="noreferrer"
                  className="group border-deep-charcoal/5 flex flex-col justify-center rounded-2xl border bg-white/60 p-6 backdrop-blur-sm transition-all hover:bg-white/90 hover:shadow-lg"
                >
                  <div className="text-accent-blue mb-2 flex items-center space-x-2 text-xs font-black tracking-wider uppercase">
                    <Facebook size={16} /> <span>Facebook</span>
                  </div>
                  <div className="text-deep-charcoal/80 group-hover:text-accent-blue text-sm font-semibold break-words transition-colors md:text-base">
                    {formatFacebook(facebook)}
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
