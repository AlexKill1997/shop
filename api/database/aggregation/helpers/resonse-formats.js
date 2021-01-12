function createFormat(array) {
  const resultObject = {}
  array.forEach(key => resultObject[key] = `$${key}`)
  return resultObject
}

const CATEGORY_FORMAT = createFormat([
  'categoryName',
  'cSlug',
  'link',
  'nesting',
  'children',
  'meta',
  'keywords',
  'description',
  'title',
  'path',
  'order',
  'img',
  'iconPath',
  'icon',
  'category',
  'views_count'
])

const CATEGORY_PAGE_FORMAT = createFormat([
  ...Object.keys(CATEGORY_FORMAT),
  'count',
  'subcategories',
  'neighbors'
])

const BRAND_FORMAT = createFormat([
  'name',
  'slug',
  'img',
  'path',
])

const PRODUCT_FORMAT = createFormat([
  'title',
  'slug',
  'article',
  'cost',
  'club_cost',
  'unit',
  'description',
  'options',
  'meta',
  'keywords',
  'images',
  'path',
  'discount',
  'discount_price'
])

const PAGE_PRODUCT_FORMAT = createFormat([
  ...Object.keys(PRODUCT_FORMAT),
  'same',
  'buyed'
])

const CLIENTS_FORMAT = createFormat([
  'surname',
  'name',
  'lastname',
  'birthday',

  // Юридическое лицо
  'bank',
  'organisation',
  'checking_account',
  'inn',
  'kpp',
  'okpo',
  'director',
  'ur_address',
  'account_number',
  'ownership',
  'ur_actualAddress',
  'ur_corScore',
  'bik',

  // Общее
  // Личная информация
  'email',
  'phone'
])

const REGIONS_FORMAT = createFormat([
  'title',
  'value',
  'phones',
  'email',
  'ISO'
])

const ORDERS_FORMAT = createFormat([
  'created',
  'buyed',
  'products',
  'status',
  'number',
  'comment',
  'delivery',
  'manager',
  'region'
])

const ORDER_PRODUCT_FORMAT = {
  ...PRODUCT_FORMAT,
  'count': "$count"
}

const STATUS_FORMAT = createFormat([
  'title',
  'value'
])

const MANAGE_FORMAT = createFormat([
  'name',
  'phone'
])

const MANAGER_FORMAT = createFormat([
  'name',
  'surname'
])

module.exports = {
  CATEGORY_FORMAT,
  CATEGORY_PAGE_FORMAT,
  BRAND_FORMAT,
  PRODUCT_FORMAT,
  PAGE_PRODUCT_FORMAT,
  CLIENTS_FORMAT,
  REGIONS_FORMAT,
  ORDERS_FORMAT,
  ORDER_PRODUCT_FORMAT,
  STATUS_FORMAT,
  MANAGE_FORMAT,
  MANAGER_FORMAT
}