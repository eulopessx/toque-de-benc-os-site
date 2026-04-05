export const logoSrc = '/logo-toque-de-bencaos.png'

export const categories = [
  {
    id: 'baby-look-feminina',
    name: 'Baby Look Feminina',
    short: 'Feminina',
    description:
      'Peças femininas com delicadeza, bom gosto e uma presença suave para o dia a dia, momentos especiais e vivências de fé.',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'camiseta-masculina',
    name: 'Camiseta Masculina',
    short: 'Masculina',
    description:
      'Camisetas com visual versátil, acabamento confortável e identidade cristã para homens que valorizam simplicidade e presença.',
    image:
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'baby-look-infantil',
    name: 'Baby Look Infantil',
    short: 'Infantil Feminino',
    description:
      'Modelos infantis delicados e acolhedores, pensados para acompanhar cada fase com conforto, leveza e charme.',
    image:
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'camiseta-infantil',
    name: 'Camiseta Infantil',
    short: 'Infantil Masculino',
    description:
      'Peças infantis versáteis, bonitas e confortáveis para compor uma rotina leve, prática e cheia de identidade.',
    image:
      'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'body-bebe',
    name: 'Body para Bebês',
    short: 'Bebês',
    description:
      'Bodies suaves e delicados para os pequenos, com toque acolhedor, conforto diário e uma apresentação encantadora.',
    image:
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1200&q=80',
  },
]

export const products = [
  {
    id: 1,
    name: 'Baby Look Fé & Graça',
    category: 'baby-look-feminina',
    price: 59.9,
    oldPrice: 74.9,
    badge: 'Mais vendida',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Modelagem confortável, tecido leve e visual delicado para um look feminino com propósito.',
    sizes: ['P', 'M', 'G', 'GG'],
    measurements:
      'P — Largura: 46 cm | Comprimento: 62 cm\nM — Largura: 48 cm | Comprimento: 64 cm\nG — Largura: 50 cm | Comprimento: 66 cm\nGG — Largura: 53 cm | Comprimento: 69 cm',
  },
]

export const testimonials = [
  {
    name: 'Fernanda L.',
    text: 'A loja transmite delicadeza e confiança. A navegação ficou muito agradável e as peças chamam atenção logo de início.',
  },
  {
    name: 'Rafael M.',
    text: 'Gostei da organização do catálogo e da identidade visual. O site passa mais profissionalismo e facilita a compra.',
  },
  {
    name: 'Priscila A.',
    text: 'A proposta da marca ficou muito bonita, acolhedora e elegante. É o tipo de loja que convida a continuar navegando.',
  },
]

const SIZE_ORDER = ['P', 'M', 'G', 'GG', 'G1', 'G2', 'G3']

export function sortSizes(sizes = []) {
  if (!Array.isArray(sizes)) return []

  return [...sizes].sort((a, b) => {
    const indexA = SIZE_ORDER.indexOf(a)
    const indexB = SIZE_ORDER.indexOf(b)

    const safeIndexA = indexA === -1 ? 999 : indexA
    const safeIndexB = indexB === -1 ? 999 : indexB

    return safeIndexA - safeIndexB
  })
}

export function formatPrice(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function getCategoryById(categoryId) {
  return categories.find((category) => category.id === categoryId)
}

export function getCategoryName(categoryId) {
  return getCategoryById(categoryId)?.name || categoryId
}

export function getCategoryShortName(categoryId) {
  return getCategoryById(categoryId)?.short || categoryId
}

export function normalizeProductFromDatabase(product) {
  return {
    id: product.id,
    name: product.title || '',
    category: product.category || '',
    price: Number(product.price || 0),
    oldPrice: Number(product.compare_price || 0),
    badge: product.badge || 'Produto',
    image: product.image_url || 'https://placehold.co/1200x1200?text=Produto',
    description: product.description || '',
    measurements: product.measurements || '',
    sizes: sortSizes(Array.isArray(product.sizes) ? product.sizes : []),
    featured: !!product.featured,
    active: product.active ?? true,
    stock: Number(product.stock || 0),
    slug: product.slug || '',
  }
}

export const storeConfig = {
  whatsappNumber: '5512991280549',
  whatsappDisplay: '(12) 99128-0549',
  instagram: '@toquedebencaos',
  instagramUrl: 'https://instagram.com/toquedebencaos',
  email: 'contato@toquedebencaos.com.br',
}