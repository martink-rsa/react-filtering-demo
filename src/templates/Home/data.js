export const controls = [
  {
    title: 'Flair',
    key: 'flair',
    titleVisible: false,
    type: 'checkbox',
    allowMultipleValues: true,
    children: [
      {
        title: 'Best Seller',
        value: 'bestSeller',
      },
      {
        title: 'New',
        value: 'new',
      },
      {
        title: 'Stock',
        value: 'stock',
      },
    ],
  },
  {
    title: 'Product Type',
    key: 'productType',
    titleVisible: false,
    allowMultipleValues: false,
    children: [
      {
        title: 'Haircare',
        value: 'haircare',
      },
      {
        title: 'Skincare',
        value: 'skincare',
      },
    ],
  },
];
