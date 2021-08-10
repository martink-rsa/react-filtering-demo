import { filterData, sortData } from '../templates/Home/Home';

const data0 = [
  { title: 'Product 1' },
  { title: 'Product 6' },
  { title: 'Product 5' },
  { title: 'Product 3' },
  { title: 'Product 4' },
  { title: 'Product 2' },
];

const dataFlair = [
  { title: 'Product 5', flair: 'bestSeller' },
  { title: 'Product 1' },
  { title: 'Product 3' },
  { title: 'Product 6' },
  { title: 'Product 2', flair: 'bestSeller' },
  { title: 'Product 4' },
];

const dataKey = [
  { title: 'Product 1', subtitle: 'Subtitle 6' },
  { title: 'Product 2', subtitle: 'Subtitle 3' },
  { title: 'Product 3', subtitle: 'Subtitle 1' },
  { title: 'Product 4', subtitle: 'Subtitle 5' },
  { title: 'Product 5', subtitle: 'Subtitle 4' },
  { title: 'Product 6', subtitle: 'Subtitle 2' },
];
const dataFlair2 = [
  { title: 'Product 3', flair: 'new' },
  { title: 'Product 6', flair: 'bestSeller' },
  { title: 'Product 2', flair: 'new' },
  { title: 'Product 5', flair: 'bestSeller' },
  { title: 'Product 4' },
  { title: 'Product 1', flair: 'bestSeller' },
  { title: 'Product 7' },
  { title: 'Product 8', flair: 'new' },
];

describe('Sort data', () => {
  it('should filter basic results correctly', () => {
    //
    expect(data0.sort((a, b) => sortData({ a, b }))).toStrictEqual([
      { title: 'Product 1' },
      { title: 'Product 2' },
      { title: 'Product 3' },
      { title: 'Product 4' },
      { title: 'Product 5' },
      { title: 'Product 6' },
    ]);
  });
  it('should reverse basic data', () => {
    //
    expect(
      data0.sort((a, b) => sortData({ a, b, reverse: true })),
    ).toStrictEqual([
      { title: 'Product 6' },
      { title: 'Product 5' },
      { title: 'Product 4' },
      { title: 'Product 3' },
      { title: 'Product 2' },
      { title: 'Product 1' },
    ]);
  });
  it('should sort ascending with flairs', () => {
    //
    expect(dataFlair.sort((a, b) => sortData({ a, b }))).toStrictEqual([
      { title: 'Product 1' },
      { title: 'Product 2', flair: 'bestSeller' },
      { title: 'Product 3' },
      { title: 'Product 4' },
      { title: 'Product 5', flair: 'bestSeller' },
      { title: 'Product 6' },
    ]);
  });
  it('should sort the supplied key', () => {
    expect(
      dataKey.sort((a, b) => sortData({ a, b, key: 'subtitle' })),
    ).toStrictEqual([
      { title: 'Product 3', subtitle: 'Subtitle 1' },
      { title: 'Product 6', subtitle: 'Subtitle 2' },
      { title: 'Product 2', subtitle: 'Subtitle 3' },
      { title: 'Product 5', subtitle: 'Subtitle 4' },
      { title: 'Product 4', subtitle: 'Subtitle 5' },
      { title: 'Product 1', subtitle: 'Subtitle 6' },
    ]);
  });
  it('should sort the supplied key in reverse', () => {
    expect(
      dataKey.sort((a, b) =>
        sortData({ a, b, key: 'subtitle', reverse: true }),
      ),
    ).toStrictEqual([
      { title: 'Product 1', subtitle: 'Subtitle 6' },
      { title: 'Product 4', subtitle: 'Subtitle 5' },
      { title: 'Product 5', subtitle: 'Subtitle 4' },
      { title: 'Product 2', subtitle: 'Subtitle 3' },
      { title: 'Product 6', subtitle: 'Subtitle 2' },
      { title: 'Product 3', subtitle: 'Subtitle 1' },
    ]);
  });
  it('should sort the supplied key with empty values', () => {
    expect(
      dataFlair2.sort((a, b) => sortData({ a, b, key: 'flair' })),
    ).toStrictEqual([
      { title: 'Product 6', flair: 'bestSeller' },
      { title: 'Product 5', flair: 'bestSeller' },
      { title: 'Product 1', flair: 'bestSeller' },
      { title: 'Product 3', flair: 'new' },
      { title: 'Product 2', flair: 'new' },
      { title: 'Product 8', flair: 'new' },
      { title: 'Product 4' },
      { title: 'Product 7' },
    ]);
  });
});
